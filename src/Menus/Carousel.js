import React, {Component} from 'react';
import classes from './Menus.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import './Menus.css';

class Carousel extends Component {
  constructor( props ) {
    super( props );
    this.state = {

    };
  }

  shouldComponentUpdate(nextProps,nextState) {
    if(this.props.deckIndex !==nextProps.deckIndex) {
      if(nextProps.deckIndex === this.props.index) {
        this.button.style.color='white';
      }
      else {
        this.button.style.color='#909296';
      }
    }
    return false;
  }

  clicked =()=> {
    this.props.showPopUp();
    this.props.centerDeck(Math.abs(this.props.deck.id-this.props.deckLength));
    this.props.setSubMenu(Math.abs(this.props.deck.id-this.props.deckLength));
  }

  render() {
    console.log("INSIDE CAROUSEL WHITE HIGHLIGHTED");
    return (
      <div ref={(el) => this.button = el} onClick={()=>this.clicked()} className='tier2Large'>
        {this.props.deck.name.split("_").join(" ")}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deckIndex: state.card.deckIndex
  };
};

const mapDispatchToProps = dispatch => {
    return {
      //setSubMenu: (index) => dispatch(actionCreators.setSubMenu(index)),
      showPopUp: () => dispatch(actionCreators.showPopUp())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
