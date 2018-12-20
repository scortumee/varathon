import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import classes from './Menus.module.css';
import FlexView from 'react-flexview';
import SubMenu from './SubMenu';
import Carousel from './Carousel';

import deckNames from '../assets/deckNames';
import Draggable from 'react-draggable';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Menus.css';
import { Link } from 'react-router-dom';


class Menus extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      mainStyle: classes.mainButton,
      path: this.props.path,

      list:this.props.list,
      origList:this.props.list,
      title:this.props.title,
      posX:0,
      tier1Index:1,
      packStatus:0,
    };

  }

  componentDidMount() {
    //this.subMenus.addEventListener('mousewheel', this.scrollSubMenus,false);
    //this.starter.style.color = 'white';
    console.log("INSIDE MENU.JS COMPONENT_DID_MOUNT");
    if(this.props.showTier === 2) {
      this.sliderWrap.addEventListener('mousewheel', this.scrollCarousel,false);
    }
  }

  componentWillMount() {

    this.slideLeft();
  }
  componentWillUnmount() {
    /*this.menus.removeEventListener('mousewheel',this.scrollMenus,false);
    this.subMenus.removeEventListener('mousewheel',this.scrollSubMenus,false);
    this.sliderWrap.removeEventListener('mousewheel',this.scrollCarousel,false);*/
  }

  componentDidUpdate() {
    console.log('INSIDE COMPONENT_DID_UPDATE', this.props.deckIndex);
    if(this.props.showTier===1) {
      this.menus.addEventListener('mousewheel', this.scrollMenus,false);
      this.subMenus.addEventListener('mousewheel', this.scrollSubMenus,false);
      this.slider.slickGoTo(this.state.tier1Index);
    }
    else if(this.props.showTier ===2) {
      this.sliderWrap.addEventListener('mousewheel', this.scrollCarousel,false);
      if(this.props.totalX === -1) {
        this.slider.slickGoTo(this.props.deckIndex);
      }
      else {
        this.slider.slickGoTo(this.props.deckIndex);
      }
    }

    if(this.props.showTier !==2) {
      if(this.state.title === "Booster Pack") {
        this.booster.style.color = 'white';
      }
      else if(this.state.title === "Starter Deck") {
        this.starter.style.color = 'white';
      }
      else if(this.state.title === "Structure Deck") {
        this.structure.style.color = 'white';
      }
    }

  }
  componentWillReceiveProps(nextProps) {
    console.log("INSIDE COMP_WILL_REC", this.props.render);
    console.log(this.props.deckIndex,this.props.totalX);
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
    if(this.props.showTier === 2 && this.props.totalX === -1) {
      this.adjustTier1();
    }

  }

  shouldComponentUpdate(nextProps,nextState) {
    if(this.props.showTier !== nextProps.showTier) {
      console.log("SHOW_TIER, shouldComponentUpdate");
      return true;
    }
    if(this.props.deckIndex !== nextProps.deckIndex) {
      //this.setState({packStatus: ((this.props.deckIndex+1)/this.state.list.length)*100});
      console.log("deckIndex, shouldComponentUpdate");
      if(this.props.showTier === 2) {
        this.slider.slickGoTo(nextProps.deckIndex);
        return false;
      }
      else {
        return true;
      }
    }
    if(this.state.list !== nextState.list && this.props.showTier !==2 ) {
      console.log("list, shouldComponentUpdate");
      return true;
    }

    return false;
  }

  adjustTier1 = () =>{
    let list,firstHalf,secondHalf;

    firstHalf = this.state.origList.slice(0,this.props.deckIndex);
    secondHalf = this.state.origList.slice(this.props.deckIndex);

    list = [...secondHalf,...firstHalf];
    this.setState({list:list});
  }

  clicked2 = (origList) => {
    this.setState({origList:origList});

    let last = origList.slice(-1);

    let rest = origList.slice(0,-1);
    let list = [...last, ...rest];
    this.setState({list:list});
    if(this.props.showTier === 0) {
      this.props.toggleMenu(1);
    }
  }

  loadCategory = (categoryName, list) => {
    this.props.showPopUp();
    //this.props.setCategory(categoryName,list);
    this.props.loadFirst10(categoryName,list,0);

    let currentX = 0;
    if(categoryName === "Booster Pack") {
      currentX = 0;
      this.booster.style.color = 'white';
      this.starter.style.color = '#909296';
      this.structure.style.color = '#909296';
    }
    else if(categoryName === "Starter Deck") {
      currentX = 1;
      this.starter.style.color = 'white';
      this.booster.style.color = '#909296';
      this.structure.style.color = '#909296';
    }
    else if(categoryName === "Structure Deck") {
      currentX = 2;
      this.structure.style.color = 'white';
      this.starter.style.color = '#909296';
      this.booster.style.color = '#909296';
    }
    console.log("IN A MENU.js LOAD CATEGORY");
    this.setState((prevState, props) => {
      return { tier1Index:currentX,
               title: categoryName
             }
      });
    this.clicked2(list);
  }

  scrollMenus =(e)=> {
    e = window.event || e;
    if(e.deltaY <0) {
      this.slider.slickPrev();
    }
    else if(e.deltaY > 0){
      this.slider.slickNext();
    }
    e.preventDefault();
  }

  scrollSubMenus=(e)=> {
    e = window.event || e;
    if(e.deltaY <0) {
      this.slideLeft();
    }
    else if(e.deltaY > 0){
      this.slideRight();
    }

    //this.subMenus.scrollLeft -=-(e.deltaY);
    e.preventDefault();
  }

  scrollCarousel = (e) => {
    e = window.event || e;
    if(e.deltaY <0) {
      this.slider.slickPrev();
    }
    else if(e.deltaY > 0){
      this.slider.slickNext();
    }

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
  }

  slideLeft =()=> {
    let last = this.state.list.slice(-1);

    let rest = this.state.list.slice(0,-1);
    let list = [...last, ...rest];
    this.setState({list:list});
  }

  centerDeck = (deckIndex)=> {
    this.slider.slickGoTo(deckIndex);
  }
  render() {
    console.log("IN A MENU.js RENDER ");
    let subMenus,tier2Style,settings;
    if(this.props.showTier === 2) {
      console.log("CAROUSEL");
      subMenus = this.state.origList.map(( deck, index) => {
          return <Link to={`${this.state.path}/${deck.name}`}  key={deck.name}>
                    <Carousel
                      deck={deck}
                      key={index}
                      index={index}
                      deckLength={this.state.origList.length-1}
                      centerDeck = {this.centerDeck}
                      />
                  </Link>
      });
    }
    else {
      tier2Style = classes.tier2;
      subMenus = this.state.list.map(( deck, index) => {
          return <SubMenu
                    deck={deck}
                    key={index}
                    index={index}
                    adjustRight={this.adjustRight}
                    style={tier2Style}
                    deckLength={this.state.origList.length-1}
                 />
      });
    }

    if(this.props.showTier === 1) {
      settings = {
        className: 'tier1Large',
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        speed: 100,
        slidesToScroll:1,
        variableWidth: true,
        focusOnSelect:true
      };
    }
    else if(this.props.showTier === 2) {
      settings = {
        className: 'tier2Large',
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        speed: 100,
        slidesToScroll:1,
        variableWidth: true
        //focusOnSelect:true
      };
    }

    return (
      <Fragment>
      <div className={classes.mainWrap}>
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
        <div className={classes.scrollMenu}>
          {this.props.showTier === 2 ?
            <FlexView hAlignContent='center'>
              <div ref={(el) => this.sliderWrap = el} className={classes.tier2LargeWrap}>
                <Slider ref={(el) => this.slider =el} {...settings}>
                  {subMenus}
                </Slider>
              </div>
            </FlexView>
            :null
          }

          {this.props.showTier === 1 ?
            <FlexView hAlignContent='center'>
              {/*<div style={{color:'white',marginTop:'5px'}}>
                <img src ={require('../assets/leftArrow.png')}/>
              </div>*/}
              <div ref={(el) => this.menus = el} className={classes.tier1LargeWrap}>
              <Slider ref={(el) => this.slider = el} {...settings}>
                <div
                  onClick={() => this.loadCategory("Booster Pack", deckNames.boosterPack)}
                  ref={(el) => this.booster = el}
                  className={classes.tier1}>BOOSTER PACK
                </div>
                <div
                  onClick={() => this.loadCategory("Starter Deck", deckNames.starterDeck)}
                  ref={(el) => this.starter = el}
                  className={classes.tier1}>STARTER DECK
                </div>
                <div
                  onClick={() => this.loadCategory("Structure Deck", deckNames.structureDeck)}
                  ref={(el) => this.structure = el}
                  className={classes.tier1}>STRUCTURE DECK
                </div>
              </Slider>
              </div>
              {/*<div style={{color:'white',marginTop:'5px'}}>
                <img src={require('../assets/rightArrow.png')}/>
              </div>*/}
            </FlexView>
            : null
          }
          {this.props.showTier === 0 ?
            <FlexView hAlignContent='center'>
              <div style={{color:'white',marginTop:'5px'}}>
                <img src ={require('../assets/leftArrow.png')} alt='leftArrow'/>
              </div>
              <button
                className={this.state.mainStyle}
                ref={(el) => this.instance = el}
              >
                Yu-Gi-Oh
              </button>
              <div style={{color:'white',marginTop:'5px'}}>
                <img src={require('../assets/rightArrow.png')} alt='rightArrow'/>
              </div>
            </FlexView>
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
    showTier: state.button.showTier
  };
};

const mapDispatchToProps = dispatch => {
    return {
      //setCategory: (title,list) => dispatch(actionCreators.setCategory(title,list)),
      //loadFirst10:(title, list,deckIndex) => dispatch(actionCreators.loadFirst10(title, list, deckIndex)),
      showPopUp: () => dispatch(actionCreators.showPopUp()),
      toggleMenu: (value) => dispatch(actionCreators.toggleMenu(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
