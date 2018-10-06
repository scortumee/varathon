import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

class SubMenu extends Component {
  componentDidMount() {
    if(this.props.index===1) {
      this.button.style.color = 'white';
    }
  }

  clicked =()=> {
    this.props.showPopUp();

    if(this.props.index===0) {
      this.props.adjustRight(true);
      this.props.setSubMenu(Math.abs(this.props.deck.id-this.props.deckLength));
    }
    else if(this.props.index===2) {
      this.props.adjustRight(false);
      this.props.setSubMenu(Math.abs(this.props.deck.id-this.props.deckLength));
    }
    else {
      this.props.setSubMenu(Math.abs(this.props.deck.id-this.props.deckLength));
      this.button.style.color = 'white';
    }
  }

  render() {
    return (
      <button ref={(el) => this.button = el} onClick={()=>this.clicked()} className={this.props.style} >
        {this.props.deck.name.split("_").join(" ")}
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
