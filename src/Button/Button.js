import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import * as actionCreators from '../store/actions/index';
import classes from './Button.module.css';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SAT from 'sat';
import update from 'immutability-helper';
import FlexView from 'react-flexview';

class Button extends Component {
  state = {
    deltaPosition: {
          x: 0, y: 0
        },
    pivot:-1,
    triangleStyle: classes.triangle,
    textStyle: classes.text,
    limitUpDown:false,
    startCount:false,
    count:0,

    bounds: {
      top: -50,bottom:80,
      left: -215, right:215
    },
    buttonLoc: {x:0,y:0},
    circle: [
      {loc:0,style: classes.circle},
      {loc:0,style: classes.circle},
      {loc:0,style: classes.circle},
      {loc:0,style: classes.circle}
    ],
    over30px: false
  }

  componentDidMount() {
    //const {x,y, width, height} = this.point.getBoundingClientRect();
    //this.setState({buttonLoc:{x:x+width, y:y}});
  }

  componentWillMount() {
    document.addEventListener('click',this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click',this.handleClick,false);
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

    if(this.state.startCount) {
      console.log("DELTA_X",ui.deltaX);
      this.setState((prevState, props) => {
        return {
          count:prevState.count+1
        }
      },()=>console.log("COUNT",this.state.count));
      if(this.state.count >=5) {
        this.setState({bounds:{left: -215,right:215,top:0,bottom:0}});
        this.setState({startCount:false,count:0});
      }
    }

    const pivot = parseInt(distance/30,10);

    if(pivot !== this.state.pivot) {
      if(pivot >=0 && distance >0) {
        //this.setState({triangleStyle: classes.triangleRight});
        this.props.startAnimeFwd(pivot*40);
      }
      else if(pivot<0 && distance<0) {
        //this.setState({triangleStyle: classes.triangleLeft});
        this.props.startAnimeBwd(pivot*40);
      }
      this.setState({pivot: pivot});
    }

    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });

    if(!this.state.over30px) {
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
        console.log("IT IS OVER 29");
        this.setState({bounds: {top:0, bottom:0, left:-215, right:215}});
        this.setState({limitUpDown: true});
      }
    }
    else {
      this.setState({bounds: {top:-50, bottom:80, left:-215, right:215}});
      this.setState({limitUpDown: false});
    }
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
    console.log("HERE IN RIGHT_CIRCLE_CLICKED");
    this.setState({buttonLoc:{x:82.5+(index*45), y:0}});

    const pivot = parseInt((82.5+(index*45))/30);
    this.props.startAnimeFwd(pivot*40);
  }

  lCircleClicked = (index) => {
    console.log("HERE IN LEFF_CIRCLE_CLICKED");
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
          <div className={classes.text} style={{color: '#cccfd1'}}> drag to browse </div>
          <Draggable
            bounds={{top:this.state.bounds.top, bottom: this.state.bounds.bottom, left:this.state.bounds.left, right: this.state.bounds.right}}
            onDrag={this.handleDrag}
            onStart={this.handleStart}
            onStop={this.clearAndStop}
            position={{x:this.state.buttonLoc.x, y:this.state.buttonLoc.y}}
          >
            <div className={classes.bigCircle}/>
          </Draggable>

          <div className={this.state.textStyle}> drag to browse </div>
        </div>
      </FlexView>

      {/*<div ref={(el) => this.diamond = el} className={classes.diamond}>
        <div onMouseDown={()=>this.lCircleClicked(3)} className={classes.llittleTriangle}/>
        <div onMouseDown={()=>this.lCircleClicked(2)} className={classes.circle}/>
        <div onMouseDown={()=>this.lCircleClicked(1)} className={classes.circle}/>
        <div onMouseDown={()=>this.lCircleClicked(0)} className={classes.circle}/>
        <Draggable
          bounds={{top:this.state.bounds.top, bottom: this.state.bounds.bottom, left:this.state.bounds.left, right: this.state.bounds.right}}
          onDrag={this.handleDrag}
          onStart={this.handleStart}
          onStop={this.clearAndStop}
          position={{x:this.state.buttonLoc.x, y:this.state.buttonLoc.y}}
        >
          <div ref={(el) => this.point = el} className={classes.loadCircle}>
            {/*<img style={{position: 'absolute', width: '50%', top: '25px', left:'26px', pointerEvents:'none'}} src={arrows} />
            <svg style={{position: 'absolute',top: '25px', left:'26px'}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 925.101 925.101"  xmlSpace="preserve">
              <g>
              	<path d="M918.145,451.5L686.245,341.4c-8-3.8-17.3,2-17.3,10.9v55.8H566.145v109.6c55.2,0,102.9,0,102.9,0v54.9   c0,8.899,9.2,14.699,17.3,10.899l231.9-110.1C927.345,469,927.345,455.9,918.145,451.5z" fill="#cccfd1"/>
              	<path d="M359.945,517.7V408.2h-103.8v-55.8c0-8.9-9.2-14.7-17.3-10.9l-231.9,110c-9.2,4.4-9.2,17.5,0,21.8l231.9,110.101   c8,3.8,17.3-2,17.3-10.9v-54.899C256.145,517.7,304.344,517.7,359.945,517.7z" fill="#cccfd1"/>
              	<path d="M572.645,668.9L572.645,668.9h-54.899V256h54.899l0,0c8.9,0,14.7-9.3,10.9-17.3L473.445,6.9c-2.2-4.6-6.601-6.9-10.901-6.9   c-4.4,0-8.7,2.3-10.9,6.9l-110.1,231.9c-3.8,8,2,17.3,10.9,17.3l0,0h55.8V669h-55.8l0,0c-8.9,0-14.7,9.3-10.9,17.3l110.1,231.9   c2.2,4.6,6.601,6.9,10.9,6.9c4.401,0,8.701-2.301,10.901-6.9l110.1-232.1C587.345,678.101,581.545,668.9,572.645,668.9z" fill="#cccfd1"/>
              </g>
            </svg>
            <CircularProgressbar  initialAnimation={false}   styles={{
              path: {
                transform: 'rotate(0deg)',
                transformOrigin: 'center center',
              },
            }} percentage={100*(this.props.index1/this.props.mainIndex)} />
          </div>
        </Draggable>

        <div onMouseDown={()=>this.rCircleClicked(0)} ref={(el) => this.circle1 = el} className={this.state.circle[0].style}/>
        <div onMouseDown={()=>this.rCircleClicked(1)} ref={(el) => this.circle2 = el} className={this.state.circle[1].style}/>
        <div onMouseDown={()=>this.rCircleClicked(2)} ref={(el) => this.circle3 = el} className={this.state.circle[2].style}/>
        <div onMouseDown={()=>this.rCircleClicked(3)} ref={(el) => this.circle4 = el} className={classes.rlittleTriangle}/>
      </div>*/}


      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      index1: state.card.index1,
      mainIndex: state.card.mainIndex,
      list: state.cardReserve.currentCategory.list,
      deckIndex: state.card.deckIndex,
      deckName: state.button.currentName
    };
};

const mapDispatchToProps = dispatch => {
    return {
      renderForward: () => dispatch(actionCreators.updateNext()),
      renderBackward: () => dispatch(actionCreators.updatePrev()),
      toggleMenu: (value) => dispatch(actionCreators.toggleMenu(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
