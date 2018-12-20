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
  render: true,
  cardNum: 10
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
    case actionTypes.BLOCK_DECK: {
      return {
        ...state,
        render: false
      };
    }

    case actionTypes.UNBLOCK_DECK: {
      return {
        ...state,
        render: true
      };
    }

    case actionTypes.GO_FWD_DECK: {
      let index = state.index+1;
      let index1 = state.index1+1;

      if(index === state.cardNum){
        index = 0;
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
        index: index,
        index1: index1
      };
    }

    case actionTypes.GO_BWD_DECK: {
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

    case actionTypes.GO_FWD_DECK_PAGE: {
      let i, newState,index;
      let index1 = state.index1+1;
      newState=state.pic;

      if(index1+state.cardNum-1<state.mainIndex) {
        for(i=0; i<state.cardNum; i++) {
          newState = update(newState, {
            [i]: {
              img: {$set: action.value[i+index1]},
              detail: {$set: action.detail[i+index1]}
            }
          });
        }
        index1 +=state.cardNum-1;
        index = state.cardNum;
      }
      else {
        for(i=0; i<state.mainIndex-index1; i++) {
          newState = update(newState, {
            [i]: {
              img: {$set: action.value[i+index1]},
              detail: {$set: action.detail[i+index1]}
            }
          });
        }
        index1 = state.mainIndex-1;
        index = state.mainIndex-index-1;
      }

      return {
        ...state,
        pic: newState,
        index: index,
        index1: index1
      };
    }

    case actionTypes.GO_BWD_DECK_PAGE: {
      let i, newState,index,val;
      let index1 = state.index1-1;
      newState=state.pic;
        // if remaining cards are below (10 or 6), number of card slots
      if(index1<state.cardNum-1) {

        /*for(i=0; i<state.cardNum; i++) {
          newState = update(newState, {
            [i]: {
              img: {$set: action.value[i+index1]},
              detail: {$set: action.detail[i+index1]}
            }
          });
        }
        index1 +=state.cardNum-1;
        index = state.cardNum;*/
      }
      else { // if remaining cards are above (10 or 6), number of card slots
        val = index1-state.cardNum-1;
        for(i=0; i<state.cardNum; i++) {
          newState = update(newState, {
            [i]: {
              img: {$set: action.value[val+i]},
              detail: {$set: action.detail[val+i]}
            }
          });
        }
        index1 -=state.cardNum-1 ;
        index = state.cardNum;
      }

      return {
        ...state,
        pic: newState,
        index: index,
        index1: index1
      };
    }

    case actionTypes.RENDER_DECKS: {
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
        render: true
      }
    }
      default:
        return state;
    }
};

export default reducer;
