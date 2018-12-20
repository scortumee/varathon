import React, { PureComponent } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './imgStyle.css';
import deckNames from '../../assets/deckNames';
import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    >
      <img src={require("../../assets/right-arrow.svg") } alt="left"/>
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
      <img src={require("../../assets/left-arrow.svg") } alt="left"/>
    </div>
  );
}

class Latestpacks extends PureComponent {

  constructor( props ) {
    super( props );
    let pathname,list;
    if(this.props.pack === 'Booster Pack') {
      pathname = '/booster-packs';
      list = deckNames.boosterPack;
    }
    else if(this.props.pack === 'Starter Deck') {
      pathname = '/starter-decks';
      list = deckNames.starterDeck;
    }
    else if(this.props.pack === 'Structure Deck') {
      pathname = '/structure-decks';
      list = deckNames.structureDeck;
    }

    this.state = {
      pathname: pathname,
      title: this.props.pack,
      list:list
    };
  }


  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      slidesPerRow: 5,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,

    };
    const carosol=Object.keys(this.props.imglist).map((key)=>
      <Link to={{
       pathname: this.state.pathname,
       title: this.state.title,
       list: this.state.list,
       deckName: key
       }} style={{ textDecoration: 'none' }}>
        <div>
          <img src={this.props.imglist[key]} alt={key} className="center"/>
        </div>
       </Link>
    );

    return (

      <div  className="shiftdown">
      <h1 className="banner">{"Latest "+this.props.pack+"s"}</h1>

      <div className="carasol-width">
        <Slider {...settings}>
        {carosol}
        </Slider>
      </div>
      </div>
    );
  }
}

export default Latestpacks;
