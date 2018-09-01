import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import classes from './Menus.module.css';
import FlexView from 'react-flexview';
import SubMenu from './SubMenu';

import deckNames from '../assets/deckNames';
import Draggable, {DraggableCore} from 'react-draggable';
import ScrollSnap from 'scroll-snap';
import * as $ from 'jquery';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

//import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MenuSlider from './MenuSlider';

class Menus extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showTier0: true,
      showTier1: false,
      showTier2: false,
      mainStyle: classes.mainButton,

      list:0,
      posX:0,
      distance:0,
      deckLength:0,
      packStatus:0,
    };
  }

  componentDidMount() {
    this.menus.addEventListener('mousewheel', this.scrollMenus,false);
    this.subMenus.addEventListener('mousewheel', this.scrollSubMenus,false);

    const snapConfig = {
      scrollSnapDestination: '20% 0%', // *REQUIRED* scroll-snap-destination css property, as defined here: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-destination
      scrollTimeout: 100, // *OPTIONAL* (default = 100) time in ms after which scrolling is considered finished
      scrollTime: 300 // *OPTIONAL* (default = 300) time in ms for the smooth snap
    }
    const element = this.subMenus;
    const snapObject = new ScrollSnap(element, snapConfig);

    snapObject.bind();
    // Endless scroll

    this.$subMenus = $(this.subMenus);
    /*this.$subMenus.endless({
      direction:'horizontal',
      scrollbar:'disable'
    });
    $(document).ready(function(){


      $(this.subMenus).endless({
        direction:'horizontal',
        scrollbar:'disable'
      });
    });*/
    console.log($);
  }

  componentWillUnmount() {
    this.menus.removeEventListener('mousewheel',this.scrollMenus,false);
    this.subMenus.removeEventListener('mousewheel',this.scrollSubMenus,false);
  }

  componentWillReceiveProps() {
    console.log("INSIDE COMP_WILL_REC",this.props.deckIndex, this.props.totalX, this.props.currentX);
    /*let loc=0;
    let deckLength=this.state.deckLength;
    if(this.props.render) {
      loc = (this.props.deckIndex*(deckLength)) + ((deckLength/this.props.totalX)*this.props.currentX);

      this.setState((prevState, props) => {
        return {posX: this.state.distance-loc};
      });
    }*/
    this.setState({packStatus: ((this.props.deckIndex+1)/this.state.list.length)*100});
  }
  clicked1 = () => {
    if(this.state.showTier1) {
      this.setState({showTier1: false, posX: 0});
      this.setState({mainStyle: classes.mainButton});
    }
    else {
      this.setState({showTier1: true , showTier0: false},() => console.log("was moveMenus"));
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
    this.setState({list: list}, ()=>this.setState({showTier2:true}));
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
    console.log("IN A MENU.js LOAD CATEGORY");
    this.setState((prevState, props) => {
    return { posX: prevState.posX+(indicatorX-currentX)-(216/2),
             distance: prevState.posX+(indicatorX-currentX),
             deckLength: 200/list.length
           }
    });
    this.clicked2(list);
  }

  scrollMenus =(e)=> {
    console.log("FIRED",e);
    /*this.setState((prevState, props) => {
      return { posX: prevState.posX-e.deltaY}
    });*/
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    this.menus.scrollLeft -=-(e.deltaY);
    e.preventDefault();
  }

  scrollSubMenus=(e)=> {
    e = window.event || e;
    this.subMenus.scrollLeft -=-(e.deltaY);
    e.preventDefault();
  }

  render() {
    console.log("IN A MENU.js RENDER ");
    let subMenus = null;

    if(this.state.showTier2) {
      subMenus = this.state.list.map(( deck, index) => {
          return <SubMenu
                    name={deck.name}
                    key={index}
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

        {/*<div className={classes.testWrap}>
          <div className={classes.test1Wrap}>
            fdsfdxzddsadasdsadsads
          </div>
          <div className={classes.test2Wrap}>
            fddasdasdsadasdasdsfds
          </div>
          <div className={classes.test1Wrap}>
            fdsfdxzddsadasdsadsads
          </div>
          <div className={classes.test2Wrap}>
            fddasdasdsadasdasdsfds
          </div>
        </div>

        <div ref={(el) => this.subMenus = el} className={classes.tier2Wrap}>
          {this.state.showTier2 ?
            <MenuSlider/>
            : null
          }
        </div>*/}

        <div className={classes.mainWrap}>

        <div ref={(el) => this.subMenus = el} className={classes.tier2Wrap}>
          {this.state.showTier2 ?
            <Fragment>
              {subMenus}
            </Fragment>
            : null
          }
        </div>

        <FlexView hAlignContent='center'>
          <div className={classes.loaderWrap}>
          <Progress  status="default" percent={this.state.packStatus}
          theme={{
              default: {
                symbol: ' ',
                color: '#fbc630'
              }
            }}
          />
          </div>
        </FlexView>

      <Draggable
        bounds={{top: 0, bottom: 0}}
        position={{x: this.state.posX, y:0}}
      >
        <div ref={(el) => this.menus = el} className={classes.scrollMenu}>
          {this.state.showTier0 ?
            <button
              className={this.state.mainStyle}
              onClick ={this.clicked1}
              onMouseEnter={this.clicked1}
              ref={(el) => this.instance = el}
            >
              Yu-Gi-Oh
            </button>
            : null
          }

          {this.state.showTier1 ?
            <Fragment>
              <button
                onClick={() => this.loadCategory("Booster Pack", deckNames.boosterPack)}
                ref={(el) => this.booster = el}
                className={classes.tier1}>BOOSTER PACK
              </button>
              <button
                onClick={() => this.loadCategory("Starter Deck", deckNames.starterDeck)}
                ref={(el) => this.starter = el}
                className={classes.tier1}>STARTER DECK
              </button>
              <button
                onClick={() => this.loadCategory("Structure Deck", deckNames.structureDeck)}
                ref={(el) => this.structure = el}
                className={classes.tier1}>STRUCTURE DECK
              </button>
            </Fragment>
            : null
          }


        </div>
      </Draggable>

      </div>
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
