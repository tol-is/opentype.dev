/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  updateFonts,
  removeFont,
  setFontFeature,
  setFontVariationAxis,
  setFontNamedVariation,
  setFontConfigProp,
  resetFont,
} from '../modules/fonts';

import { setActiveFont } from '../modules/tester';

import FontView from '../ui/font-view';

const TesterMain = ({
  fonts,
  tester,
  updateFonts,
  removeFont,
  resetFont,
  setFontFeature,
  setFontVariationAxis,
  setFontNamedVariation,
  setActiveFont,
}) => {
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
      updateFonts(newFonts);
    },
    [fonts]
  );

  const onRemove = useCallback((id) => {
    removeFont(id);
  }, []);

  const onReset = useCallback((id) => {
    resetFont(id);
  }, []);

  const onSetFontFeature = useCallback((id, key, value) => {
    setFontFeature(id, key, value);
  }, []);

  const onSetFontVariationAxis = useCallback((id, axis, value) => {
    setFontVariationAxis(id, axis, value);
  }, []);

  const onSetFontNamedVariation = useCallback((id, variation) => {
    setFontNamedVariation(id, variation);
  }, []);

  const onFontActivated = useCallback((id) => {
    console.log('tester SET_ACTIVE_FONT', id);
    setActiveFont(id);
  }, []);

  return (
    <main css={{ padding: '8rem 5vw' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fonts.map((font, index) => (
                <Draggable key={font.id} draggableId={font.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FontView
                        id={font.id}
                        index={index}
                        font={font}
                        testerConfig={tester}
                        setNamedVariation={onSetFontNamedVariation}
                        setFontVariationAxis={onSetFontVariationAxis}
                        setFontFeature={onSetFontFeature}
                        onReset={onReset}
                        onRemove={onRemove}
                        onActivated={onFontActivated}
                      />
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

function mapStateToProps(state) {
  return {
    fonts: state.fonts.fonts,
    tester: state.tester,
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
    updateFonts: (fonts) => dispatch(updateFonts(fonts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TesterMain);
