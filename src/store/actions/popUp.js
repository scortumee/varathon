import * as actionTypes from './actionTypes';

export const storePopup = (value) => {
  return {
    type: actionTypes.STORE_POP_UP,
    value: value
  };
};

export const showPopUp = () => {
  return {
    type: actionTypes.SHOW_POP_UP
  };
};

export const hidePopUp = () => {
  return {
    type: actionTypes.HIDE_POP_UP
  };
};
