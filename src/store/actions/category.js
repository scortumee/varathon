import * as actionTypes from './actionTypes';
import * as actionCreators from './index';

export const storeCategory = (title, list) => {
  return {
    type: actionTypes.SET_CATEGORY,
    title: title,
    list: list
  };
};

export const toggleMenu = (value) => {
  return {
    type: actionTypes.TOGGLE_MENU,
    value: value
  };
};

export const setDefault = (value) => {
  return {
    type: actionTypes.SET_DEFAULT,
    value: value
  };
};

export const unblock = () => {
  return {
    type: actionTypes.UNBLOCK
  };
};

export const updateNextCard = () => {
  return (dispatch,getState) => {
    const {index1, mainIndex, render} = getState().card;
    const {currentReserve,currentDetail} = getState().button;

    /*if(index1 === 9) {
      dispatch(unblock());
    }*/
    if(render) {
      if(index1 ===mainIndex-1) {
        //dispatch(actionCreators.block());
      }
      else {
        dispatch(actionCreators.goForward(currentReserve,currentDetail));
      }
    }
  };
};

export const updatePrevCard = () => {
  return (dispatch,getState) => {
    const {index1, cardNum, render} = getState().card;
    const {currentReserve,currentDetail} = getState().button;

    /*if(index1 ===mainIndex-1) {
      dispatch(unblock());
    }*/
    if(render) {
      if(index1 === cardNum-1) {
        //dispatch(actionCreators.block());
      }
      else {
        dispatch(actionCreators.goBackward(currentReserve,currentDetail));
      }
    }
  };
};

// this is for loading selected single deck
export const loadSingleDeck =(title,list,deckIndex)=> {
  return (dispatch) => {
    dispatch(actionCreators.showPopUp());
    dispatch(storeCategory(title,list));
    dispatch(actionCreators.fetchSingle(deckIndex));
  };
};

// when screen size changes, render cards (on device change)
export const renderOnSwitch_Card = () => {
  return (dispatch,getState) => {
    const {currentReserve,currentDetail} = getState().button;
    const {deckIndex} = getState().card;
    dispatch(actionCreators.renderFirst10(currentReserve,currentDetail,deckIndex));
  };
};

/*export const setSubMenu = (index) => {
  return (dispatch,getState) => {
    dispatch(actionCreators.fetchData(index));
  };
};*/

// this is for loading Kukulkan with first ten pics are already displayed
/*export const loadFirst10 = (title,list,deckIndex) => {
  return (dispatch, getState) => {
    dispatch(storeCategory(title,list));

    dispatch(actionCreators.fetchData(deckIndex));
  };
};*/



/*export const setCategory = (title, list) => {
  return (dispatch,getState) => {
    dispatch(storeCategory(title,list));
    dispatch(setDefault(-1));

    dispatch(actionCreators.fetchForReserve(1));
    dispatch(actionCreators.fetchForReserve(list.length));
  };
};*/
