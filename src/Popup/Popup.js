import React, {Component} from 'react';
import classes from './Popup.module.css';

class Popup extends Component {
  render() {
    return (
      <div className={classes.popup}>
        <div className={classes.popup_inner}>
          <img className = {classes.Image} src ={this.props.image}/>
        </div>
      </div>
    );
  }
}

export default Popup;
