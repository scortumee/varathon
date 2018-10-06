import React, {Component} from 'react';
import classes from './Menus.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import './Menus.css';

class Carousel extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      style: classes.tier2
    };
  }

  clicked =()=> {
    this.props.showPopUp();

    this.props.setSubMenu(Math.abs(this.props.deck.id-this.props.deckLength));
  }

  render() {
    const divStyle = {
      border: 'none',
      backgroundColor: 'black',
      fontSize: '36px',
      fontFamily: 'D-DIN Condensed',
      cursor: 'pointer',
      position: 'relative',
      display: 'inline-block',
      textDecoration: 'none',
      padding: '0 30px'
    };
    return (
      <div ref={(el) => this.button = el} onClick={()=>this.clicked()} className='tier2Large'>
        {this.props.deck.name.split("_").join(" ")}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      setSubMenu: (index) => dispatch(actionCreators.setSubMenu(index)),
      showPopUp: () => dispatch(actionCreators.showPopUp())
    };
};

export default connect(null, mapDispatchToProps)(Carousel);
