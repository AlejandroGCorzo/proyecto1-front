import React from "react";
import { Link } from "react-router-dom";
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
      className="absolute -left-8 z-10 top-1/2 text-3xl text-nav font-semibold"
      onClick={onClick}
    >
      <MdOutlineArrowBackIosNew />
    </button>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute -right-8 top-1/2 text-3xl text-nav font-semibold"
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
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  dots: true,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
    /*  {
      breakpoint: 1540,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
      },
    }, */
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3,
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
        dots: false,
        arrows: false,
      },
    },
  ],
};
////////////////////////////SettingSlider//////////////////////////////////////

const CardsSlider = ({ data }) => {
  return (
    <div className="container">
      <div className="containerSlider">
        <Slider {...settings} arrows={true}>
          {data.map((item, index) => (
            <Link to={"/detail"}>
              <div
                key={`${index}card`}
                className="sm:max-w-[250px] border border-nav/20 rounded px-3 py-5 hover:shadow-md hover:outline-offset-8 transition-all ease-in-out text-header m-1 bg-white"
              >
                <span className=" absolute text-white bg-header p-1 ">
                  NUEVO
                </span>
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-56 aspect-auto object-cover"
                />
                <p>brand</p>
                <p className="text-gray-400 py-2 uppercase font-medium">
                  Product's title
                </p>
                <p>
                  <strong>$Price</strong>
                </p>
                <p className="py-2">
                  <strong>3</strong> cuotas de <strong>$ 99999</strong>
                </p>
                <p className="font-medium text-orange text-sm">ENVÍO GRATIS</p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardsSlider;
