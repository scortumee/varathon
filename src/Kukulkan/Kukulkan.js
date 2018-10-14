import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';

import './Kukulkan.css';
import Card from '../Card/Card';
import 'react-flexview/lib/flexView.css'
import FlexView from 'react-flexview';
import Button from '../Button/Button';

import { CircleLoader } from 'react-spinners';
import Menus from '../Menus/Menus';
import deckNames from '../assets/deckNames';
import MetaTags from 'react-meta-tags';
import { Route } from 'react-router-dom';
import Feedback from '../assets/feedback/Feedback';

class Kukulkan extends Component {
  constructor( props ) {
    super( props );
    let metaTitle,metaDesc,deckName,i,title,list,path,sliceVal;
    console.log('In Kukulkan-CONSTRUCTOR-props',this.props);

    if(this.props.match.path === '/booster-packs') {
      metaTitle='New Booster Packs Gallery| White Dragon Abyss';
      metaDesc= 'Browse through White Dragon Abyss, Shadows in Valhalla, Cybernetic Horizon, Battles of Legend, Dark Saviors.';
      title = 'Booster Pack';
      list = deckNames.boosterPack;
      path = this.props.match.path;
      sliceVal = 15;
    }
    else if(this.props.match.path === '/starter-decks') {
      metaTitle='New Starter Decks| Codebreaker';
      metaDesc='Other Starters include Link Strike, Yuya, and Saber Force.';
      title = 'Starter Deck';
      list = deckNames.starterDeck;
      path = this.props.match.path;
      sliceVal = 15;
    }
    else if(this.props.match.path === '/structure-decks') {
      metaTitle='New Structure Deck Gallery| Powercode Link';
      metaDesc='Other Structures include Lair of Darkness, Wave of Light, and Cyberse Link.';
      title = 'Structure Deck'
      list = deckNames.structureDeck;
      path = this.props.match.path;
      sliceVal = 17;
    }

    if(this.props.match.isExact) {
      if(this.props.location.title ===undefined) {
        if(this.props.category.title !==0) {
          this.props.loadFirst10(this.props.category.title, this.props.category.list,0);
        }
        else {
          this.props.loadFirst10(title,list,0);
        }
      }
      else {
        if(this.props.location.deckIndex === undefined) {
          //let i;
          for(i=0;i<this.props.location.list.length; i++) {
            if(this.props.location.deckName === this.props.location.list[i].name) {
              this.props.loadFirst10(this.props.location.title, this.props.location.list,i);
              console.log('LOADED FIRST_10');
              break;
            }
          }
        }
        else {
          this.props.loadFirst10(this.props.location.title, this.props.location.list, this.props.location.deckIndex);
        }
      }
    }
    else {
      deckName = this.props.location.pathname.slice(sliceVal);
      for(i=0;i<list.length; i++) {
        if(deckName === list[i].name) {
          this.props.loadFirst10(title, list,i);
          console.log('LOADED FIRST_10');
          break;
        }
      }
    }

    this.state = {
      interval1:0,
      interval2:0,
      mainInterval:true,
      counter:0,
      mainIndex:0,
      showPopup: false,
      metaTitle: metaTitle,
      metaDesc: metaDesc,

      title: title,
      list: list,
      path:path
    };
  }
  componentDidMount() {

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
      const interval = setInterval(() => this.props.renderFwd(),330-speed);
      //clearInterval(this.state.interval2);
      setTimeout( clearInterval(this.state.interval2), 300-speed);

      this.setState({interval1: interval});
      this.setState({mainInterval: false});
    }
    else {
      this.props.renderFwd();
      const interval = setInterval(() => this.props.renderFwd(),330-speed);
      //clearInterval(this.state.interval1);
      setTimeout( clearInterval(this.state.interval1), 300-speed);

      this.setState({interval2: interval});
      this.setState({mainInterval: true});

    }
  }

  startAnimeBwd = (speed) => {
    if(this.state.mainInterval){

      this.props.renderBwd();
      const interval = setInterval(() => this.props.renderBwd(),330+speed);
      //clearInterval(this.state.interval2);
      setTimeout( clearInterval(this.state.interval2), 300+speed);

      this.setState({interval1: interval});
      this.setState({mainInterval: false});
    }
    else {
      this.props.renderBwd();
      const interval = setInterval(() => this.props.renderBwd(),330+speed);
      //clearInterval(this.state.interval1);
      setTimeout( clearInterval(this.state.interval1), 300+speed);

      this.setState({interval2: interval});
      this.setState({mainInterval: true});

    }
  }

  render() {

    return (
      <div className='Kukulkan'>
        <MetaTags>
          <title>{this.state.metaTitle}</title>
          <meta name="description" content={this.state.metaDesc} />
        </MetaTags>

        <Route path="/booster-packs/:deckName" component={console.log('')}/>
        <Route path="/starter-decks/:deckName" component={console.log('')}/>
        <Route path="/structure-decks/:deckName" component={console.log('')}/>

        <div style={{alignItems: 'center', marginTop:'16px'}}>
        <FlexView hAlignContent='center'>
          <Card image = {this.props.pics[0]}/>
          <Card image = {this.props.pics[1]}/>
          <Card image = {this.props.pics[2]}/>
          <Card image = {this.props.pics[3]}/>
          <Card image = {this.props.pics[4]}/>
        </FlexView>

        <FlexView hAlignContent='center'>
          <Card image = {this.props.pics[9]}/>
          <Card image = {this.props.pics[8]}/>
          <Card image = {this.props.pics[7]}/>
          <Card image = {this.props.pics[6]}/>
          <Card image = {this.props.pics[5]}/>
        </FlexView>
        </div>

        <div>
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
          <FlexView hAlignContent='center'>
            <Button
              startAnimeFwd = {this.startAnimeFwd}
              stopAnime = {this.stopAnime}
              startAnimeBwd={this.startAnimeBwd}
            />
          </FlexView>
        }
        <div style={{float:'left'}}><Feedback/></div>
        <Menus
          currentX={this.props.currentIndex}
          totalX={this.props.mainIndex}
          deckIndex={this.props.deckIndex}
          render={this.props.render}
          title={this.state.title}
          list={this.state.list}
          path = {this.state.path}
        />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pics: state.card.pic,
    showPopup: state.popup.showPopup,
    category: state.cardReserve.currentCategory,
    currentIndex: state.card.index1,
    mainIndex: state.card.mainIndex,
    deckIndex: state.card.deckIndex,
    render: state.card.render
  };
};

const mapDispatchToProps = dispatch => {
  return {
    renderInitial: (data) => dispatch(actionCreators.fetchForReserve(data)),
    renderFwd: () => dispatch(actionCreators.updateNext()),
    renderBwd: () => dispatch(actionCreators.updatePrev()),
    toggleMenu: (value) => dispatch(actionCreators.toggleMenu(value)),
    loadFirst10:(title, list,deckIndex) => dispatch(actionCreators.loadFirst10(title, list, deckIndex))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Kukulkan);
