import * as actionTypes from '../actions/actionTypes';

const initialState = {
  prevReserve:0,
  nextReserve:0,

  prevLength:0,
  nextLength:0,

  nextDetail:0,
  prevDetail:0,

  currentCategory:{
    title:0, list:0
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.NEXT_RESERVE: {
      return {
        ...state,
        nextReserve: action.value,
        nextDetail: action.detail,
        nextLength: action.length
      };
    }

    case actionTypes.PREV_RESERVE: {
      return {
        ...state,
        prevReserve: action.value,
        prevDetail: action.detail,
        prevLength: action.length
      };
    }

    case actionTypes.SET_CATEGORY: {
      return {
        ...state,
        currentCategory: {
          title: action.title,
          list: action.list
        }
      };
    }

    /*case actionTypes.LOAD_CURRENT: {
      return {
        ...state,
        currentReserve: action.value
      };
    }*/
    default:
      return state;
  }
};

export default reducer;
