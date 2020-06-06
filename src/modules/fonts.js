import produce from 'immer';

const UPDATE_FONTS = 'UPDATE_FONTS';
const ADD_FONT = 'ADD_FONT';
const REMOVE_FONT = 'REMOVE_FONT';

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

const initialState = {
  fonts: [],
};

const getFontIndexById = (fonts) => (id) => fonts.findIndex((f) => f.id === id);

export const fonts = produce((state = initialState, action) => {
  const getFontIndex = getFontIndexById(state.fonts);

  switch (action.type) {
    case ADD_FONT:
      const { metrics, blob } = action.payload;
      state.fonts.push(initializeFontEntry(metrics, blob));
      break;
    case REMOVE_FONT:
      const fontIndex = getFontIndex(action.payload);
      state.fonts.splice(fontIndex, 1);
      // draft.newToDo = action.value;
      break;
    case UPDATE_FONTS:
      state.fonts = action.payload;

      break;
    default:
      return state;
  }
});

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

  const variationsDefaults =
    variationAxes && defaultVariationName
      ? namedVariations[defaultVariationName]
      : [];

  const variationsConfig =
    (variationAxes &&
      Object.keys(variationAxes).reduce((res, cur) => {
        res[cur] = variationsDefaults[cur] || variationAxes[cur].default;
        return res;
      }, {})) ||
    null;

  const config = {
    id: uuid(),
    metrics,
    blob,
    config: {
      text:
        'I would like you to speak to the medical doctors to see if there’s any way that you can apply light and heat to cure. You know? If you could? And maybe you can, maybe you can’t. Again, I say maybe you can, maybe you can’t. I’m not a doctor. But I’m a person that has a good… You know what.',
      fontSize: 32,
      lineHeight: 1.15,
      letterSpacing: 0,
      direction: 'ltr',
      align: 'left',
      features: featuresConfig,
      variations: variationsConfig,
    },
  };

  console.log(config);
  return config;
};
