import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { css } from 'emotion';

import { updateFonts } from '../modules/fonts';

import { setActiveFont } from '../modules/tester';

import TesterFontContainer from './font-view-container';

const TesterMain = ({ fonts, openPanel }) => {
  // const onDragEnd = useCallback(
  //   (result) => {
  //     // dropped outside the list
  //     if (!result.destination) return;
  //     const startIndex = result.source.index;
  //     const endIndex = result.destination.index;
  //     const newFonts = Array.from(fonts);
  //     const [removed] = newFonts.splice(startIndex, 1);
  //     newFonts.splice(endIndex, 0, removed);
  //     // update font list
  //     updateFonts(newFonts);
  //   },
  //   [fonts]
  // );

  return (
    <main
      className={css`
        padding: ${openPanel === 'text' ? '16rem' : '5rem'} 5vw;
        transition: padding 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      `}
    >
      {fonts.map((id, index) => (
        <TesterFontContainer key={id} id={id} index={index} />
      ))}
    </main>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    fonts: state.tester.fonts.map((f) => f.id),
    openPanel: state.tester.openPanel,
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
