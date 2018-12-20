import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import * as actionCreators from '../store/actions/index';
import classes from './Button.module.css';
//import ButtonMl from '@material-ui/core/Button';
//import lovelyCircle from '../assets/circle.svg';

//import CircularProgressbar from 'react-circular-progressbar';
//import 'react-circular-progressbar/dist/styles.css';
//import SAT from 'sat';
//import update from 'immutability-helper';
import FlexView from 'react-flexview';

class Button extends Component {
  constructor(props) {
    super(props);
    /*let range,speedVal;
    if(this.props.mobile) {
      range=120;
      speedVal = 30;
    }
    else {
      range=120;
      speedVal=30;
    }*/
    this.state = {
      deltaPosition: {
            x: 0, y: 0
          },
      pivot:-1,
      textStyle: classes.text,

      limitUpDown:false,
      startCount:false,
      count:0,
      range:120,
      speedVal:30,
      bounds: {
        top: 0,bottom:0,
        left: -120, right:120
      },
      buttonLoc: {x:0,y:0},
      /*circle: [
        {loc:0,style: classes.circle},
        {loc:0,style: classes.circle},
        {loc:0,style: classes.circle},
        {loc:0,style: classes.circle}
      ],*/
      over30px: false
    };
  }

  componentWillMount() {
    document.addEventListener('click',this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click',this.handleClick,false);
  }

  shouldComponentUpdate(nextProps,nextState) {
    if(this.props.index1 >9 ||this.props.index1Deck>9) {
      this.lStick.style.backgroundColor = '#008cba';
      this.lTriangle.style.backgroundColor = '#008cba';
    }
    return true;
  }

  handleClick = () => {
    this.setState({buttonLoc:{x:0, y:0}});
    this.props.stopAnime();
  }

  handleStart = () => {
    this.setState({textStyle: classes.textHide});
  }

  handleDrag = (e, ui) => {
    const {x,y} = this.state.deltaPosition;
    const distance = x+ui.deltaX;
      //if button is dragged more than (+-)5pixels, limit up and down movement
    /*if(this.state.startCount) {
      //console.log("DELTA_X",ui.deltaX);
      this.setState((prevState, props) => {
        return {
          count:prevState.count+1
        }
      },()=>//console.log("COUNT",this.state.count));
      if(this.state.count >=5) {
        this.setState({bounds:{left: -this.state.range,right:this.state.range,top:0,bottom:0}});
        this.setState({startCount:false,count:0});
      }
    }*/

    const pivot = parseInt(distance/this.state.speedVal,10);

    if(pivot !== this.state.pivot) {
      if(pivot >=0 && distance >0) {
        //this.setState({triangleStyle: classes.triangleRight});
        this.props.startAnimeFwd(pivot*30);
      }
      else if(pivot<0 && distance<0) {
        //this.setState({triangleStyle: classes.triangleLeft});
        this.props.startAnimeBwd(pivot*30);
      }
      this.setState({pivot: pivot});
    }

    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });

    /*if(!this.state.over30px) {
      if(y>=30) {
        this.setState({over30px:true},()=>this.props.toggleMenu(-1));
      }
      else if(y<=-30) {
        this.setState({over30px:true},()=>this.props.toggleMenu(1));
      }
    }
    else if(y<30 && y>-30) {
      this.setState({over30px:false});
    }
    //this.checkCollision();

    if(distance>29 || distance<-29) {
      if(!this.state.limitUpDown) {
        //console.log("IT IS OVER 29");
        this.setState({bounds: {top:0, bottom:0, left:-this.state.range, right:this.state.range}});
        this.setState({limitUpDown: true});
      }
    }
    else {
      this.setState({bounds: {top:-50, bottom:80, left:-this.state.range, right:this.state.range}});
      this.setState({limitUpDown: false});
    }*/
  }

  clearAndStop = () => {
    this.setState({
      deltaPosition: {
        x: 0,
        y: 0
      }
    });
    this.props.stopAnime();
    this.setState({textStyle: classes.text});
    //this.setState({triangleStyle: classes.triangle});
  }

  doNothing = () => {
    // HAHA DOING NOTHING, I FEEL INCREDIBLE
  }

  rCircleClicked = (index) => {
    //console.log("HERE IN RIGHT_CIRCLE_CLICKED");
    this.setState({buttonLoc:{x:82.5+(index*45), y:0}});

    const pivot = parseInt((82.5+(index*45))/30);
    this.props.startAnimeFwd(pivot*40);
  }

  lCircleClicked = (index) => {
    //console.log("HERE IN LEFF_CIRCLE_CLICKED");
    this.setState({buttonLoc:{x:-(82.5+(index*45)), y:0}});

    const pivot = parseInt((82.5+(index*45))/30);
    this.props.startAnimeBwd(-pivot*40);
  }

  render () {
    return (
      <div>
      {/*<div>
        {this.props.deckName}
      </div>*/}
      <FlexView hAlignContent='center'>
        <div className={classes.capsule}>
          <div ref={(el) => this.lStick = el} onClick={()=>this.props.renderPrevPage()} className={classes.lStick}/>
          <div ref={(el) => this.lTriangle = el} onClick={()=>this.props.renderPrevPage()} className={classes.llittleTriangle} />
          <Draggable
            bounds={{top:this.state.bounds.top, bottom: this.state.bounds.bottom, left:this.state.bounds.left, right: this.state.bounds.right}}
            onDrag={this.handleDrag}
            onStart={this.handleStart}
            onStop={this.clearAndStop}
            position={{x:this.state.buttonLoc.x, y:this.state.buttonLoc.y}}
          >
            <div className={classes.bigCircle}/>
          </Draggable>
          <div onClick={()=>this.props.renderNextPage()} className={classes.rStick}/>

          <div onClick={()=>this.props.renderNextPage()} className={classes.rlittleTriangle} />
        </div>
      </FlexView>

      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      index1: state.card.index1,
      index1Deck: state.deck.index1,
      mainIndex: state.card.mainIndex,
      deckName: state.button.currentName
    };
};

const mapDispatchToProps = dispatch => {
    return {
      toggleMenu: (value) => dispatch(actionCreators.toggleMenu(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
