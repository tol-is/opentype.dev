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
      state.fonts.push({
        id: uuid(),
        metrics,
        blob,
        config: {
          text:
            'I would like you to speak to the medical doctors to see if there’s any way that you can apply light and heat to cure. You know? If you could? And maybe you can, maybe you can’t. Again, I say maybe you can, maybe you can’t. I’m not a doctor. But I’m a person that has a good… You know what. ',
          fontSize: 42,
          lineHeight: 1.15,
        },
      });
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
