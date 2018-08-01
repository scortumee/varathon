import * as actionTypes from '../actions/actionTypes';

const initialState = {
  showPopup: true,
  popWallpaper: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SHOW_POP_UP: {
      return {
        ...state,
        showPopup: true
      };
    }
    case actionTypes.HIDE_POP_UP: {
      return{
        ...state,
        showPopup:false
      }
    }
    case actionTypes.STORE_POP_UP: {
      return {
        ...state,
        popWallpaper: action.value
      }
    }
    default:
      return state;
  }
};

export default reducer;
