import * as actionTypes from './actionTypes';

export const setCategory = (value) => {
  return {
    type: actionTypes.SET_CATEGORY,
    value: value
  };
};
