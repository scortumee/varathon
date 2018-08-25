import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import classes from './Menus.module.css';
import FlexView from 'react-flexview';
import SubMenu from './SubMenu';

import deckNames from '../assets/deckNames';
import Draggable, {DraggableCore} from 'react-draggable';

class Menus extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showTier1: false,
      showTier2: false,
      mainStyle: classes.mainButton,

      list:0,
      posX:0,
      distance:0,
      deckLength:0
    };
  }

  componentWillReceiveProps() {
    console.log("INSIDE COMP_WILL_REC",this.props.deckIndex, this.props.totalX, this.props.currentX);
    let loc=0;
    let deckLength=this.state.deckLength;
    if(this.props.render) {
      loc = (this.props.deckIndex*(deckLength)) + ((deckLength/this.props.totalX)*this.props.currentX);

      this.setState((prevState, props) => {
        return {posX: this.state.distance-loc};
      });
    }
  }
  clicked1 = () => {
    if(this.state.showTier1) {
      this.setState({showTier1: false, posX: 0});
      this.setState({mainStyle: classes.mainButton});
    }
    else {
      this.setState({showTier1: true },() => this.moveMenus());
      this.setState({mainStyle: classes.mainClicked});

      /*const width = this.divElement.clientWidth;
      this.setState({ totalWidth: width });
      console.log(width);*/

    }
  }

  moveMenus = () => {
    const currentX = this.booster.getBoundingClientRect().x;
    const indicatorX = this.indicator.getBoundingClientRect().x;
    const width = this.booster.getBoundingClientRect().width;
    this.setState({posX: indicatorX-currentX, deckLength: 200/11, distance: indicatorX-currentX});
    console.log(currentX, indicatorX, width);
  }

  clicked2 = (list) => {
    if(this.state.showTier2) {
      this.setState({showTier2: false});
    }
    else {
      this.setState({list: list});
      this.setState({showTier2: true});
    }
  }

  loadCategory = (categoryName, list) => {
    this.props.showPopUp();
    this.props.setCategory(categoryName,list);
    const indicatorX = this.indicator.getBoundingClientRect().x;
    let currentX = 0;
    if(categoryName === "Booster Pack") {
      currentX = this.booster.getBoundingClientRect().x;
    }
    else if(categoryName === "Starter Deck") {
      currentX = this.starter.getBoundingClientRect().x;
    }
    else if(categoryName === "Structure Deck") {
      currentX = this.structure.getBoundingClientRect().x;
    }
    console.log("IN A FUCKING LOAD CATEGORY");
    this.setState((prevState, props) => {
    return { posX: prevState.posX+(indicatorX-currentX),
             distance: prevState.posX+(indicatorX-currentX),
             deckLength: 200/list.length
           }
    });
    //this.clicked2(list);
  }

  render() {
    console.log("IN A FUCKING RENDER ");
    let subMenus = null;

    if(this.state.showTier2) {
      subMenus = this.state.list.map(( deck, index) => {
          return <SubMenu
                    name={deck.name}
                 />
      });
    }

    return (
      <Fragment>
      <FlexView hAlignContent='center'>
        <button
          ref={(el) => this.indicator = el}
          className={classes.redCircle}/>
      </FlexView>

      <Draggable
        bounds={{top: 0, bottom: 0}}
        position={{x: this.state.posX, y:0}}
      >
      <div className={classes.scrollMenu}>
        <button
          className={this.state.mainStyle}
          onClick ={this.clicked1}
          onMouseEnter={this.clicked1}
          ref={(el) => this.instance = el}
        >
          Yu-Gi-Oh
        </button>

        {this.state.showTier1 ?
          <Fragment>
            <button
              onClick={() => this.loadCategory("Booster Pack", deckNames.boosterPack)}
              ref={(el) => this.booster = el}
              className={classes.tier1}>Booster Pack
            </button>
            <button
              onClick={() => this.loadCategory("Starter Deck", deckNames.starterDeck)}
              ref={(el) => this.starter = el}
              className={classes.tier1}>Starter Deck
            </button>
            <button
              onClick={() => this.loadCategory("Structure Deck", deckNames.structureDeck)}
              ref={(el) => this.structure = el}
              className={classes.tier1}>Structure Deck
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
      </Draggable>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    mainIndex: state.card.mainIndex,
    currentIndex: state.card.index1
  };
};

const mapDispatchToProps = dispatch => {
    return {
      setCategory: (title,list) => dispatch(actionCreators.setCategory(title,list)),
      showPopUp: () => dispatch(actionCreators.showPopUp())
    };
};


export default connect(null, mapDispatchToProps)(Menus);
