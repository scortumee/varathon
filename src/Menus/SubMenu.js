import React, {Component} from 'react';
import classes from './Menus.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

class SubMenu extends Component {
  constructor( props ) {
    super( props );
    this.state = {

    };
  }

  clicked =()=> {
    console.log("INSIDE SUBMENU CLICKED");
    this.props.showPopUp();

    if(this.props.index===0) {
      this.props.adjustRight(true);
      this.props.setSubMenu(this.props.deck.id);
    }
    else if(this.props.index===2) {
      this.props.adjustRight(false);
      this.props.setSubMenu(this.props.deck.id);
    }
    else {
      this.props.setSubMenu(this.props.deck.id);
    }
  }

  clickedTest = () => {

  }

  render() {
    return (
      <button onClick={()=>this.clicked()} className={classes.tier2}>
        {this.props.deck.name}
      </button>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      setSubMenu: (index) => dispatch(actionCreators.setSubMenu(index)),
      showPopUp: () => dispatch(actionCreators.showPopUp())
    };
};

export default connect(null, mapDispatchToProps)(SubMenu);
