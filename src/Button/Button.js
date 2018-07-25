import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable, {DraggableCore} from 'react-draggable';
import * as actionCreators from '../store/actions/index';
import classes from './Button.module.css';

class Button extends Component {
  state = {
    deltaPosition: {
          x: 0, y: 0
        },
    counter:0,
    pivot:-1,
    triangleStyle: classes.triangle
  }

  handleDrag = (e, ui) => {
    const {x,y} = this.state.deltaPosition;
    const distance = x+ui.deltaX;
    console.log(distance);

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
    /*let counter = this.state.counter;
    counter += ui.deltaX;
    this.setState({counter: counter});

    if(counter>10) {
      this.setState({counter:0});
      //this.props.renderForward();
      this.props.startAnime(speed);
    }
    else if(counter<-10) {
      this.setState({counter:0});
      this.props.renderBackward();
    }*/

    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });

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

  render () {
    return (
      <Draggable
        bounds={{top: -100, left: -200, right: 200, bottom: 100}}
        onDrag={this.handleDrag}
        onStop={this.clearAndStop}
        position={{x: 0, y:0}}
      >
          <button className={classes.Button}>
            <div className={this.state.triangleStyle}/>
          </button>
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
    return {
      index1: state.card.index1,
      mainIndex: state.card.mainIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
      renderForward: () => dispatch(actionCreators.updateNext()),
      renderBackward: () => dispatch(actionCreators.updatePrev())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
