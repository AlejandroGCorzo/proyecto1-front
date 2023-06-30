import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useSelector } from "react-redux";
import Loading from "../../utils/Loading";

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
  arrows: true,
  pauseOnHover: true,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
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

const CardsSlider = ({ data, mounth }) => {
  const { subcategorias } = useSelector((state) => state.categories);
  let productBrands = [...new Set(data?.map((item) => item.marca))];
  let brandImg = subcategorias.filter((item) =>
    productBrands.includes(item.nombre)
  );

  return (
    <div className="container">
      <div className="containerSlider">
        <Slider {...settings}>
          {data?.length &&
            data.map((item, index) => (
              <Link to={`/product/${item._id}`} key={item._id}>
                <div className="h-96 sm:max-w-[280px] border border-nav/20 rounded px-3 py-3 hover:shadow-md hover:outline-offset-8 transition-all ease-in-out text-header m-1 bg-white">
                  <div className="mb-1 flex flex-col justify-start items-center">
                    <div className="absolute sm:w-48 md:w-52 lg:w-60 flex items-start justify-between">
                      {item.descuento > 0 && (
                        <span className="text-white bg-header py-1 px-2">
                          - {item.descuento}%
                        </span>
                      )}

                      {item.talle.length > 0 &&
                      item.talle
                        .map((item) => item.cantidad)
                        .reduce((elem, acc) => (acc += elem)) === 1 ? (
                        <span className="text-fontDark px-2 bg-grid">
                          ÚLTIMA UNIDAD
                        </span>
                      ) : (
                        item.productoDate.split("-")[1] === mounth && (
                          <span className="text-white bg-header p-1">
                            NUEVO
                          </span>
                        )
                      )}
                    </div>

                    {item.imagenes.length && (
                      <img
                        src={item.imagenes[0]}
                        alt={item.modelo}
                        className="h-auto max-h-52 w-52 aspect-auto object-contain"
                      />
                    )}
                  </div>
                  {brandImg.length &&
                    brandImg.map(
                      (brand) =>
                        brand.nombre === item.marca && (
                          <div key={brand._id} className="p-2 ">
                            <img
                              src={brand.imagen[0]}
                              alt={brand.nombre}
                              width={30}
                              className="object-contain aspect-auto"
                            />
                          </div>
                        )
                    )}
                  <p className="text-gray-400 py-2 uppercase font-medium h-16">
                    {item.modelo}
                  </p>
                  <p className="text-xl">
                    <strong>${item.precio}</strong>
                  </p>
                  <p className="py-2">
                    <strong>3</strong> cuotas de{" "}
                    <strong>${(item.precio / 3).toFixed(2)}</strong>
                  </p>
                  <p className="font-medium text-orange text-sm">
                    ENVÍO GRATIS
                  </p>
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardsSlider;
