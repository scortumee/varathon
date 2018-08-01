import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentReserve:0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SPEED_UP: {
      const moreSpeed = action.value*4;
      console.log(moreSpeed);
      return {
        ...state,
        speed: state.speed1 + moreSpeed
      };
    }

    case actionTypes.LOAD_CURRENT: {
      return {
        currentReserve: action.value
      };
    }
    default:
      return state;
  }
};

export default reducer;
