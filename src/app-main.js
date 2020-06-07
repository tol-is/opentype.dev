import { connect } from 'react-redux';
import React, { useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { injectGlobal } from 'emotion';

import {
  updateFonts,
  removeFont,
  setFontFeature,
  setFontVariation,
  setFontNamedVariation,
  setFontConfigProp,
} from './modules/fonts';
import FontView from './ui/font-view';

const AppMain = styled.main`
  min-height: 100vh;
  padding: 8em 0;
`;

const Main = ({
  fonts,
  updateFonts,
  removeFont,
  setFontFeature,
  setFontVariation,
  setFontNamedVariation,
  setFontConfigProp,
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

  const onSetFontVariation = useCallback((id, key, value) => {
    setFontVariation(id, key, value);
  }, []);

  const onSetFontNamedVariation = useCallback((id, variation) => {
    setFontNamedVariation(id, variation);
  }, []);

  const onSetConfigProp = useCallback((id, key, value) => {
    setFontConfigProp(id, key, value);
  }, []);

  return (
    fonts && (
      <AppMain>
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
                          metrics={font.metrics}
                          config={font.config}
                          setFontVariation={onSetFontVariation}
                          setNamedVariation={onSetFontNamedVariation}
                          setFontFeature={onSetFontFeature}
                          setConfigProp={onSetConfigProp}
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
      </AppMain>
    )
  );
};

function mapStateToProps(state) {
  return {
    fonts: state.fonts.fonts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFontConfigProp: (id, key, value) =>
      dispatch(setFontConfigProp(id, key, value)),
    setFontFeature: (id, key, enabled) =>
      dispatch(setFontFeature(id, key, enabled)),
    setFontVariation: (id, key, value) =>
      dispatch(setFontVariation(id, key, value)),
    setFontNamedVariation: (id, config) =>
      dispatch(setFontNamedVariation(id, config)),
    removeFont: (id) => dispatch(removeFont(id)),
    updateFonts: (fonts) => dispatch(updateFonts(fonts)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
