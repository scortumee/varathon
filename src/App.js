import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/index';

import classes from './App.module.css';
import Card from './Card/Card';
import 'react-flexview/lib/flexView.css'
import FlexView from 'react-flexview';
import axios from './axios-orders';
import {encode} from 'node-base64-image';
import Button from './Button/Button';
import Popup from './Popup/Popup';

import { CircleLoader } from 'react-spinners';
import Menu, {SubMenu, MenuItem } from 'rc-menu';
import Menus from './Menus/Menus';
import deckNames from './assets/deckNames';

class App extends PureComponent {
  state = {
    interval1:0,
    interval2:0,
    mainInterval:true,
    counter:0,
    mainIndex:0,
    showPopup: false
  }
  componentDidMount() {
    this.props.setCategory("Booster Pack", deckNames.boosterPack);
    //this.props.renderInitial(1);
    //this.props.renderInitial(deckNames.starterDeck.length);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  stopAnime = () => {
    clearInterval(this.state.interval1);
    clearInterval(this.state.interval2);
  }

  startAnimeFwd = (speed) => {
    if(this.state.mainInterval){
      this.props.renderFwd();
      const interval = setInterval(() => this.props.renderFwd(),300-speed);
      //clearInterval(this.state.interval2);
      setTimeout( clearInterval(this.state.interval2), 260-speed);

      this.setState({interval1: interval});
      this.setState({mainInterval: false});
    }
    else {
      this.props.renderFwd();
      const interval = setInterval(() => this.props.renderFwd(),300-speed);
      //clearInterval(this.state.interval1);
      setTimeout( clearInterval(this.state.interval1), 260-speed);

      this.setState({interval2: interval});
      this.setState({mainInterval: true});

    }
  }

  startAnimeBwd = (speed) => {
    if(this.state.mainInterval){
      /*const counter = this.state.counter+1;
      this.setState({counter: counter});
      if(counter===3){
        console.log('here motherfucker');
        this.props.renderPics();
        this.setState({counter:0});
      }
      */
      this.props.renderBwd();
      const interval = setInterval(() => this.props.renderBwd(),300+speed);
      //clearInterval(this.state.interval2);
      setTimeout( clearInterval(this.state.interval2), 260+speed);

      this.setState({interval1: interval});
      this.setState({mainInterval: false});
    }
    else {
      this.props.renderBwd();
      const interval = setInterval(() => this.props.renderBwd(),300+speed);
      //clearInterval(this.state.interval1);
      setTimeout( clearInterval(this.state.interval1), 260+speed);

      this.setState({interval2: interval});
      this.setState({mainInterval: true});

    }
  }

  render() {
    return (
      <div className={classes.App}>
        <FlexView >
          <Card image = {this.props.pics[0]}/>
          <Card image = {this.props.pics[1]}/>
          <Card image = {this.props.pics[2]}/>
          <Card image = {this.props.pics[3]}/>
          <Card image = {this.props.pics[4]}/>
        </FlexView>
        <FlexView>
          <Card image = {this.props.pics[9]}/>
          <Card image = {this.props.pics[8]}/>
          <Card image = {this.props.pics[7]}/>
          <Card image = {this.props.pics[6]}/>
          <Card image = {this.props.pics[5]}/>
        </FlexView>

        {this.props.showPopup ?
          <FlexView hAlignContent='center'>
            <CircleLoader
              sizeUnit={"px"}
              size={100}
              color={'black'}
              loading={true}
            />
          </FlexView>
          :
          <Button
            startAnimeFwd = {this.startAnimeFwd}
            stopAnime = {this.stopAnime}
            startAnimeBwd={this.startAnimeBwd}
          />

        }

        <Menus/>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    pics: state.card.pic,
    showPopup: state.popup.showPopup,
    popUpImage: state.popup.popWallpaper,
    category: state.cardReserve.currentCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    renderInitial: (data) => dispatch(actionCreators.fetchForReserve(data)),
    renderFwd: () => dispatch(actionCreators.updateNext()),
    renderBwd: () => dispatch(actionCreators.updatePrev()),
    setCategory: (title, list) => dispatch(actionCreators.setCategory(title, list))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
