import * as actionTypes from './actionTypes';
import * as actionCreators from './index';

import axios from '../../axios-orders';
import {encode} from 'node-base64-image';
import deckNames from '../../assets/deckNames';

export const goForward = (value) => {
  return {
    type: actionTypes.GO_FORWARD,
    value: value
  };
};

export const goBackward = (value) => {
  return {
    type: actionTypes.GO_BACKWARD,
    value: value
  };
};

export const goBackwardInput = (value) => {
  return {
    type: actionTypes.GO_BACK_INPUT,
    value: value
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
        dispatch(goForward(getState().cardReserve.currentReserve));
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
          dispatch(goBackwardInput(getState().cardReserve.prevReserve));
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
        dispatch(goBackward(getState().cardReserve.currentReserve));
      }
    }
  };
};

export const loadNext = (value, mainIndex, deckIndex) => {
  return {
    type: actionTypes.LOAD_NEXT,
    value: value,
    mainIndex: mainIndex,
    deckIndex: deckIndex
  };
};

export const updateIndex = (mainIndex,deckIndex) => {
  return {
    type: actionTypes.UPDATE_INDEX,
    mainIndex: mainIndex,
    deckIndex: deckIndex
  };
};

export const loadCurrent = (value) => {
  return {
    type: actionTypes.LOAD_CURRENT,
    value: value
  };
};

export const storeNextReserve = (value, length) => {
  return {
    type: actionTypes.NEXT_RESERVE,
    value: value,
    length: length
  };
};

export const storePrevReserve = (value, length) => {
  return {
    type: actionTypes.PREV_RESERVE,
    value: value,
    length: length
  };
};

export const fetchForReserve = (deckValue) => {
  return (dispatch,getState) => {
    const {deckIndex} = getState().card;
    let baseImages=[];
    let deckName = deckNames.starterDeck[deckIndex+deckValue].name;
    let categoryName = "Starter Deck";

    axios.get(`/${categoryName}/${deckName}.json`)
      .then(response => {
        //dispatch(actionCreators.storePopup(response.data.deck.wallpaper));

        response.data.cards.map((image, index) => {
          let base64 = new Promise((resolve, reject) => {
             encode(image.image, { string: true }, (error, result) => {
               if (error) reject(error);
               if (result) resolve(result);
             });
           });

           base64.then(value =>
            baseImages[index] = value);

        })
        if(deckValue === 1) {
          dispatch(storeNextReserve(baseImages,response.data.cards.length));
        }
        else if(deckValue === -1 || deckValue === deckNames.starterDeck.length || deckValue===deckNames.starterDeck.length-1){
          console.log(response.data.deck.name);
          dispatch(storePrevReserve(baseImages,response.data.cards.length));
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };
};

export const switchNext = () => {
  return (dispatch,getState) => {
    const {nextReserve, nextLength} = getState().cardReserve;
    let {deckIndex} = getState().card;

    if(deckIndex === deckNames.starterDeck.length-2 || deckIndex === deckNames.starterDeck.length-1) {
      deckIndex = -2;
    }

    if(getState().card.mainIndex === -1) {
      // do nothing
    }
    else {
      dispatch(storePrevReserve(getState().cardReserve.currentReserve, getState().card.mainIndex));
    }

    //dispatch(loadNext(nextReserve, nextLength, deckIndex+1));
    dispatch(loadCurrent(nextReserve));
    dispatch(updateIndex(nextLength,deckIndex+1));

    dispatch(fetchForReserve(1));
  };
};

export const switchPrev = () => {
  return (dispatch,getState) => {
    const {prevReserve, prevLength} = getState().cardReserve;
    let {deckIndex} = getState().card;
    let deckValue=-1;

    if(deckIndex === -1 || deckIndex === 0) {
      deckIndex = deckNames.starterDeck.length;
    }
    else if(deckIndex === 1) {
      deckValue = deckNames.starterDeck.length-1;
    }

    if(getState().card.mainIndex === -1) {
      // do nothing
    }
    else {
      dispatch(storeNextReserve(getState().cardReserve.currentReserve,getState().card.mainIndex));
    }
    //dispatch(loadNext(prevReserve, prevLength, deckIndex-1));
    dispatch(loadCurrent(prevReserve));
    dispatch(updateIndex(prevLength,deckIndex-1));

    dispatch(fetchForReserve(deckValue));
  };
};
