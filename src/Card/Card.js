import React, { PureComponent } from 'react';
//import Popup from "reactjs-popup";
import Modal from './Product_page/Modal.js'
import classes from './Card.module.css';

class Card extends PureComponent {
  constructor( props ) {
    super( props );

    this.state = {

    };
  }

  render () {
    return (
      <Modal input={
                    <div className={classes.Card}>
                      <img className = {classes.Image} src ={"data:image/jpeg;base64," + this.props.image.img} alt={this.props.image.detail!==undefined?this.props.image.detail.name:"blank"}/>
                      {this.props.image.detail.end !== undefined ?
                        <img className ={classes.GreenLine} src={require('../assets/EndTag.png')} alt='endTag'/>
                        :null
                      }
                    </div>
                  }  //go to Modal.js for modification
             detail={this.props.image.detail}
             cardimage={"data:image/jpeg;base64," + this.props.image.img}>
      </Modal>
    );
  }
}
export default Card;
