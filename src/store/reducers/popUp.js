import * as actionTypes from '../actions/actionTypes';

const initialState = {
  showPopup: true,
  packTitle:0,
  packImages:0,
  packDetail:0
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
    case actionTypes.STORE_PACK: {
      return{
        ...state,
        packTitle: action.title,
        packImages: action.images,
        packDetail: action.detail
      }
    }

    default:
      return state;
  }
};

export default reducer;
