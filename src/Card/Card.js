import React, { PureComponent } from 'react';
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
    const styleImage = {
      height: '100%',
      width: '100%',
      boxShadow: '0px 0px 40px 20px #0ff'
    }
    console.log(this.state.cardStyle);
    return (
      <div className={classes.Card}>
        <img className = {this.state.cardStyle} src ={"data:image/jpeg;base64," + this.props.image.img}/>
      </div>
    );
  }
}

export default Card;
