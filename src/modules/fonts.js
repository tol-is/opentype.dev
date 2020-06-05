import produce from 'immer';

const ADD_FONT = 'ADD_FONT';
const DELETE_FONT = 'DELETE_FONT';

export function addFont({ metrics, blob }) {
  return {
    type: ADD_FONT,
    payload: { metrics, blob },
  };
}

export function removeFont(id) {
  return {
    type: DELETE_FONT,
    payload: id,
  };
}

const initialState = {
  fonts: [],
};

export const fonts = produce((state = initialState, action) => {
  switch (action.type) {
    case ADD_FONT:
      const { metrics, blob } = action.payload;
      state.fonts.push({ metrics, blob });
    case DELETE_FONT:
    // draft.newToDo = action.value;
    default:
      return state;
  }
});
