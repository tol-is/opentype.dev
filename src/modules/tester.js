import produce from 'immer';

const SET_TESTER_GLOBAL_PROP = 'SET_TESTER_GLOBAL_PROP';
const SET_OPEN_PANEL = 'SET_OPEN_PANEL';
const ADD_FONT_TO_TESTER = 'ADD_FONT_TO_TESTER';

const SET_ACTIVE_FONT = 'SET_ACTIVE_FONT';
const SET_TOP_FONT = 'SET_TOP_FONT';
const SET_FONT_FEATURE = 'SET_FONT_FEATURE';
const SET_FONT_VARIATION_AXIS = 'SET_FONT_VARIATION_AXIS';
const SET_FONT_NAMED_VARIATION = 'SET_FONT_NAMED_VARIATION';
const SET_FONT_SAMPLE = 'SET_FONT_SAMPLE';
const REORDER_FONTS = 'REORDER_FONTS';

import { otFeatures } from '../constants';
import { reduce } from 'lodash';

export function reorderFonts(fonts) {
  return {
    type: REORDER_FONTS,
    payload: { fonts },
  };
}

export function addFontToTester({ id, metrics }) {
  return {
    type: ADD_FONT_TO_TESTER,
    payload: { id, metrics },
  };
}

export function setTesterProp(key, value) {
  return {
    type: SET_TESTER_GLOBAL_PROP,
    payload: {
      key,
      value,
    },
  };
}

export function setActiveFont(id) {
  return {
    type: SET_ACTIVE_FONT,
    payload: { id },
  };
}

export function setTopFont(id) {
  return {
    type: SET_TOP_FONT,
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

export function setFontSample(id, script, sample) {
  return {
    type: SET_FONT_SAMPLE,
    payload: {
      id,
      script,
      sample,
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

const initialState = {
  global: {
    topFont: '',
    activeFont: '',
    fontSize: 72,
    lineHeight: 1.3,
  },
  fonts: [],
};

const getFontIndexById = (fonts) => (id) => fonts.findIndex((f) => f.id === id);

export const tester = produce((state = initialState, action) => {
  const { payload = {} } = action;
  let fontIndex;

  if (payload.id) {
    fontIndex = getFontIndexById(state.fonts)(payload.id);
  }

  switch (action.type) {
    case ADD_FONT_TO_TESTER:
      state.fonts.unshift(initializeFontEntry(payload));
      break;
    //
    case SET_TESTER_GLOBAL_PROP:
      state.global[payload.key] = payload.value;
      break;
    //
    case SET_FONT_FEATURE:
      state.fonts[fontIndex].features[payload.key] = payload.value;
      break;
    //
    case SET_FONT_VARIATION_AXIS:
      state.fonts[fontIndex].variations[payload.axis] = payload.value;
      break;
    //
    case SET_FONT_SAMPLE:
      state.fonts[fontIndex].script = payload.script;
      state.fonts[fontIndex].sample = payload.sample;
      break;
    //
    case SET_ACTIVE_FONT:
      state.global.activeFont = payload.id;
      break;
    //
    case SET_TOP_FONT:
      state.global.topFont = payload.id;
      break;

    //
    case REORDER_FONTS:
      state.fonts = payload.fonts.reduce((res, cur) => {
        res.push(state.fonts.find((f) => f.id === cur));
        return res;
      }, []);
      break;

    //
    default:
      return state;
  }
});

//
const initializeFontEntry = ({ id, metrics }) => {
  const {
    availableFeatures = [],
    availableVariationAxes = [],
    variationAxes,
    variationsDefaults,
  } = metrics;

  const variationsConfig = availableVariationAxes.reduce((res, cur) => {
    res[cur] = variationsDefaults[cur] || variationAxes[cur].default;
    return res;
  }, {});

  const featuresConfig = Object.keys(otFeatures).reduce((res, cur) => {
    if (availableFeatures.includes(cur)) {
      res[cur] = false;
    }
    return res;
  }, {});

  const config = {
    id,
    features: featuresConfig,
    variations: variationsConfig,
    script: 'latin',
    sample: 'default',
  };

  return config;
};
