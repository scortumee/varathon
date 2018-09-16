import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentReserve:0,
  currentDetail:0,
  currentName: "",
  showTier: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_MENU: {
      let tierNum = state.showTier+action.value;
      if(tierNum ===3) {
        tierNum =2;
      }
      else if(tierNum ===-1) {
        tierNum=0;
      }
      return {
        ...state,
        showTier: tierNum
      };
    }

    case actionTypes.LOAD_CURRENT: {
      return {
        ...state,
        currentReserve: action.value,
        currentDetail: action.detail,
        currentName: action.name
      };
    }
    default:
      return state;
  }
};

export default reducer;
