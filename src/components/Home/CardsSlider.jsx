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
import { formatearPrecio } from "../../utils/formatPrice";
import useViewport from "../../hooks/useViewport";

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

const CardsSlider = ({ data, mounth }) => {
  const { viewportSize } = useViewport();
  const { subcategorias } = useSelector((state) => state.categories);
  let productBrands = [...new Set(data?.map((item) => item.marca))];
  let brandImg = subcategorias.filter((item) =>
    productBrands.includes(item.nombre)
  );
  ////////////////////////////SettingSlider//////////////////////////////////////
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 500,
    slidesToShow: data?.length < 6 ? data.length : 6,
    slidesToScroll: data?.length < 6 ? data.length : 6,
    initialSlide: 0,
    /* dots: true, */
    arrows: true,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: data?.length < 5 ? data.length : 5,
          slidesToScroll: data?.length < 5 ? data.length : 5,
          /* dots: true, */
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          /* dots: true, */
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          /*    dots: true, */
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

  return (
    <div className="container">
      <div
        className={
          data?.length < 5 && viewportSize?.width > 1280
            ? "w-[70%]"
            : "containerSlider"
        }
      >
        {data?.length > 0 && (
          <Slider {...settings}>
            {data.map((item, index) => (
              <div
                key={item._id}
                className="h-auto max-w-[270px] border border-nav/20 rounded px-3 py-3 hover:shadow-md hover:outline-offset-8 transition-all ease-in-out text-header  bg-white flex self-center"
              >
                <Link
                  to={`/product/${item._id}`}
                  className="mb-1 flex flex-col justify-between items-center"
                >
                  <div className=" flex flex-col justify-start items-center ">
                    <div className="absolute w-48 md:w-60 xl:w-48 2xl:w-56 flex items-center justify-between">
                      {item.descuento > 0 && (
                        <span className="text-white bg-header py-1 px-2">
                          - {item.descuento}%
                        </span>
                      )}

                      {
                        /* item.talle.length > 0 &&
                      item.talle
                        .map((item) => item.cantidad)
                        .reduce((elem, acc) => (acc += elem)) === 1 ? (
                        <span className="text-header px-2 bg-yellow">
                          ÚLTIMA UNIDAD
                        </span>
                      ) : */ item.productoDate &&
                          item.productoDate.split("-")[1] === mounth && (
                            <span className="text-white bg-header p-1">
                              NUEVO
                            </span>
                          )
                      }
                    </div>

                    <div className="flex justify-center items-center h-44 w-44 ">
                      {item.imagen?.length > 0 || item.imagenes?.length > 0 ? (
                        <img
                          src={
                            item?.imagen?.length ? item?.imagen : item?.imagenes
                          }
                          alt={item?.descripcion}
                          className="w-full h-[80%] object-contain px-4 max-w-sm md:max-w-xl "
                          onError={(e) => {
                            e.target.src = "/nodisponible.jpg";
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                  {brandImg.length > 0 &&
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
                  <p className="text-gray-400 py-4 uppercase font-medium h-20 w-full max-w-52 text-center">
                    {item.descripcion}
                  </p>
                  <div className="h-auto flex flex-col justify-start items-end w-full">
                    {/* <p className="text-lg">
                      <strong className="text-xl">${item.precio},00</strong>
                    </p> */}
                    {item.descuento > 0 ? (
                      <div className="flex flex-col w-full gap-1 justify-center items-end">
                        <p className="text-lg font-medium text-header/60 w-max text-center line-through">
                          {formatearPrecio(item.precio)}
                        </p>
                        <p className="text-xl font-medium text-header w-max text-center flex flex-row items-center">
                          <span className="text-green-400 text-xs pr-2 font-normal">
                            {item.descuento + "% OFF"}
                          </span>
                          {formatearPrecio(
                            item.precio - item.precio * (item.descuento / 100)
                          )}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xl pb-1 font-medium text-header  text-end w-full mt-7">
                        {formatearPrecio(item.precio)}
                      </p>
                    )}

                    <p className="font-medium text-yellow text-sm flex justify-start items-end">
                      ENVÍO GRATIS
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default CardsSlider;
