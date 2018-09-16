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

export const setSubMenu = (index) => {
  return (dispatch,getState) => {
    let value=null;
    let {list} = getState().cardReserve.currentCategory;
    if(index===1) {
      dispatch(setDefault(0));
      value=list.length;
    }
    else if(index===0) {
      dispatch(setDefault(list.length-1));
      value=0;
    }
    else {
      dispatch(setDefault(index-1));
      value=-1;
    }
    console.log("IN A CATEGORY.js","index",index,"val",value);
    dispatch(actionCreators.fetchForReserve(1));
    dispatch(actionCreators.fetchForReserve(value));
  };
};

export const setCategory = (title, list) => {
  return (dispatch,getState) => {
    dispatch(storeCategory(title,list));
    dispatch(setDefault(-1));

    dispatch(actionCreators.fetchForReserve(1));
    dispatch(actionCreators.fetchForReserve(list.length));
  };
};
