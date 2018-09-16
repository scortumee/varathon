import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable, {DraggableCore} from 'react-draggable';
import * as actionCreators from '../store/actions/index';
import classes from './Button.module.css';

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SAT from 'sat';
import update from 'immutability-helper';
import pussy from '../assets/tenor.gif';

class Button extends Component {
  state = {
    deltaPosition: {
          x: 0, y: 0
        },
    pivot:-1,
    triangleStyle: classes.triangle,
    snap: {snapped:false, index:0},
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
    console.log("IN A HANDLE_CLICK BABE");
    this.setState({buttonLoc:{x:0, y:0}});
    this.props.stopAnime();
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

    const pivot = parseInt(distance/30);

    if(pivot !== this.state.pivot) {
      if(pivot >=0 && distance >0) {
        this.setState({triangleStyle: classes.triangleRight});
        this.props.startAnimeFwd(pivot*40);
      }
      else if(pivot<0 && distance<0) {
        this.setState({triangleStyle: classes.triangleLeft});
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

  handleStart = () => {
    const newState = update(this.state.circle, {
        [0]: {
          loc: {$set: this.circle1}
        },
        [1]: {
          loc: {$set: this.circle2}
        },
        [2]: {
          loc: {$set: this.circle3}
        },
        [3]: {
          loc: {$set: this.circle4}
        }
    });
    this.setState({circle: newState});
  }

  checkCollision = () => {
    let mainX = this.point.getBoundingClientRect().x+50;
    let mainY = this.point.getBoundingClientRect().y+50;
    let mainCircle = new SAT.Circle(new SAT.Vector(mainX,mainY), 5);
    //let response = new SAT.Response();

    for(let i=0; i<4; ++i) {
      let circleX = this.state.circle[i].loc.getBoundingClientRect().x+this.state.circle[i].loc.getBoundingClientRect().width/2;
      let circleY = this.state.circle[i].loc.getBoundingClientRect().y+this.state.circle[i].loc.getBoundingClientRect().height/2;
      let circle = new SAT.Circle(new SAT.Vector(circleX,circleY), 12.5);

      if(SAT.testCircleCircle(mainCircle, circle)) {
        console.log("COOOOLLIIIDED");
        const newState = update(this.state.circle, {
            [i]: {
              style: {$set: classes.circleCollided}
            }
        });
        if(!this.state.snap.snapped) {
          this.setState({circle: newState,snap:{snapped:true,index:i}});
          this.setState({buttonLoc:{x:82.5+(i*45), y:0}}, ()=>this.setState({bounds:{left:82.5+(i*45),right:0,top:0,bottom:0}}, ()=>this.letItGo()));
          //setTimeout( ()=> {this.setState({bounds:{left: -225,right:225}});}, 3000);
          // bounds:{left:82.5+(i*45), right:82.5+(i*45)+100},buttonLoc:{x:82.5+(i*45), y:0}
        }
      }
      else {
        if(this.state.snap.index === i) {
          this.setState({snap:{snapped:false, index:-1}});
        }

        const newState = update(this.state.circle, {
            [i]: {
              style: {$set: classes.circle}
            }
        });
        this.setState({circle: newState});
      }
    }

  }

  letItGo = () => {
    console.log("INSIDE LET_IT_GO");
    //set it free
    //setTimeout( ()=> {this.setState({bounds:{left: -215,right:215,top:0,bottom:0}});}, 300);
    this.setState({startCount:true});
  }

  clearAndStop = () => {
    this.setState({
      deltaPosition: {
        x: 0,
        y: 0
      }
    });
    this.props.stopAnime();
    this.setState({triangleStyle: classes.triangle});
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

      <div ref={(el) => this.diamond = el} className={classes.diamond}>
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
            {/*<img style={{position: 'absolute', width: '100%', top: '10px'}} src={pussy} />*/}
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
      </div>

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

/*

testBoundary = () => {
  //let xCenter = this.circle.getBoundingClientRect().x+100;
  //let yCenter = this.circle.getBoundingClientRect().y+100;
  //let circle = new SAT.Circle(new SAT.Vector(xCenter,yCenter), 100);

  let xLoc = this.diamond.getBoundingClientRect().x;
  let yLoc = this.diamond.getBoundingClientRect().y;
  let dWidth = this.diamond.getBoundingClientRect().width;
  let dHeight = this.diamond.getBoundingClientRect().height;

  let pointX = this.point.getBoundingClientRect().x+this.point.getBoundingClientRect().width/2;
  let pointY = this.point.getBoundingClientRect().y+this.point.getBoundingClientRect().height/2;

  let diamond = new SAT.Polygon(new SAT.Vector(), [
    new SAT.Vector(xLoc+dWidth/2, yLoc),
    new SAT.Vector(xLoc+dWidth, yLoc+dHeight/2),
    new SAT.Vector(xLoc+dWidth/2, yLoc+dHeight),
    new SAT.Vector(xLoc, yLoc+dHeight/2)
  ]);

  let point = new SAT.Vector(pointX+this.point.getBoundingClientRect().width,pointY-10);

  if(!SAT.pointInPolygon(point,diamond)) {
    this.setState({inputText: "I am inside"});
    this.setState({bounds: {top:0, bottom:0, left:0, right:0}});
    //this.setState({position:{x:0, y:0}});
  }
  else {
    this.setState({inputText: "I am inside"});
    this.setState({bounds: {top:-200, right:500}});
  }
}


*/
