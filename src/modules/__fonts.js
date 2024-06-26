import produce from 'immer';

const ADD_FONT_TO_LIBRARY = 'ADD_FONT_TO_LIBRARY';
const REMOVE_FONT = 'REMOVE_FONT';

const SET_FONT_FEATURE = 'SET_FONT_FEATURE';
const SET_FONT_VARIATION_AXIS = 'SET_FONT_VARIATION_AXIS';
const SET_FONT_NAMED_VARIATION = 'SET_FONT_NAMED_VARIATION';
const SET_FONT_CONFIG_PROP = 'SET_FONT_CONFIG_PROP';
const RESET_FONT = 'RESET_FONT';

// import { initialFontsState } from './initial-state';

import { otFeatures } from '../constants';

export function addFontToLibrary({ id, metrics, blob }) {
  return {
    type: ADD_FONT_TO_LIBRARY,
    payload: { id, metrics, blob },
  };
}

export function removeFont(id) {
  return {
    type: REMOVE_FONT,
    payload: id,
  };
}

const UPDATE_FONTS = 'UPDATE_FONTS';

export function updateFonts(fonts) {
  return {
    type: UPDATE_FONTS,
    payload: { fonts },
  };
}
export function resetFont(id) {
  return {
    type: RESET_FONT,
    payload: { id },
  };
}

export function setFontFeature(id, key, value) {
  return {
    type: SET_FONT_FEATURE,
    payload: {
      id,
      key,
      value,
    },
  };
}

export function setFontVariationAxis(id, axis, value) {
  return {
    type: SET_FONT_VARIATION_AXIS,
    payload: {
      id,
      axis,
      value,
    },
  };
}

export function setFontNamedVariation(id, variationName) {
  return {
    type: SET_FONT_NAMED_VARIATION,
    payload: {
      id,
      variationName,
    },
  };
}

export function setFontConfigProp(id, key, value) {
  return {
    type: SET_FONT_CONFIG_PROP,
    payload: {
      id,
      key,
      value,
    },
  };
}

const getFontIndexById = (fonts) => (id) => fonts.findIndex((f) => f.id === id);

export const fonts = produce((state = initialFontsState, action) => {
  const getFontIndex = getFontIndexById(state.fonts);
  const { payload } = action;
  let fontIndex = null;
  switch (action.type) {
    //
    case ADD_FONT_TO_LIBRARY:
      state.fonts.unshift(payload);
      break;
    //
    case REMOVE_FONT:
      fontIndex = getFontIndex(payload);
      state.fonts.splice(fontIndex, 1);
      break;
    //
    case SET_FONT_FEATURE:
      fontIndex = getFontIndex(payload.id);
      state.fonts[fontIndex].config.features[payload.key] = payload.value;
      break;
    case RESET_FONT:
      fontIndex = getFontIndex(payload.id);

      state.fonts[fontIndex].metrics.availableFeatures.forEach((f) => {
        state.fonts[fontIndex].config.features[f] = false;
      });
      break;
    //

    case SET_FONT_NAMED_VARIATION:
      fontIndex = getFontIndex(payload.id);

      state.fonts[fontIndex].config.variations =
        state.fonts[fontIndex].metrics.namedVariations[payload.variationName];
      break;

    //
    case SET_FONT_CONFIG_PROP:
      fontIndex = getFontIndex(payload.id);

      break;

    //
    default:
      return state;
  }
});
