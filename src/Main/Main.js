import React, { Fragment, Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';
import deckNames from '../assets/deckNames';

import { Link } from 'react-router-dom';
import './Main.css';
import Popup from 'reactjs-popup';
import Carousel from 'nuka-carousel';
import Slider from "react-slick";
import {slide as Menu} from 'react-burger-menu';
import MetaTags from 'react-meta-tags';

import logo from '../assets/varathonlogo.png';
import booster from '../assets/booster.png';
import starter from '../assets/starter.png';
import structure from '../assets/structure.png';

import LatestDecks from './Carousel/Entry';
import Feedback from '../assets/feedback/Feedback';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    >
      <img src={require("../assets/right-arrow.svg") } alt="left"/>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    >
      <img src={require("../assets/left-arrow.svg") } alt="left"/>
    </div>
  );
}


class App extends Component {
  constructor( props ) {
    super( props );
    let showCarousel = true;
    if(this.props.location.pathname === '/home') {
      showCarousel =false;
    }
    this.state = {
      showCarousel: showCarousel
    };

  }

  animateBurger =() => {
    this.burger.classList.toggle("change");
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div>
        <MetaTags>
            <title>Yugioh Cards Picture Gallery| View Latest Booster, Starter, & Structure Sets</title>
            <meta name="description" content="Browse quickly though new Yugioh packs and decks. Includes all TCG lists and Updates." />
        </MetaTags>
        <header className="header">
          <img src={logo} width="250" height="50" alt="company-logo" />
          <div className='burgerMenu' >
            <Popup
                 trigger={
                  <div ref={(el) => this.burger = el}className="container" onClick={()=>this.animateBurger()} >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                  </div>
                }
                 position="bottom center"
                 on="hover"
                 closeOnDocumentClick
                 mouseLeaveDelay={300}
                 mouseEnterDelay={0}
                 contentStyle={{ padding: "0px", border: "none" }}
                 arrow={false}
               >
               <div> Booster Packs </div>
               <div> Starter Decks </div>
               <div> Structure Decks </div>
            </Popup>
          </div>
          <div className="main-menu">
            <Popup
                 trigger={
                    <Link to={{
                     pathname: '/booster-packs',
                     title: 'Booster Pack',
                     list: deckNames.boosterPack,
                     deckIndex:0
                 }} style={{ textDecoration: 'none' }}> <div className="menu-item-main"> Booster Packs </div>
                 </Link>}

                 position="bottom center"
                 on="hover"
                 closeOnDocumentClick
                 mouseLeaveDelay={300}
                 mouseEnterDelay={0}
                 contentStyle={{ padding: "0px", border: "none" }}
                 arrow={false}
               >
                 <div className="menu">
                   <Link to={{
                    pathname: '/booster-packs',
                    title: 'Booster Pack',
                    list: deckNames.boosterPack,
                    deckIndex:0
                    }} style={{ textDecoration: 'none' }}> <div className="menu-item"> Legendary Duelist: WHITE DRAGON ABYSS</div> </Link>
                   <Link to={{
                   pathname: '/booster-packs',
                   title: 'Booster Pack',
                   list: deckNames.boosterPack,
                   deckIndex:1
                   }} style={{ textDecoration: 'none' }}> <div className="menu-item"> SHADOWS IN VALHALLA </div> </Link>
                   <Link to={{
                    pathname: '/booster-packs',
                    title: 'Booster Pack',
                    list: deckNames.boosterPack,
                    deckIndex:2
                    }} style={{ textDecoration: 'none' }}><div className="menu-item"> CYBERNETIC HORIZON </div> </Link>
                    <Link to={{
                     pathname: '/booster-packs',
                     title: 'Booster Pack',
                     list: deckNames.boosterPack,
                     deckIndex:3
                   }} style={{ textDecoration: 'none' }}> <div className="menu-item"> Battles of Legend: RELENTLESS REVENGE </div> </Link>
                 </div>
              </Popup>

              <Popup
                   trigger={
                     <Link to={{
                         pathname: '/structure-decks',
                         title: 'Structure Deck',
                         list: deckNames.structureDeck,
                         deckIndex:0
                     }} style={{ textDecoration: 'none' }} > <div className="menu-item-main"> Structure Decks </div> </Link>
                   }
                   position="bottom center"
                   on="hover"
                   closeOnDocumentClick
                   mouseLeaveDelay={300}
                   mouseEnterDelay={0}
                   contentStyle={{ padding: "0px", border: "none" }}
                   arrow={false}
                 >
                   <div className="menu">
                     <Link to={{
                         pathname: '/structure-decks',
                         title: 'Structure Deck',
                         list: deckNames.structureDeck,
                         deckIndex:0
                     }} style={{ textDecoration: 'none' }} ><div className="menu-item"> POWERCODE LINK</div> </Link>
                     <Link to={{
                         pathname: '/structure-decks',
                         title: 'Structure Deck',
                         list: deckNames.structureDeck,
                         deckIndex:1
                     }} style={{ textDecoration: 'none' }} ><div className="menu-item"> LAIR OF DARKNESS </div> </Link>
                     <Link to={{
                         pathname: '/structure-decks',
                         title: 'Structure Deck',
                         list: deckNames.structureDeck,
                         deckIndex:2
                     }} style={{ textDecoration: 'none' }} ><div className="menu-item"> WAVE OF LIGHT </div> </Link>
                     <Link to={{
                         pathname: '/structure-decks',
                         title: 'Structure Deck',
                         list: deckNames.structureDeck,
                         deckIndex:3
                     }} style={{ textDecoration: 'none' }} ><div className="menu-item"> CYBERSE LINK </div> </Link>
                   </div>
                </Popup>

                <Popup
                     trigger={
                       <Link to={{
                           pathname: '/starter-decks',
                           title: 'Starter Deck',
                           list: deckNames.starterDeck,
                           deckIndex:0
                       }} style={{ textDecoration: 'none' }} > <div className="menu-item-main"> Starter Decks </div> </Link>
                     }
                     position="bottom center"
                     on="hover"
                     closeOnDocumentClick
                     mouseLeaveDelay={300}
                     mouseEnterDelay={0}
                     contentStyle={{ padding: "0px", border: "none" }}
                     arrow={false}
                   >
                     <div className="menu">
                       <Link to={{
                           pathname: '/starter-decks',
                           title: 'Starter Deck',
                           list: deckNames.starterDeck,
                           deckIndex:0
                       }} style={{ textDecoration: 'none' }} ><div className="menu-item"> CODEBREAKER</div> </Link>
                       <Link to={{
                           pathname: '/starter-decks',
                           title: 'Starter Deck',
                           list: deckNames.starterDeck,
                           deckIndex:1
                       }} style={{ textDecoration: 'none' }} ><div className="menu-item"> LINK STRIKE</div> </Link>
                       <Link to={{
                           pathname: '/starter-decks',
                           title: 'Starter Deck',
                           list: deckNames.starterDeck,
                           deckIndex:2
                       }} style={{ textDecoration: 'none' }} ><div className="menu-item"> YUYA </div> </Link>
                       <Link to={{
                           pathname: '/starter-decks',
                           title: 'Starter Deck',
                           list: deckNames.starterDeck,
                           deckIndex:3
                       }} style={{ textDecoration: 'none' }} > <div className="menu-item"> SABER FORCE </div> </Link>
                     </div>
                  </Popup>

             </div>
             {/*<Menu customBurgerIcon={ <img src={require('../assets/burgerMenu.svg')} /> } >
             <a id="home" className="menu-item" href="/">Home</a>
      <a id="about" className="menu-item" href="/about">About</a>
      <a id="contact" className="menu-item" href="/contact">Contact</a>
      <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
             </Menu>*/}
          </header>


          <div className='carousel'>
            <Slider {...settings}>
            <Link to={{
             pathname: '/booster-packs',
             title: 'Booster Pack',
             list: deckNames.boosterPack,
             deckIndex:0
             }} style={{ textDecoration: 'none' }}><div className="container">
                  <img src={booster} alt="booster" className="stretch"/>
              </div> </Link>

              <Link to={{
               pathname: '/structure-decks',
               title: 'Structure Deck',
               list: deckNames.structureDeck,
               deckIndex:0
               }} style={{ textDecoration: 'none' }}><div className="container">
                  <img src={structure} alt="structure" className="stretch"/>
              </div> </Link>

              <Link to={{
               pathname: '/starter-decks',
               title: 'Starter Deck',
               list: deckNames.starterDeck,
               deckIndex:0
               }} style={{ textDecoration: 'none' }}><div className="container">
                  <img src={starter} alt="starter" className="stretch"/>
              </div> </Link>
            </Slider>
          </div>

          {this.state.showCarousel ?
              <LatestDecks/>
            :null
          }
          <Feedback />
        </div>
    );
  }
}

export default connect(null, null)(App);
