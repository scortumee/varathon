import update from 'immutability-helper';
import data from '../../assets/base64';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  pic: [
    {img: data.defPic},
    {img: data.defPic},
    {img: data.defPic},
    {img: data.defPic},
    {img: data.defPic},
    {img: data.defPic},
    {img: data.defPic},
    {img: data.defPic},
    {img: data.defPic},
    {img: data.defPic}
  ],
  index: -1,
  index1: -1,
  mainIndex:-1,
  deckIndex:-1,
  firstTime:true,
  render: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BLOCK: {
      return {
        ...state,
        render: false
      };
    }

    case actionTypes.CLEAR_CONTINUE: {
      console.log('here');
      return {
        ...state,
        index1: action.index1,
        index: action.index,
        render: true
      };
    }

    case actionTypes.GO_FORWARD: {
      let index = state.index+1;
      let index1 = state.index1+1;
      let firstTime = state.firstTime;

      if(index === 10){
        index = 0;
        firstTime = false;
      }

      const newState = update(state.pic, {
          [index]: {
            img: {$set: action.value[index1]}
          }
      });

      return {
        ...state,
        pic: newState,
        firstTime: firstTime,
        index: index,
        index1: index1
      };
    }

    case actionTypes.GO_BACKWARD: {
      let index = state.index;
      let index1 = state.index1-10;

      if(index===-1) {
        index = 9;
      }

      const newState = update(state.pic, {
          [index]: {
            img: {$set: action.value[index1]}
          }
      });

      return {
        ...state,
        pic: newState,
        index: index-1,
        index1: state.index1-1
      };

    }

    case actionTypes.GO_BACK_INPUT: {
      let index = state.index;
      let index1 = action.value.length+state.index1-10;

      console.log("HEEEEEREEE",index1);

      if(index === -1) {
        index = 9;
      }

      const newState = update(state.pic, {
        [index]: {
          img: {$set: action.value[index1]}
        }
      });

      return {
        ...state,
        pic: newState,
        index: index-1,
        index1: state.index1-1
      };
    }

    case actionTypes.UPDATE_INDEX: {
      return {
        ...state,
        mainIndex: action.mainIndex,
        deckIndex: action.deckIndex
      }
    }

    case actionTypes.SET_DEFAULT: {
      return {
        pic: [
          {img: data.defPic},
          {img: data.defPic},
          {img: data.defPic},
          {img: data.defPic},
          {img: data.defPic},
          {img: data.defPic},
          {img: data.defPic},
          {img: data.defPic},
          {img: data.defPic},
          {img: data.defPic}
        ],
        index: -1,
        index1: -1,
        mainIndex:-1,
        deckIndex:-1,
        firstTime:true,
        render: true
      }
    }
      default:
        return state;
    }
};

export default reducer;
