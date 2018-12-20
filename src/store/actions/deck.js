import * as actionTypes from './actionTypes';
import * as actionCreators from './index';
import {encode} from 'node-base64-image';

export const storePack = (title,images,detail) => {
  return {
    type: actionTypes.STORE_PACK,
    title:title,
    images:images,
    detail:detail
  };
};

export const renderDecks = (value, detail) => {
  return {
    type: actionTypes.RENDER_DECKS,
    value:value,
    detail:detail
  };
};

export const switchMobile = (value)=> {
  return {
    type: actionTypes.SWITCH_MOBILE,
    value:value
  };
};

export const unblockDeck = () => {
  return {
    type: actionTypes.UNBLOCK_DECK
  };
};

export const blockDeck = () => {
  return {
    type: actionTypes.BLOCK_DECK
  };
};

export const goFwdDeck = (value,detail) => {
  return {
    type: actionTypes.GO_FWD_DECK,
    value: value,
    detail: detail
  };
};

export const goBwdDeck = (value,detail) => {
  return {
    type: actionTypes.GO_BWD_DECK,
    value: value,
    detail: detail
  };
};

export const goFwdDeckPage = (value,detail) => {
  return {
    type: actionTypes.GO_FWD_DECK_PAGE,
    value: value,
    detail: detail
  };
};

export const goBwdDeckPage = (value,detail) => {
  return {
    type: actionTypes.GO_BWD_DECK_PAGE,
    value: value,
    detail: detail
  };
};

export const updateNextDeck = () => {
  return (dispatch,getState) => {
    const {index1, mainIndex, render, cardNum} = getState().deck;
    const {packImages,packDetail} = getState().popup;

    /*if(index1 === cardNum-1) {
      dispatch(unblockDeck());
    }*/
    if(render) {
      if(index1 ===mainIndex-1) {
        //dispatch(blockDeck());
      }
      else {
        dispatch(goFwdDeck(packImages,packDetail));
      }
    }
  };
};

export const updatePrevDeck = () => {
  return (dispatch,getState) => {
    const {index1, mainIndex, render, cardNum} = getState().deck;
    const {packImages,packDetail} = getState().popup;

    /*if(index1 ===mainIndex-1) {
      dispatch(unblockDeck());
    }*/
    if(render) {
      if(index1 === cardNum-1) {
        //dispatch(blockDeck());
      }
      else {
        dispatch(goBwdDeck(packImages,packDetail));
      }
    }
  };
};

export const nextDeckPage = () => {
  return (dispatch,getState) => {
    const {index1, mainIndex,render,cardNum} = getState().deck;
    const {packImages,packDetail} = getState().popup;

    /*if(index1 === 0) {
      dispatch(unblockDeck());
    }*/

    if(render) {
      if(index1>=mainIndex-1) {
        //dispatch(blockDeck());
      }
      else {
        dispatch(goFwdDeckPage(packImages,packDetail));
      }
    }
  };
};

export const prevDeckPage = () => {
  return (dispatch,getState) => {
    const {index1,mainIndex,render} = getState().deck;
    const {packImages,packDetail} = getState().popup;

    /*if(index1 ===mainIndex-1) {
      dispatch(unblockDeck());
    }*/

    if(render) {
      if(index1 === 0) {
        //dispatch(blockDeck());
      }
      else {
        dispatch(goBwdDeckPage(packImages,packDetail));
      }
    }
  };
};

export const loadPack = (title,list) => {
  return (dispatch, getState) => {
    dispatch(actionCreators.showPopUp());
    let base64;
    let baseImages = list.map((image, index) => {
      base64 = new Promise((resolve, reject) => {
         encode(image.image, { string: true }, (error, result) => {
           if (error) reject(error);
           if (result) resolve(result);
         });

       });
       return base64;
    });

    Promise.all(baseImages).then((baseResult)=> {
      dispatch(storePack(title,baseResult,list));
      dispatch(renderDecks(baseResult,list));
      dispatch(actionCreators.hidePopUp());
    });
  };
};

export const renderOnSwitch_Deck =() => {
  return(dispatch,getState) => {
    const {packImages,packDetail} = getState().popup;
    dispatch(renderDecks(packImages,packDetail));
  }
};
