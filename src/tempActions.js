export const goForward = () => {
  return {
    type: GO_FORWARD
  };
};

export const goBackward = () => {
  return {
    type: GO_BACKWARD
  };
};

export const goBackwardInput = (value) => {
  return {
    type: GO_BACK_INPUT,
    value: value
  };
};

export const clearAndContinue = (index1, index) => {
  return {
    type: CLEAR_CONTINUE,
    index1: index1,
    index: index
  };
};

export const block = () => {
  return {
    type: BLOCK
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

        //dispatch(fetchNext(1));
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
        dispatch(goForward());
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
        dispatch(goBackward());
      }
    }
  };
};

export const loadNext = (value, value1, deckIndex) => {
  return {
    type: LOAD_NEXT,
    value: value,
    value1: value1,
    deckIndex: deckIndex
  };
};

export const storeNextReserve = (value, length) => {
  return {
    type: NEXT_RESERVE,
    value: value,
    length: length
  };
};

export const storePrevReserve = (value, length) => {
  return {
    type: PREV_RESERVE,
    value: value,
    length: length
  };
};

export const fetchForReserve = (deckValue) => {
  return (dispatch,getState) => {
    const {deckIndex} = getState().card;
    let baseImages=[];
    let deckName = deckNames.boosterPack[deckIndex+deckValue].name;
    let categoryName = "Booster Pack";

    axios.get(`/${categoryName}/${deckName}.json`)
      .then(response => {
        dispatch(storePopup(response.data.deck.wallpaper));

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
        else if(deckValue === -1 || deckValue === deckNames.boosterPack.length || deckValue===deckNames.boosterPack.length-1){
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
      dispatch(storePrevReserve(getState().card.images, getState().card.mainIndex));
    }

    dispatch(loadNext(nextReserve, nextLength, deckIndex+1));

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
      dispatch(storeNextReserve(getState().card.images,getState().card.mainIndex));
    }
    dispatch(loadNext(prevReserve, prevLength, deckIndex-1));
    dispatch(fetchForReserve(deckValue));
  };
};
