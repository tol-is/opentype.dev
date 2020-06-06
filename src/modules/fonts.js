import produce from 'immer';

const UPDATE_FONTS = 'REORDER_FONTS';
const ADD_FONT = 'ADD_FONT';
const DELETE_FONT = 'DELETE_FONT';

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
    type: DELETE_FONT,
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

export const fonts = produce((state = initialState, action) => {
  switch (action.type) {
    case ADD_FONT:
      const { metrics, blob } = action.payload;
      state.fonts.push({ id: uuid(), metrics, blob });
      break;
    case DELETE_FONT:
      // draft.newToDo = action.value;
      break;
    case UPDATE_FONTS:
      state.fonts = action.payload;

      break;
    default:
      return state;
  }
});
