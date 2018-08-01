import * as actionTypes from '../actions/actionTypes';

const initialState = {
  prevReserve:0,
  nextReserve:0,
  prevLength:0,
  nextLength:0,

  currentCategory:{
    title:0, list:0
  },
  currentReserve:0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.NEXT_RESERVE: {
      return {
        ...state,
        nextReserve: action.value,
        nextLength: action.length
      };
    }

    case actionTypes.PREV_RESERVE: {
      return {
        ...state,
        prevReserve: action.value,
        prevLength: action.length
      };
    }

    case actionTypes.SET_CATEGORY: {
      console.log(action.title,action.list);
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
