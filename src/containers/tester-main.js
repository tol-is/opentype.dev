import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { css } from 'emotion';

import {} from '../modules/fonts';

import { setActiveFont, reorderFonts } from '../modules/tester';

import TesterFontContainer from './font-view-container';

const TesterMain = ({ fonts, reorderFonts }) => {
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

  return (
    <main
      className={css`
        padding: 0 5vw;
        transition: padding 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      `}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fonts.map((id, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TesterFontContainer key={id} id={id} index={index} />
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
    setActiveFont: (value) => dispatch(setActiveFont(value)),
    setFontConfigProp: (id, key, value) =>
      dispatch(setFontConfigProp(id, key, value)),
    setFontFeature: (id, key, enabled) =>
      dispatch(setFontFeature(id, key, enabled)),
    setFontVariationAxis: (id, axis, value) =>
      dispatch(setFontVariationAxis(id, axis, value)),
    setFontNamedVariation: (id, name) =>
      dispatch(setFontNamedVariation(id, name)),
    removeFont: (id) => dispatch(removeFont(id)),
    resetFont: (id) => dispatch(resetFont(id)),
    reorderFonts: (fonts) => dispatch(reorderFonts(fonts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TesterMain);
