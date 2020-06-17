import produce from 'immer';

const ADD_FONT_TO_LIBRARY = 'ADD_FONT_TO_LIBRARY';

export function addFontToLibrary({ id, metrics, blob }) {
  return {
    type: ADD_FONT_TO_LIBRARY,
    payload: { id, metrics, blob },
  };
}

export const library = produce((state = { fonts: {} }, action) => {
  const { payload } = action;
  switch (action.type) {
    //
    case ADD_FONT_TO_LIBRARY:
      state.fonts[payload.id] = payload;
      break;

    default:
      return state;
  }
});
