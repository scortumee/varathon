import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';

import classes from './Kukulkan.module.css';
import Deck from '../Deck/Deck';
import 'react-flexview/lib/flexView.css'
import FlexView from 'react-flexview';
import Button from '../Button/Button';
import Popup from 'reactjs-popup';
import { CircleLoader } from 'react-spinners';
//import Menus from '../Menus/Menus';
import deckNames from '../assets/deckNames';
import MetaTags from 'react-meta-tags';
//import Feedback from '../assets/feedback/Feedback';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from 'react-router-dom';

class Kukulkan extends Component {
  constructor( props ) {
    super( props );
    let metaTitle,metaDesc,mobile,title,popupSwitch='hover',list,path,cardNum=10;
    const x = window.matchMedia("(max-width: 768px)");
    if(x.matches) {
      this.props.switchMobile(true);
      mobile=true;
      cardNum=6;
      popupSwitch='click';
    }

    x.addListener(this.switchToMobile);

    //console.log('In Kukulkan-CONSTRUCTOR-props',this.props);

    if(this.props.match.path === '/booster-packs') {
      metaTitle='New Booster Packs Gallery| White Dragon Abyss';
      metaDesc= 'Browse through White Dragon Abyss, Shadows in Valhalla, Cybernetic Horizon, Battles of Legend, Dark Saviors.';
      title = 'Booster Pack';
      list = deckNames.boosterPack;
      path = this.props.match.path;
    }
    else if(this.props.match.path === '/starter-decks') {
      metaTitle='New Starter Decks| Codebreaker';
      metaDesc='Other Starters include Link Strike, Yuya, and Saber Force.';
      title = 'Starter Deck';
      list = deckNames.starterDeck;
      path = this.props.match.path;
    }
    else if(this.props.match.path === '/structure-decks') {
      metaTitle='New Structure Deck Gallery| Powercode Link';
      metaDesc='Other Structures include Lair of Darkness, Wave of Light, and Cyberse Link.';
      title = 'Structure Deck';
      list = deckNames.structureDeck;
      path = this.props.match.path;
    }

    if(this.props.location.deckIndex !== undefined || this.props.location.title === undefined || !this.props.location.fromHome) {
      this.props.loadPack(title,list);
    }
    else {
      //doNothing
    }

    this.state = {
      interval1:0,
      interval2:0,
      mainInterval:true,
      counter:0,
      mainIndex:0,
      metaTitle: metaTitle,
      metaDesc: metaDesc,

      mobile:mobile,
      cardNum:cardNum,
      openMenu:false,
      sealed:false,
      popupSwitch:popupSwitch,
      title: title,
      list: list,
      path:path,
      packName: title+'s',
      packList:[{title:'Booster Packs',path:'booster-packs'},
                {title:'Starter Decks',path:'starter-decks'},
                {title:'Structure Decks',path:'structure-decks'}]
    };
  }
  componentDidMount() {

  }

  renderCategory = () => {
    const list = this.state.packList.map((pack,index) => {
      if(this.state.packName !== pack.title) {
        return (
          <Link to={{
            pathname: `${pack.path}`
          }} key={index} className={classes.text}>  <div className={classes.pack}> {pack.title.toUpperCase()} </div>
          </Link>
        )
      }
      else {
        return null;
      }
    });

    return list;
  }

  switchToMobile =(x)=> {
    if(x.matches) {
      this.setState({mobile:true},()=>this.props.switchMobile(true));
    }
    else {
      this.setState({mobile:false},()=>this.props.switchMobile(false));
    }
    this.props.renderOnSwitch()
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
    console.log('popUpSwitch',this.state.popupSwitch);
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

  switchPack = (packName) => {
    this.setState({packName: packName+'s'});
    this.props.loadPack(packName,deckNames.starterDeck);
  }

  switched = (e) => {
    console.log(e.target.checked);
    if(e.target.checked) {
      this.setState({sealed:true});
    }
    else {
      this.setState({sealed:false});
    }
  }

  showMenu = () => {
    //console.log(this.state.openMenu);
    if(!this.state.openMenu) {
      this.setState({openMenu:true});
    }
  }
  closeMenu=()=> {
    if(this.state.openMenu){
      this.setState({openMenu:false});
    }
  }

  render() {
    const {title,list,path} = this.state;
    return (
      <div className={classes.Kukulkan}>
        <MetaTags>
          <title>{this.state.metaTitle}</title>
          <meta name="description" content={this.state.metaDesc} />
        </MetaTags>

        <div className={classes.header}>
          <Link to={{
            pathname: '/'}}
            style={{marginLeft:'3%'}}
          >
            <div className={classes.backButton}>
              <img height='30px'  src={require('../assets/back.svg')} alt='backButton'/>
            </div>
          </Link>
          <div className={classes.titleWrap}>
            <Popup trigger={ <div className={classes.title}>
                <div style={{cursor:'pointer'}}>{this.state.packName.toUpperCase()}</div>
                <div className={classes.downTriangle}/> </div>
              }
              position="bottom center"
              on={this.state.popupSwitch}
              closeOnDocumentClick
              mouseLeaveDelay={80}
              mouseEnterDelay={0}
              contentStyle={{ padding: '0px',boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)',backgroundColor: 'white', borderStyle: 'none',borderColor:'#d6d6d6',width:'250px' }}
            >
              {this.renderCategory()}
            </Popup>
          </div>


          <img ref={(el)=>this.anchorEl = el} height='30px' onClick={()=>this.showMenu()} className={classes.burgerMenu} src={require('../assets/menu.svg')} alt='burgerMenu'/>
          <Popper className={classes.paper} open={this.state.openMenu} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={()=>this.closeMenu()}>
                    <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>My account</MenuItem>
                      <MenuItem>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

        {this.state.mobile ?
          <FlexView hAlignContent='right' marginRight='3%'>
            <div style={{display:'flex',alignItems:'center'}}>Singles </div>
              <Switch onChange={(e)=>this.switched(e)} style={{color:'#f4426b'}} color='primary'/>
            <div style={{display:'flex',alignItems:'center'}}> Sealed </div>
          </FlexView>
          :
          null
        }
        {!this.state.mobile ?
          <div className={classes.cards}>
          <FlexView hAlignContent='center' marginBottom='35px'>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[0]}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[1]}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[2]}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[3]}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[4]}/>
          </FlexView>

          <FlexView hAlignContent='center' marginBottom='25px'>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[9]}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[8]}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[7]}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[6]}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[5]}/>
          </FlexView>
          </div>
          :
          <div className={classes.cards}>
          <FlexView hAlignContent='center' marginBottom='35px'>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[0]} mobile={this.state.mobile} sealed={this.state.sealed}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[1]} mobile={this.state.mobile} sealed={this.state.sealed}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[2]} mobile={this.state.mobile} sealed={this.state.sealed}/>
          </FlexView>

          <FlexView hAlignContent='center' marginBottom='30px'>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[5]} mobile={this.state.mobile} sealed={this.state.sealed}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[4]} mobile={this.state.mobile} sealed={this.state.sealed}/>
            <Deck title={title} list={list} path={path} deck = {this.props.pics[3]} mobile={this.state.mobile} sealed={this.state.sealed}/>
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
          {/*<div style={{float:'left'}}><Feedback/></div>
          <Menus
            currentX={this.props.currentIndex}
            totalX={this.props.mainIndex}
            deckIndex={this.props.deckIndex}
            render={this.props.render}
            title={title}
            list={list}
            path = {path}
          />*/}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pics: state.deck.pic,
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
    renderFwd: () => dispatch(actionCreators.updateNextDeck()),
    renderBwd: () => dispatch(actionCreators.updatePrevDeck()),
    //goFwdPage: () => dispatch(actionCreators.nextDeckPage()),
    //goBwdPage: () => dispatch(actionCreators.prevDeckPage()),
    toggleMenu: (value) => dispatch(actionCreators.toggleMenu(value)),
    switchMobile:(value) => dispatch(actionCreators.switchMobile(value)),
    loadPack: (title,list) => dispatch(actionCreators.loadPack(title,list)),
    renderOnSwitch:()=>dispatch(actionCreators.renderOnSwitch_Deck())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Kukulkan);
