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

class Menus extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showTier0: false,
      showTier1: true,
      showTier2: true,
      mainStyle: classes.mainButton,
      tierStyle1: classes.tier1,

      list:deckNames.starterDeck,
      origList:deckNames.starterDeck,
      title:0,
      posX:0,
      distance:0,
      deckLength:0,
      packStatus:0,
    };
  }

  componentDidMount() {
    this.menus.addEventListener('mousewheel', this.scrollMenus,false);
    /*this.subMenus.addEventListener('mousewheel', this.scrollSubMenus,false);

    const snapConfig = {
      scrollSnapDestination: '20% 0%', // *REQUIRED* scroll-snap-destination css property, as defined here: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-destination
      scrollTimeout: 100, // *OPTIONAL* (default = 100) time in ms after which scrolling is considered finished
      scrollTime: 300 // *OPTIONAL* (default = 300) time in ms for the smooth snap
    }
    const element = this.subMenus;
    const snapObject = new ScrollSnap(element, snapConfig);

    snapObject.bind();*/
    this.starter.style.color = 'white';
  }

  componentWillUnmount() {
    this.menus.removeEventListener('mousewheel',this.scrollMenus,false);
    //this.subMenus.removeEventListener('mousewheel',this.scrollSubMenus,false);
  }

  componentDidUpdate() {
    if(this.props.showTier!==0) {
      this.subMenus.addEventListener('mousewheel', this.scrollSubMenus,false);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("INSIDE COMP_WILL_REC", this.props.render);
    console.log(this.props.deckIndex);
    if(this.props.render === false ) {
      let list,firstHalf,secondHalf;
      if(this.props.deckIndex >nextProps.deckIndex) {
        console.log("GOING BACKWARD");
        if(nextProps.deckIndex===0) {
          firstHalf = this.state.origList.slice(0,-1);
          secondHalf = this.state.origList.slice(-1);
        }
        else {
          firstHalf = this.state.origList.slice(0,nextProps.deckIndex-1);
          secondHalf = this.state.origList.slice(nextProps.deckIndex-1);
        }
        list = [...secondHalf,...firstHalf];
        this.setState({list:list});
      }
      else if(this.props.deckIndex < nextProps.deckIndex){
        console.log("GOING FORWARD");
        firstHalf = this.state.origList.slice(0,this.props.deckIndex);
        secondHalf = this.state.origList.slice(this.props.deckIndex);
        list = [...secondHalf,...firstHalf];
        this.setState({list:list});
      }

    }

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

  /*moveMenus = () => {
    const currentX = this.booster.getBoundingClientRect().x;
    const indicatorX = this.indicator.getBoundingClientRect().x;
    const width = this.booster.getBoundingClientRect().width;
    this.setState({posX: indicatorX-currentX, deckLength: 200/11, distance: indicatorX-currentX});
    console.log(currentX, indicatorX, width);
  }*/

  clicked2 = (list) => {
    this.setState({list: list,origList:list});
  }

  loadCategory = (categoryName, list) => {
    this.props.showPopUp();
    this.props.setCategory(categoryName,list);

    //const indicatorX = this.indicator.getBoundingClientRect().x+10;
    const indicatorX = window.innerWidth/2;

    let currentX = 0;
    if(categoryName === "Booster Pack") {
      currentX = this.booster.getBoundingClientRect().x;
      this.booster.style.color = 'white';
      this.starter.style.color = '#909296';
      this.structure.style.color = '#909296';
    }
    else if(categoryName === "Starter Deck") {
      currentX = this.starter.getBoundingClientRect().x;
      this.starter.style.color = 'white';
      this.booster.style.color = '#909296';
      this.structure.style.color = '#909296';
    }
    else if(categoryName === "Structure Deck") {
      currentX = this.structure.getBoundingClientRect().x;
      this.structure.style.color = 'white';
      this.starter.style.color = '#909296';
      this.booster.style.color = '#909296';
    }
    console.log("IN A MENU.js LOAD CATEGORY");
    this.setState((prevState, props) => {
    return { posX: prevState.posX+(indicatorX-currentX)-(230/2),
             distance: prevState.posX+(indicatorX-currentX),
             title: categoryName,
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
    console.log(e.deltaY);
    if(e.deltaY <0) {
      this.slideLeft();
    }
    else if(e.deltaY > 0){
      this.slideRight();
    }

    //this.subMenus.scrollLeft -=-(e.deltaY);
    e.preventDefault();
  }

  adjustRight=(right)=> {
    if(right) {
      this.slideLeft();
    }
    else {
      this.slideRight();
    }
  }

  slideRight =()=> {
    let [first, ...rest] = this.state.list;
    let list = [...rest,first];
    this.setState({list:list});
    //this.setState({list:list},()=>this.props.storeCategory(this.state.title,list));
  }

  slideLeft =()=> {
    let last = this.state.list.slice(-1);
    let [lastVar] = last;

    let rest = this.state.list.slice(0,-1);
    let list = [lastVar, ...rest];
    this.setState({list:list});
    //this.setState({list:list},()=>this.props.storeCategory(this.state.title,list));
  }

  test =() => {
    if(!this.state.showTier1) {
      this.setState({showTier1:true,showTier2:true});
    }
    else {
      this.setState({showTier1:false,showTier2:false});
    }
  }
  render() {
    console.log("IN A MENU.js RENDER ");
    let subMenus,tier2Style;
    if(this.props.showTier === 2) {
      tier2Style = classes.tier2Large;
    }
    else {
      tier2Style = classes.tier2;
    }
    subMenus = this.state.list.map(( deck, index) => {
        return <SubMenu
                  deck={deck}
                  key={index}
                  index={index}
                  adjustRight={this.adjustRight}
                  style={tier2Style}
               />
    });

    return (
      <Fragment>
      <div className={classes.mainWrap}>
        {/*<FlexView hAlignContent='center'>*/}
          {this.props.showTier === 2 ?
            <div style={{marginBottom: '27px'}}>
              fds
            </div>
            :null
          }
          {this.props.showTier ===1 ?
            <FlexView hAlignContent='center'>
              <div ref={(el) => this.subMenus = el} className={classes.tier2Wrap}>
                <Fragment>
                  {subMenus}
                </Fragment>
              </div>
            </FlexView>
            :null
          }
          {this.props.showTier ===0 ?
            <FlexView hAlignContent='center'>
              <button
                onClick={() => this.loadCategory("Booster Pack", deckNames.boosterPack)}
                ref={(el) => this.booster = el}
                className={classes.tier1Small}>BOOSTER PACK
              </button>
              <button
                onClick={() => this.loadCategory("Starter Deck", deckNames.starterDeck)}
                ref={(el) => this.starter = el}
                className={classes.tier1Small}>STARTER DECK
              </button>
              <button
                onClick={() => this.loadCategory("Structure Deck", deckNames.structureDeck)}
                ref={(el) => this.structure = el}
                className={classes.tier1Small}>STRUCTURE DECK
              </button>
            </FlexView>
            :null
          }
        {/*</FlexView>*/}

      <FlexView hAlignContent='center'>
        <div className={classes.loaderWrap}>
        <Progress status="default" percent={this.state.packStatus}
        theme={{
            default: {
              symbol: ' ',
              color: 'red'
            }
          }}
        />
        </div>
      </FlexView>

      <Draggable
        bounds={{top: 0, bottom: 0}}
        position={{x: 0, y:0}}
      >
        <div ref={(el) => this.menus = el} className={classes.scrollMenu}>
          {this.state.showTier0 ?
            <button
              className={this.state.mainStyle}
              onClick ={this.clicked1}
              onMouseEnter={this.clicked1}
              ref={(el) => this.instance = el}
            >
              Yi-Gi-Oh
            </button>
            : null
          }
          {/*<FlexView hAlignContent='center'>*/}

          {this.props.showTier === 2 ?
            <FlexView hAlignContent='center'>
              <div style={{color:'white',marginTop:'5px'}}>
                <img src ={require('../assets/leftArrow.png')}/>
              </div>
              <div ref={(el) => this.subMenus = el} className={classes.tier2LargeWrap}>
                <Fragment>
                  {subMenus}
                </Fragment>
              </div>
              <div style={{color:'white',marginTop:'5px'}}>
                <img src={require('../assets/rightArrow.png')}/>
              </div>
            </FlexView>
            :null
          }

          {this.props.showTier === 1 ?
            <FlexView hAlignContent='center'>
              <div style={{color:'white',marginTop:'5px'}}>
                <img src ={require('../assets/leftArrow.png')}/>
              </div>
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
              <div style={{color:'white',marginTop:'5px'}}>
                <img src={require('../assets/rightArrow.png')}/>
              </div>
            </FlexView>
            : null
          }
          {this.props.showTier === 0 ?
            <FlexView hAlignContent='center'>
              <div style={{color:'white',marginTop:'5px'}}>
                <img src ={require('../assets/leftArrow.png')}/>
              </div>
              <button
                className={this.state.mainStyle}
                ref={(el) => this.instance = el}
              >
                Yu-Gi-Oh
              </button>
              <div style={{color:'white',marginTop:'5px'}}>
                <img src={require('../assets/rightArrow.png')}/>
              </div>
            </FlexView>
            : null
          }
          {/*</FlexView>*/}
        </div>
      </Draggable>

      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    showTier: state.button.showTier
  };
};

const mapDispatchToProps = dispatch => {
    return {
      setCategory: (title,list) => dispatch(actionCreators.setCategory(title,list)),
      storeCategory: (title,list) => dispatch(actionCreators.storeCategory(title,list)),
      showPopUp: () => dispatch(actionCreators.showPopUp())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
