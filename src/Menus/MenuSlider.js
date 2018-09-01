import React, {Component} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class MenuSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div>
          <div>
           hdasjkfaddsajfhkd
          </div>
          <div>
           hdasjkfadjfhkd
          </div>
          <div>
           hdasjkfadjfhkd
          </div>
        </div>

      </Slider>
    );
  }
}

export default MenuSlider;
