import produce from 'immer';

const UPDATE_FONTS = 'UPDATE_FONTS';
const ADD_FONT = 'ADD_FONT';
const REMOVE_FONT = 'REMOVE_FONT';

const SET_FONT_FEATURE = 'SET_FONT_FEATURE';
const SET_FONT_VARIATION_AXIS = 'SET_FONT_VARIATION_AXIS';
const SET_FONT_NAMED_VARIATION = 'SET_FONT_NAMED_VARIATION';
const SET_FONT_CONFIG_PROP = 'SET_FONT_CONFIG_PROP';
const SET_GLOBAL_CONFIG_PROP = 'SET_GLOBAL_CONFIG_PROP';

import { otFeatures } from '../constants';

export const uuid = () =>
  `${Math.random().toString(36).substring(2) + Date.now().toString(36)}`;

export function addFont({ metrics, blob }) {
  return {
    type: ADD_FONT,
    payload: { metrics, blob },
  };
}

export function removeFont(id) {
  return {
    type: REMOVE_FONT,
    payload: id,
  };
}

export function updateFonts(fonts) {
  return {
    type: UPDATE_FONTS,
    payload: fonts,
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

export function setGlobalConfigProp(key, value) {
  return {
    type: SET_GLOBAL_CONFIG_PROP,
    payload: {
      key,
      value,
    },
  };
}

const initialFontsState = {
  fonts: [],
};

const initialConfigState = {
  text:
    'I would like you to speak to the medical doctors to see if there’s any way that you can apply light and heat to cure. You know? If you could? And maybe you can, maybe you can’t. Again, I say maybe you can, maybe you can’t. I’m not a doctor. But I’m a person that has a good… You know what.',
  fontSize: 32,
  lineHeight: 1.15,
  direction: 'ltr',
  align: 'left',
};

const getFontIndexById = (fonts) => (id) => fonts.findIndex((f) => f.id === id);

export const config = produce((state = initialConfigState, action) => {
  const { payload } = action;
  switch (action.type) {
    //
    case SET_GLOBAL_CONFIG_PROP:
      console.log(payload);
      state[payload.key] = payload.value;
      break;

    //
    default:
      return state;
  }
});
export const fonts = produce((state = initialFontsState, action) => {
  const getFontIndex = getFontIndexById(state.fonts);
  const { payload } = action;
  let fontIndex = null;
  switch (action.type) {
    //
    case ADD_FONT:
      const { metrics, blob } = payload;
      state.fonts.push(initializeFontEntry(metrics, blob));
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
    //
    case SET_FONT_VARIATION_AXIS:
      fontIndex = getFontIndex(payload.id);
      state.fonts[fontIndex].config.variations[payload.axis] = payload.value;
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
    case UPDATE_FONTS:
      state.fonts = action.payload;
      break;
    //
    default:
      return state;
  }
});

//
const initializeFontEntry = (metrics, blob) => {
  const {
    availableFeatures = [],
    variationAxes,
    namedVariations,
    defaultVariationName,
  } = metrics;

  const featuresConfig = Object.keys(otFeatures).reduce((res, cur) => {
    if (availableFeatures.includes(cur)) {
      res[cur] = false;
    }
    return res;
  }, {});

  const vAxes = Object.keys(variationAxes);

  const variationsDefaults = defaultVariationName
    ? namedVariations[defaultVariationName]
    : [];

  const variationsConfig = vAxes.reduce((res, cur) => {
    res[cur] = variationsDefaults[cur] || variationAxes[cur].default;
    return res;
  }, {});

  const config = {
    id: uuid(),
    metrics,
    blob,
    config: {
      features: featuresConfig,
      variations: variationsConfig,
    },
  };

  return config;
};
