import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { injectGlobal } from 'emotion';

import {
  updateFonts,
  removeFont,
  setFontFeature,
  setFontVariationAxis,
  setFontNamedVariation,
  setFontConfigProp,
} from '../modules/fonts';

import FontView from './font-view';

const FontsListView = ({
  fonts,
  config,
  updateFonts,
  removeFont,
  setFontFeature,
  setFontVariationAxis,
  setFontNamedVariation,
}) => {
  useEffect(() => {
    fonts.forEach((font) => {
      injectGlobal`
        @font-face {
          font-family: '${font.metrics.familyName}';
          font-weight: ${font.metrics.weight};
          font-style: ${font.metrics.italic ? 'italic' : 'normal'};
          src: url('${font.blob}')
              format('opentype');
        }
        `;
    });
  }, [fonts]);

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

  const onSetFontFeature = useCallback((id, key, value) => {
    setFontFeature(id, key, value);
  }, []);

  const onSetFontVariationAxis = useCallback((id, axis, value) => {
    setFontVariationAxis(id, axis, value);
  }, []);

  const onSetFontNamedVariation = useCallback((id, variation) => {
    setFontNamedVariation(id, variation);
  }, []);

  return (
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
                      globalConfig={config}
                      setNamedVariation={onSetFontNamedVariation}
                      setFontVariationAxis={onSetFontVariationAxis}
                      setFontFeature={onSetFontFeature}
                      onRemove={onRemove}
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
  );
};

function mapStateToProps(state) {
  return {
    fonts: state.fonts.fonts,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFontConfigProp: (id, key, value) =>
      dispatch(setFontConfigProp(id, key, value)),
    setFontFeature: (id, key, enabled) =>
      dispatch(setFontFeature(id, key, enabled)),
    setFontVariationAxis: (id, axis, value) =>
      dispatch(setFontVariationAxis(id, axis, value)),
    setFontNamedVariation: (id, name) =>
      dispatch(setFontNamedVariation(id, name)),
    removeFont: (id) => dispatch(removeFont(id)),
    updateFonts: (fonts) => dispatch(updateFonts(fonts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FontsListView);
