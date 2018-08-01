import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import classes from './Menus.module.css';
import FlexView from 'react-flexview';
import SubMenu from './SubMenu';

import deckNames from '../assets/deckNames';

class Menus extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showTier1: false,
      showTier2: false,
      mainStyle: classes.mainButton
    };
  }

  clicked1 = () => {
    if(this.state.showTier1) {
      this.setState({showTier1: false, showTier2: false});

      this.setState({mainStyle: classes.mainButton})
    }
    else {
      this.setState({showTier1: true, });
      this.setState({mainStyle: classes.mainClicked})
    }
  }

  clicked2 = () => {
    if(this.state.showTier2) {
      this.setState({showTier2: false});
      //this.setState({tierStyle0: classes.btn2})
    }
    else {
      this.setState({showTier2: true});
      //this.setState({tierStyle0: classes.btn2Clicked})
    }
  }

  loadCategory = (categoryName, list) => {
    this.props.showPopUp();
    this.props.setCategory(categoryName,list)
    this.clicked2();
  }

  render() {
    let subMenus = null;

    if(this.state.showTier2) {
      subMenus = deckNames.boosterPack.map(( deck, index) => {
          return <SubMenu
                    name={deck.name}
                 />
      });
    }

    return (
      <div className={classes.scrollMenu}>
        <button
          className={this.state.mainStyle}
          onClick ={this.clicked1}
        >Yu-Gi-Oh</button>
        {this.state.showTier1 ?
          <Fragment>
            <button
              onClick={() => this.loadCategory("Booster Pack", deckNames.boosterPack)}
              className={classes.tier1}> Booster Pack
            </button>
            <button
              onClick={() => this.loadCategory("Starter Deck", deckNames.starterDeck)}
              className={classes.tier1}> Starter Deck
            </button>
            <button
              onClick={() => this.loadCategory("Structure Deck", deckNames.structureDeck)}
              className={classes.tier1}>
              Structure Deck
            </button>
          </Fragment>
          : null
        }

        {this.state.showTier2 ?
          <Fragment>
            {subMenus}
          </Fragment>
          : null
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      setCategory: (title,list) => dispatch(actionCreators.setCategory(title,list)),
      showPopUp: () => dispatch(actionCreators.showPopUp())
    };
};


export default connect(null, mapDispatchToProps)(Menus);
