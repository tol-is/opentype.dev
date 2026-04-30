import React, { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { css } from 'emotion';
import { motion, useViewportScroll } from 'framer-motion';

import { setActiveFont, reorderFonts } from '../modules/tester';

import FontContainer from './font-container';

const TesterMain = ({ focus, topFont, fonts, reorderFonts }) => {
  const { scrollY } = useViewportScroll();
  const prevFocus = useRef(focus);

  useEffect(() => {
    const wasFocus = prevFocus.current;
    prevFocus.current = focus;
    if (!wasFocus || focus || !topFont) return;

    const el = document.getElementById(`font-${topFont}`);
    if (!el) return;

    const anchorTop = el.getBoundingClientRect().top;
    let raf;
    const tick = () => {
      const delta = el.getBoundingClientRect().top - anchorTop;
      if (Math.abs(delta) > 0.5) window.scrollBy(0, delta);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const stop = setTimeout(() => cancelAnimationFrame(raf), 800);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(stop);
    };
  }, [focus, topFont]);

  const onDragEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) return;
      const startIndex = result.source.index;
      const endIndex = result.destination.index;
      const newFonts = Array.from(fonts);
      const [removed] = newFonts.splice(startIndex, 1);
      newFonts.splice(endIndex, 0, removed);
      // update font list
      reorderFonts(newFonts);
    },
    [fonts]
  );

  const onDragStart = useCallback(() => {
    // setActiveFont(null);
  }, []);

  return (
    <main
      className={css`
        padding: ${focus ? '5rem' : 0} 5vw 100vh 5vw;
        transition: padding 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      `}
    >
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fonts.map((id, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      id={`font-${id}`}
                      className={css`
                        padding: 0 0 6.5rem 0;
                        transition: padding 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                      `}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FontContainer key={id} id={id} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
};

function mapStateToProps(state, ownProps) {
  console.log(state.tester.fonts)
  return {
    focus: state.tester.global.focus,
    topFont: state.tester.global.topFont,
    fonts: state.tester.fonts.map((f) => f.id),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveFont: (id) => dispatch(setActiveFont(id)),
    reorderFonts: (fonts) => dispatch(reorderFonts(fonts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TesterMain);
