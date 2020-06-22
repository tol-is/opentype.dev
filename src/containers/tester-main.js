import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { css } from 'emotion';
import { motion, useViewportScroll } from 'framer-motion';

import { setActiveFont, reorderFonts } from '../modules/tester';

import FontContainer from './font-container';

const TesterMain = ({ fonts, reorderFonts }) => {
  const { scrollY } = useViewportScroll();

  // useEffect(() => {
  //   function updateOpacity() {
  //     // console.log(scrollY.get());
  //   }

  //   const unsubscribeY = scrollY.onChange(updateOpacity);

  //   return () => {
  //     unsubscribeY();
  //   };
  // }, [scrollY]);

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
    setActiveFont(null);
  }, []);

  return (
    <main
      className={css`
        padding: 0 5vw 6rem 5vw;
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
                      className={css`
                        padding: 0 0 8rem 0;
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
  return {
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
