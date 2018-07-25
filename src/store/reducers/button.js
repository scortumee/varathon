import * as actionTypes from '../actions/actionTypes';

const initialState = {
  speed: 500,
  speed1: 500
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
    default:
      return state;
  }
};

export default reducer;
