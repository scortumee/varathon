import React, { PureComponent } from 'react';
//import Popup from "reactjs-popup";
import Modal from './Modal.js'
import classes from './Card.module.css';


class Card extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      cardStyle: classes.Image
    };
  }
  /*
  componentWillReceiveProps ( nextProps ) {
    if(this.props.image.img !== nextProps.image.img || this.props.image.highlight !== nextProps.image.highlight) {
      console.log("Hey");
      //this.setState({cardStyle: classes.ImageHalo});
      console.log(this.state.cardStyle);
    }
    else {
      this.setState({cardStyle: classes.Image});
    }

  }
  */

  /*shouldComponentUpdate (nextProps, nextState) {
    console.log('Hey', this.state, nextState);
    return this.props.image !== nextProps.image;
  }*/

  /*componentWillUpdate ( nextProps, nextState ) {
    if(this.state.cardStyle !== nextState.cardStyle) {
      this.setState({cardStyle: classes.Image});
    }
  }*/

    render () {
      return (
        <Modal input={
                      <div className={classes.Card}>
                      <img className = {this.state.cardStyle} src ={"data:image/jpeg;base64," + this.props.image.img}/>
                      </div>
                    }  //go to Modal.js for modification
               detail={this.props.image.detail}
               cardimage={"data:image/jpeg;base64," + this.props.image.img}>
        </Modal>
    );
  }
}
export default Card;
