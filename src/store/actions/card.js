import * as actionTypes from './actionTypes';
import * as actionCreators from './index';

import axios from '../../axios-orders';
import {encode} from 'node-base64-image';

export const goForward = (value,detail) => {
  return {
    type: actionTypes.GO_FORWARD,
    value: value,
    detail: detail
  };
};

export const goBackward = (value,detail) => {
  return {
    type: actionTypes.GO_BACKWARD,
    value: value,
    detail: detail
  };
};

export const goBackwardInput = (value,detail) => {
  return {
    type: actionTypes.GO_BACK_INPUT,
    value: value,
    detail: detail
  };
};

export const clearAndContinue = (index1, index) => {
  return {
    type: actionTypes.CLEAR_CONTINUE,
    index1: index1,
    index: index
  };
};

export const block = () => {
  return {
    type: actionTypes.BLOCK
  };
};

export const renderFirst10 = (value,detail,deckIndex) => {
  return {
    type: actionTypes.RENDER_FIRST_10,
    value: value,
    detail: detail,
    deckIndex: deckIndex
  };
};

export const updateNext = () => {
  return (dispatch, getState) => {

    const {index1, mainIndex, render} = getState().card;

    console.log(index1);
    console.log(mainIndex);

    if(render) {
      console.log("HELLO", index1, mainIndex);
      if(index1 ===mainIndex-1 || index1 === mainIndex) {
        dispatch(block());

        dispatch(switchNext());

        dispatch(clearAndContinue(-1, getState().card.index));
        //setTimeout( ()=> {dispatch(hidePopUp());}, 1500);
      }
      else if(index1-mainIndex>-1 ) {
        console.log("HERE motherfucker");
        dispatch(block());

        dispatch(switchNext());

        dispatch(clearAndContinue(-1, getState().card.index));
      }
      else {
        dispatch(goForward(getState().button.currentReserve,getState().button.currentDetail));
      }
    }

  };
};

export const updatePrev = () => {
  return (dispatch,getState) => {
    let {index1, mainIndex, index, render} = getState().card;

    console.log(index1);
    console.log(mainIndex);

    if(render) {
      console.log("HELLO", index1, mainIndex);
      if(index1 <=9 && index1 >=0) {

        if(getState().card.firstTime) {
          dispatch(block());

          dispatch(switchPrev());

          dispatch(clearAndContinue(getState().card.mainIndex+9, index));
        }
        else {
          dispatch(goBackwardInput(getState().cardReserve.prevReserve,getState().cardReserve.prevDetail));
        }
        /*dispatch(block());

        dispatch(switchPrev());

        dispatch(clearAndContinue(getState().card.mainIndex+9, index));
        //setTimeout( ()=> {dispatch(hidePopUp());}, 1500);*/
      }
      else if(index1 === -1) {

        dispatch(block());

        dispatch(switchPrev());

        if(getState().card.firstTime) {
          dispatch(clearAndContinue(getState().card.mainIndex+9, -1));
        }
        else {
          dispatch(clearAndContinue(getState().card.mainIndex-1, getState().card.index));
        }
        //setTimeout( ()=> {dispatch(hidePopUp());}, 1500);
      }
      else{
        dispatch(goBackward(getState().button.currentReserve,getState().button.currentDetail));
      }
    }
  };
};

export const updateIndex = (mainIndex,deckIndex) => {
  return {
    type: actionTypes.UPDATE_INDEX,
    mainIndex: mainIndex,
    deckIndex: deckIndex
  };
};

export const loadCurrent = (value,detail, name) => {
  return {
    type: actionTypes.LOAD_CURRENT,
    value: value,
    detail:detail,
    name: name
  };
};

export const storeNextReserve = (value,detail, length) => {
  return {
    type: actionTypes.NEXT_RESERVE,
    value: value,
    detail:detail,
    length: length
  };
};

export const storePrevReserve = (value,detail, length) => {
  return {
    type: actionTypes.PREV_RESERVE,
    value: value,
    detail:detail,
    length: length
  };
};

export const fetchForReserve = (deckValue) => {
  return (dispatch,getState) => {
    const {deckIndex} = getState().card;
    const {title,list} = getState().cardReserve.currentCategory;

    let base64;
    let deckName=null;
    let categoryName = title;
    let time = 0;

    if(deckIndex+deckValue === list.length) {
      deckName = list[0].name;
    }
    else {
      deckName = list[deckIndex+deckValue].name;
    }
    axios.get(`/${categoryName}/${deckName}.json`)
      .then(response => {
        let baseImages = response.data.cards.map((image, index) => {
          base64 = new Promise((resolve, reject) => {
             setTimeout(() => {encode(image.image, { string: true }, (error, result) => {
               if (error) reject(error);
               if (result) resolve(result);
             });}, time);

           });
           time = time+8;
           return base64;
        });

        Promise.all(baseImages).then((baseResult)=> {
          if(deckValue === 1) {
            dispatch(storeNextReserve(baseResult,response.data.cards,response.data.cards.length));
          }
          else if(deckValue === -1 || deckValue === list.length || deckValue===list.length-1 || deckValue===0){
            //console.log(response.data.deck.name);
            dispatch(storePrevReserve(baseResult,response.data.cards,response.data.cards.length));
            //setTimeout( ()=> {dispatch(actionCreators.hidePopUp());}, 400+response.data.cards.length);
          }
        });
      })

      .catch(function (error) {
        console.log(error);
      });
  };
};

export const fetchData = (deckValue) => {
  return (dispatch,getState) => {
    const {title,list} = getState().cardReserve.currentCategory;

    let base64;
    let deckName=null;
    let categoryName = title;

    deckName = list[deckValue].name;
    console.log(categoryName,deckName);
    axios.get(`/${categoryName}/${deckName}.json`)
      .then(response => {
        console.log(response);
        let baseImages = response.data.cards.map((image, index) => {
          base64 = new Promise((resolve, reject) => {
             encode(image.image, { string: true }, (error, result) => {
               if (error) reject(error);
               if (result) resolve(result);
             });

           });

           return base64;
        });

        Promise.all(baseImages).then((baseResult)=> {
          dispatch(actionCreators.setDefault(deckValue));

          if(deckValue === 0) {
            dispatch(fetchForReserve(list.length));
          }
          else {
            dispatch(fetchForReserve(-1));
          }
          dispatch(loadCurrent(baseResult,response.data.cards,response.data.cards.length));

          dispatch(renderFirst10(baseResult,response.data.cards,deckValue));
          dispatch(fetchForReserve(1));
          setTimeout( ()=> {dispatch(actionCreators.hidePopUp());}, 500);
        });
      })

      .catch(function (error) {
        console.log(error);
      });
  };
};

export const switchNext = () => {
  return (dispatch,getState) => {
    const {nextReserve,nextDetail, nextLength, currentCategory} = getState().cardReserve;

    let {deckIndex} = getState().card;

    if(deckIndex === currentCategory.list.length-1) {
      deckIndex = -1;
    }

    if(getState().card.mainIndex === -1) {
      // do nothing
    }
    else {
      dispatch(storePrevReserve(getState().button.currentReserve, getState().button.currentDetail,getState().card.mainIndex));
    }

    //dispatch(loadNext(nextReserve, nextLength, deckIndex+1));
    dispatch(loadCurrent(nextReserve,nextDetail, currentCategory.list[deckIndex+1].name));
    dispatch(updateIndex(nextLength,deckIndex+1));

    dispatch(fetchForReserve(1));

  };
};

export const switchPrev = () => {
  return (dispatch,getState) => {
    const {prevReserve, prevDetail, prevLength, currentCategory} = getState().cardReserve;
    let {deckIndex} = getState().card;
    let deckValue=-1;

    if(deckIndex === -1 || deckIndex === 0) {
      deckIndex = currentCategory.list.length;
    }
    else if(deckIndex === 1) {
      deckValue = currentCategory.list.length-1;
    }

    if(getState().card.mainIndex === -1) {
      // do nothing
    }
    else {
      dispatch(storeNextReserve(getState().button.currentReserve,getState().button.currentDetail,getState().card.mainIndex));
    }
    //dispatch(loadNext(prevReserve, prevLength, deckIndex-1));
    dispatch(loadCurrent(prevReserve, prevDetail,currentCategory.list[deckIndex-1].name));
    dispatch(updateIndex(prevLength,deckIndex-1));

    dispatch(fetchForReserve(deckValue));
  };
};
