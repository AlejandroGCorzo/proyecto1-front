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
      className="absolute z-10 top-1/2 text-3xl text-nav font-semibold md:px-4"
      onClick={onClick}
    >
      <MdOutlineArrowBackIosNew />
    </button>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute top-1/2 text-3xl right-0 text-nav font-semibold md:px-4"
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

const Slide = () => {
  return (
    <div className="container">
      <div className="w-[95%]">
        <Slider {...settings} arrows={true}>
          <img
            src={"/hero1.webp"}
            alt={"hero 1"}
            className="w-2/3 h-[350px] md:h-[400px]  xl:h-[500px] 2xl:h-[600px] aspect-auto object-contain"
          />
          <img
            src={"/hero2.webp"}
            alt={"hero 2"}
            className="w-2/3 h-[350px] md:h-[400px]  xl:h-[500px] 2xl:h-[600px] aspect-auto object-contain"
          />
          <img
            src={"/hero3.webp"}
            alt={"hero 3"}
            className="w-2/3 h-[350px] md:h-[400px]  xl:h-[500px] 2xl:h-[600px] aspect-auto object-contain"
          />
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
