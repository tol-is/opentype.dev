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
  text: `
  ABCDEFGHIJKLMNOPQRSTUVWXYZ
  abcdefghijklmnopqrstuvwxyz
  :;,.*‘?’“!”(%)[#]{@}/&
  1234567890
  1a 2o 9a No.
  3/4 16/9 7*4 7÷8 8:46
  <-+÷×=>`,
  fontSize: 42,
  lineHeight: 1.4,
  rtl: false,
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
