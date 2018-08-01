import React from 'react';
import classes from './Menus.module.css';

const subMenu = (props) => {
  return (
    <button className={classes.tier2}>
      {props.name}
    </button>
  );
};

export default subMenu;
