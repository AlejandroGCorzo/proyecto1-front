import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute z-10 top-1/2 text-3xl text-nav font-semibold"
      onClick={onClick}
    >
      <MdOutlineArrowBackIosNew />
    </button>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute top-1/2 text-3xl right-0 text-nav font-semibold"
      onClick={onClick}
    >
      <MdOutlineArrowForwardIos />
    </button>
  );
};
////////////////////////////SettingSlider//////////////////////////////////////
const settings = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  dots: true,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
    {
      breakpoint: 1540,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};
////////////////////////////SettingSlider//////////////////////////////////////

const Slide = ({ data }) => {
  return (
    <Slider {...settings} arrows={true}>
      {data.map((item, index) => (
        <img
          key={index}
          src={item.url}
          alt={item.title}
          className="w-2/3 h-[600px] aspect-auto object-cover"
        />
      ))}
    </Slider>
  );
};

export default Slide;
