import * as actionTypes from './actionTypes';
import * as actionCreators from './index';

export const storeCategory = (title, list) => {
  return {
    type: actionTypes.SET_CATEGORY,
    title: title,
    list: list
  };
};

export const setDefault = () => {
  return {
    type: actionTypes.SET_DEFAULT
  };
};

export const setCategory = (title, list) => {
  return (dispatch,getState) => {
    dispatch(storeCategory(title,list));
    dispatch(setDefault());
    
    dispatch(actionCreators.fetchForReserve(1));
    dispatch(actionCreators.fetchForReserve(list.length));
  };
};
