import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';

import classes from './Yaxchi.module.css';
import Card from '../Card/Card';
import 'react-flexview/lib/flexView.css'
import FlexView from 'react-flexview';
import Button from '../Button/Button';

import { CircleLoader } from 'react-spinners';
//import Menus from '../Menus/Menus';
import deckNames from '../assets/deckNames';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
//import Feedback from '../assets/feedback/Feedback';

class Yaxchi extends Component {
  constructor( props ) {
    super( props );
    //console.log(this.props);
    let metaTitle,metaDesc,deckName,deckIndex,mobile=false,i,title,list,path,fromHome,cardNum=10;
    const x = window.matchMedia("(max-width: 768px)");
    if(x.matches) {
      this.props.switchMobile(true);
      mobile=true;
      cardNum=6;
    }
    x.addListener(this.switchToMobile);

    if(this.props.location.title !==undefined) {
      this.props.loadSingle(this.props.location.title, this.props.location.list, this.props.location.deckIndex);
      title = this.props.location.title;
      list = this.props.location.list;
      deckIndex = this.props.location.deckIndex;
      metaTitle='New Booster Packs Gallery| '+this.props.location.deckName;
      metaDesc= this.props.location.deckName;
      fromHome=true;
    }
    else { // When /'packName'/'deckName' was provided
      if(this.props.match.path.substring(0,14) === '/booster-packs') {
        metaTitle='New Booster Packs Gallery| White Dragon Abyss';
        metaDesc= 'Browse through White Dragon Abyss, Shadows in Valhalla, Cybernetic Horizon, Battles of Legend, Dark Saviors.';
        title = 'Booster Pack';
        list = deckNames.boosterPack;
      }
      else if(this.props.match.path.substring(0,14) === '/starter-decks') {
        metaTitle='New Starter Decks| Codebreaker';
        metaDesc='Other Starters include Link Strike, Yuya, and Saber Force.';
        title = 'Starter Deck';
        list = deckNames.starterDeck;
      }
      else if(this.props.match.path.substring(0,16) === '/structure-decks') {
        metaTitle='New Structure Deck Gallery| Powercode Link';
        metaDesc='Other Structures include Lair of Darkness, Wave of Light, and Cyberse Link.';
        title = 'Structure Deck'
        list = deckNames.structureDeck;
      }
      deckName = this.props.match.params.deckName;
      for(i=0;i<list.length; i++) {
        if(deckName === list[i].name) {
          deckIndex=i;
          this.props.loadSingle(title, list,i);
          //console.log('LOADED Single_Deck');
          break;
        }
      }
      fromHome=false;
    }
    path = this.props.match.path.slice(0,this.props.match.path.length-10);
    this.state = {
      interval1:0,
      interval2:0,
      mainInterval:true,
      counter:0,
      mainIndex:0,

      mobile: mobile,
      cardNum: cardNum,
      metaTitle: metaTitle,
      metaDesc: metaDesc,
      title: title,
      list: list,
      deckIndex:deckIndex,
      path:path,
      fromHome:fromHome
    };
  }
  componentDidMount() {

  }

  switchToMobile =(x)=> {
    if(x.matches) {
      this.setState({mobile:true},()=>this.props.switchMobile(true));
    }
    else {
      this.setState({mobile:false},()=>this.props.switchMobile(false));
    }
    this.props.renderOnSwitch();
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
      //this.props.renderFwd();
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
      //this.props.renderBwd();
      const interval = setInterval(() => this.props.renderBwd(),330+speed);
      //clearInterval(this.state.interval1);
      setTimeout( clearInterval(this.state.interval1), 300+speed);

      this.setState({interval2: interval});
      this.setState({mainInterval: true});

    }
  }

  renderNextPage = () => {
    let i,time;
    time=0;
    for(i=0; i<this.state.cardNum; i++) {
      setTimeout(() => this.props.renderFwd(),time);
      time += 50;
    }
  }

  renderPrevPage = () => {
    let i,time;
    time=0;

    for(i=0; i<this.state.cardNum; i++) {
      setTimeout(() => this.props.renderBwd(),time);
      time += 50;
    }
  }

  render() {
    return (
      <div className={classes.Yaxchi}>
        <MetaTags>
          <title>{this.state.metaTitle}</title>
          <meta name="description" content={this.state.metaDesc} />
        </MetaTags>

        <div className={classes.title}>
          <Link to={{
            pathname: `${this.state.path}`,
            title: this.state.title,
            list: this.state.lists,
            fromHome: this.state.fromHome}}
            style={{marginLeft:'3%'}}
            >
          <div className={classes.backButton}>
            <img height='30px' src={require('../assets/back.svg')} alt='backButton'/>
          </div>
          </Link>
          <div className={classes.titleText}>{this.props.deckName.split("_").join(" ")}</div>
          <img height='30px' className={classes.burgerMenu} src={require('../assets/menu.svg')} alt='burgerMenu'/>
        </div>
        {!this.state.mobile ?
          <div className={classes.cards}>
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
          :
          <div className={classes.cards}>
          <FlexView hAlignContent='center'>
            <Card image = {this.props.pics[0]}/>
            <Card image = {this.props.pics[1]}/>
            <Card image = {this.props.pics[2]}/>
          </FlexView>

          <FlexView hAlignContent='center'>
            <Card image = {this.props.pics[5]}/>
            <Card image = {this.props.pics[4]}/>
            <Card image = {this.props.pics[3]}/>
          </FlexView>
          </div>
        }
        <div className={classes.body}>
          <div>
          {this.props.showPopup ?
            <FlexView hAlignContent='center'>
              <CircleLoader
                sizeUnit={"px"}
                size={80}
                color={'black'}
                loading={true}
              />
            </FlexView>
            :
            <FlexView hAlignContent='center'>
              <Button
                startAnimeFwd = {this.startAnimeFwd}
                startAnimeBwd={this.startAnimeBwd}
                stopAnime = {this.stopAnime}
                renderNextPage={this.renderNextPage}
                renderPrevPage={this.renderPrevPage}
                mobile={this.state.mobile}
              />
            </FlexView>
          }
          {/*<Menus
            currentX={this.props.currentIndex}
            totalX={this.props.mainIndex}
            deckIndex={this.props.deckIndex}
            render={this.props.render}
            title={this.state.title}
            list={this.state.list}
            path = {this.state.path}
          />*/}
          </div>
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
    render: state.card.render,
    deckName: state.button.currentName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    renderFwd: () => dispatch(actionCreators.updateNextCard()),
    renderBwd: () => dispatch(actionCreators.updatePrevCard()),
    toggleMenu: (value) => dispatch(actionCreators.toggleMenu(value)),
    loadSingle: (title,list,deckIndex) => dispatch(actionCreators.loadSingleDeck(title,list,deckIndex)),
    switchMobile:(value) => dispatch(actionCreators.switchMobile(value)),
    renderOnSwitch:()=>dispatch(actionCreators.renderOnSwitch_Card())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Yaxchi);
