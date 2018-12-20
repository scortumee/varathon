import update from 'immutability-helper';
import data from '../../assets/base64';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  pic: [
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0},
    {img: data.defPic, detail:0}
  ],
  index: -1,
  index1: -1,
  mainIndex:-1,
  deckIndex:-1,
  firstTime:true,
  render: true,
  cardNum:10
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_MOBILE: {
      let cardNum;
      if(action.value) {
        cardNum=6;
      }
      else {
        cardNum=10;
      }
      return {
        ...state,
        cardNum:cardNum
      };
    }
    case actionTypes.BLOCK: {
      return {
        ...state,
        render: false
      };
    }

    case actionTypes.UNBLOCK: {
      return {
        ...state,
        render: true
      };
    }

    case actionTypes.CLEAR_CONTINUE: {
      //console.log('here');
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

      if(index === state.cardNum){
        index = 0;
        firstTime = false;
      }
      //console.log(state.index1);
      const newState = update(state.pic, {
          [index]: {
            img: {$set: action.value[index1]},
            detail: {$set: action.detail[index1]}
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
      let index1 = state.index1-state.cardNum;

      if(index===-1) {
        index = state.cardNum-1;
      }

      const newState = update(state.pic, {
          [index]: {
            img: {$set: action.value[index1]},
            detail: {$set: action.detail[index1]}
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

      //console.log("HEEEEEREEE",index1);

      if(index === -1) {
        index = 9;
      }

      const newState = update(state.pic, {
        [index]: {
          img: {$set: action.value[index1]},
          detail: {$set: action.detail[index1]}
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
        ...state,
        pic: [
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0},
          {img: data.defPic, detail:0}
        ],
        index: -1,
        index1: -1,
        mainIndex:-1,
        deckIndex: action.value,
        firstTime:true,
        render: true
      }
    }
    case actionTypes.RENDER_FIRST_10: {
      let i, newState;
      newState=state.pic;
      for(i=0; i<state.cardNum; i++) {
        newState = update(newState, {
            [i]: {
              img: {$set: action.value[i]},
              detail: {$set: action.detail[i]}
            }
        });
      }
      return {
        ...state,
        pic: newState,
        index: state.cardNum-1,
        index1: state.cardNum-1,
        mainIndex: action.value.length,
        //deckIndex: action.deckIndex,
        firstTime:true,
        render: true
      }
    }
      default:
        return state;
    }
};

export default reducer;
