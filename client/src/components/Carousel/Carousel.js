import React, { Component } from "react";
import Slider from "react-slick";
import './Carousel.scss';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

export default class Carousel extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        className: 'mycarousel'
      };
      return (
        <div>
          <Slider {...settings}>
              {this.props.children}
          </Slider>
        </div>
      );
    }
  }