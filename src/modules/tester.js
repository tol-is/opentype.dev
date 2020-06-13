import produce from 'immer';

const SET_TESTER_GLOBAL_PROP = 'SET_TESTER_GLOBAL_PROP';
const SET_ACTIVE_FONT = 'SET_ACTIVE_FONT';
const SET_OPEN_PANEL = 'SET_OPEN_PANEL';

export function setTesterProp(key, value) {
  return {
    type: SET_TESTER_GLOBAL_PROP,
    payload: {
      key,
      value,
    },
  };
}

export function setActiveFont(value) {
  return {
    type: SET_ACTIVE_FONT,
    payload: { value },
  };
}

export function setOpenPanel(value) {
  return {
    type: SET_OPEN_PANEL,
    payload: { value },
  };
}

const initialState = {
  text:
    'I would like you to speak to the medical doctors to see if there’s any way that you can apply light and heat to cure. You know? If you could? And maybe you can, maybe you can’t. Again, I say maybe you can, maybe you can’t. I’m not a doctor. But I’m a person that has a good… You know what.',
  fontSize: 42,
  lineHeight: 1.4,
  direction: 'ltr',
  align: 'left',
  openPanel: null,
  activeFont: '',
};

export const tester = produce((state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    //
    case SET_TESTER_GLOBAL_PROP:
      state[payload.key] = payload.value;
      break;
    case SET_ACTIVE_FONT:
      state.activeFont = payload.value;
      break;
    case SET_OPEN_PANEL:
      state.openPanel = payload.value;
      break;

    //
    default:
      return state;
  }
});
