import React, { useEffect, useState } from "react";
import Slide from "./Slide";
import CardsSlider from "./CardsSlider";
import { getProductAction } from "../../redux/productActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  getSubCategoriesAction,
} from "../../redux/categoriesActions";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    const getProducts = () => {
      dispatch(getProductAction());
      dispatch(getCategoriesAction());
      dispatch(getSubCategoriesAction());
    };
    getProducts();
  }, []);
  let fechaActual = new Date();
  let mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan en 0
  let destacados = products?.filter((prod) => prod.destacado === true);
  let lanzamientos = products?.filter(
    (prod) => prod.productoDate.split("-")[1] === mes
  );
  let recomendados = products?.filter((prod) => prod.descuento > 0);

  return (
    <div className=" w-full flex flex-col justify-center items-center gap-6 ">
      <div className="w-full max-h-max mt-[38%] sm:mt-[20.8%] md:max-lg:mt-[15.5%] lg:mt-[9.5%]">
        <Slide />
      </div>
      <div className="w-full 2xl:w-[75%] h-auto flex justify-center items-center flex-col">
        <div className="py-4 w-full px-5 lg:px-16 flex items-center justify-between text-nav font-semibold">
          <p className="text-lg md:text-2xl py-1">LANZAMIENTOS</p>
          <button className="border border-orange py-1 px-3 rounded-full text-sm md:text-base text-orange hover:text-white hover:bg-orange transition-all ease-in-out">
            ver todo
          </button>
        </div>
        <CardsSlider data={lanzamientos} mounth={mes} />
      </div>
      <div className="w-full 2xl:w-[75%] h-auto flex justify-center items-center flex-col">
        <div className="py-4 w-full px-5 lg:px-16 flex items-center justify-between text-nav font-semibold">
          <p className="text-lg md:text-2xl py-1">RECOMENDADOS</p>
          <button className="border border-orange py-1 px-3 rounded-full text-sm md:text-base text-orange hover:text-white hover:bg-orange transition-all ease-in-out">
            ver todo
          </button>
        </div>
        <CardsSlider data={recomendados} mounth={mes} />
      </div>
      <div className="w-full 2xl:w-[75%] flex flex-row justify-center items-center p-5 md:px-12  md:py-10 2xl:pr-12 mt-5 md:mt-10 gap-3">
        <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
          <img
            src="/fila.jpg"
            alt="fila icon"
            className="object-contain h-full w-full md:w-1/2"
          />
        </div>
        <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
          <img
            src="/champion.webp"
            alt="champion icon"
            className="object-contain h-full w-full md:w-1/2"
          />
        </div>
        <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
          <img
            src="/jordan.png"
            alt="jordan icon"
            className="object-contain h-full w-full md:w-1/2"
          />
        </div>
        <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
          <img
            src="/adidas.jpeg"
            alt="adidas icon"
            className="object-contain h-full w-full md:w-1/2"
          />
        </div>
        <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
          <img
            src="/nike.png"
            alt="nike icon"
            className="object-contain h-full w-full md:w-1/2"
          />
        </div>
        <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
          <img
            src="/puma.webp"
            alt="puma icon"
            className="object-contain h-full w-full md:w-1/2"
          />
        </div>
      </div>
      <div className="w-full 2xl:w-[75%] h-auto flex justify-center items-center flex-col">
        <div className="py-4 w-full px-5 lg:px-16 flex items-center justify-between  text-nav font-semibold">
          <p className="text-lg md:text-2xl py-1">DESTACADOS</p>
          <button className="border border-orange py-1 px-3 rounded-full text-sm md:text-base text-orange hover:text-white hover:bg-orange transition-all ease-in-out">
            ver todo
          </button>
        </div>
        <CardsSlider data={destacados} mounth={mes} />
      </div>
    </div>
  );
};

export default Home;
