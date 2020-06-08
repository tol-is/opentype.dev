import produce from 'immer';

const SET_TESTER_GLOBAL_PROP = 'SET_TESTER_GLOBAL_PROP';

export function setGlobalConfigProp(key, value) {
  return {
    type: SET_TESTER_GLOBAL_PROP,
    payload: {
      key,
      value,
    },
  };
}

const initialState = {
  text:
    'I would like you to speak to the medical doctors to see if there’s any way that you can apply light and heat to cure. You know? If you could? And maybe you can, maybe you can’t. Again, I say maybe you can, maybe you can’t. I’m not a doctor. But I’m a person that has a good… You know what.',
  fontSize: 32,
  lineHeight: 1.15,
  direction: 'ltr',
  align: 'left',
  openPanel: null,
};

export const tester = produce((state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    //
    case SET_TESTER_GLOBAL_PROP:
      state[payload.key] = payload.value;
      break;

    //
    default:
      return state;
  }
});
