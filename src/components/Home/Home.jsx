import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slide from "./Slide";
import CardsSlider from "./CardsSlider";
import {
  filterProductsAction,
  orderProductsAction,
  setFiltersAction,
} from "../../redux/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  let fechaActual = new Date();
  let mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan en 0
  let destacados = products?.filter((prod) => prod.destacado === true);
  let lanzamientos = products?.filter(
    (prod) => prod.productoDate.split("-")[1] === mes
  );
  let recomendados = products?.filter(
    (prod) => prod.descuento > 0 /* ||
      (prod.talle.length > 0 &&
        prod.talle
          .map((item) => item.cantidad)
          .reduce((elem, acc) => (acc += elem)) === 1) */
  );

  const handleClickBrands = (e) => {
    const { id } = e.target;
    dispatch(setFiltersAction({ marca: [id] }));
    dispatch(filterProductsAction());
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center gap-6 bg-grey">
      <div className="w-full max-h-max">
        <Slide />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {lanzamientos?.length > 0 && (
            <div className="w-full 2xl:w-[75%] h-auto flex justify-center items-center flex-col">
              <div className="py-4 w-full px-5 lg:px-16 flex items-center justify-between text-nav font-semibold">
                <p className="text-lg md:text-2xl py-1">LANZAMIENTOS</p>
                <Link
                  to={"/products/:filters"}
                  className="border border-yellow py-1 px-3 rounded-full text-sm md:text-base text-yellow 
                bg-header hover:text-white hover:bg-yellow transition-all ease-in-out z-10"
                  id={"nuevo"}
                  onClick={(e) => dispatch(orderProductsAction(e.target.id))}
                >
                  ver todo
                </Link>
              </div>
              <CardsSlider data={lanzamientos} mounth={mes} />
            </div>
          )}
          {recomendados?.length > 0 && (
            <div className="w-full 2xl:w-[75%] h-auto flex justify-center items-center flex-col mb-10">
              <div className="py-4 w-full px-5 lg:px-16 flex items-center justify-between text-nav font-semibold">
                <p className="text-lg md:text-2xl py-1">RECOMENDADOS</p>
                <Link
                  to={"/products/:filters"}
                  className="border border-yellow py-1 px-3 rounded-full text-sm md:text-base text-yellow 
                bg-header hover:text-white hover:bg-yellow transition-all ease-in-out"
                  id={"descuento"}
                  onClick={(e) => dispatch(orderProductsAction(e.target.id))}
                >
                  ver todo
                </Link>
              </div>
              <CardsSlider data={recomendados} mounth={mes} />
            </div>
          )}
          {/*  <div className="w-full 2xl:w-[75%] flex flex-row justify-center items-center p-5 md:px-16  md:py-10 2xl:pr-12 mt-5 md:mt-10 gap-3">
            <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
              <Link
                onClick={handleClickBrands}
                to={"/fila"}
                className="w-full flex justify-center items-center"
                value="Fila"
              >
                <img
                  id="Fila"
                  src="/fila.jpg"
                  alt="fila icon"
                  className="object-contain h-full w-full md:w-1/2"
                />
              </Link>
            </div>
            <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
              <Link
                onClick={handleClickBrands}
                to={"/champion"}
                className="w-full flex justify-center items-center"
                value="Champion"
              >
                <img
                  id="Champion"
                  src="/champion.webp"
                  alt="champion icon"
                  className="object-contain h-full w-full md:w-1/2"
                />
              </Link>
            </div>
            <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
              <Link
                onClick={handleClickBrands}
                to={"/jordan"}
                className="w-full flex justify-center items-center"
                value="Jordan"
              >
                <img
                  id="Jordan"
                  src="/jordan.png"
                  alt="jordan icon"
                  className="object-contain h-full w-full md:w-1/2"
                />
              </Link>
            </div>
            <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
              <Link
                onClick={handleClickBrands}
                to={"/adidas"}
                className="w-full flex justify-center items-center"
                value="Adidas"
              >
                <img
                  id="Adidas"
                  src="/adidas.jpeg"
                  alt="adidas icon"
                  className="object-contain h-full w-full md:w-1/2"
                />
              </Link>
            </div>
            <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
              <Link
                onClick={handleClickBrands}
                to={"/nike"}
                className="w-full flex justify-center items-center"
                value="Nike"
              >
                <img
                  id="Nike"
                  src="/nike.png"
                  alt="nike icon"
                  className="object-contain h-full w-full md:w-1/2"
                />
              </Link>
            </div>
            <div className="border rounded-md shadow p-2 h-[70px] w-full bg-white flex justify-center items-center">
              <Link
                onClick={handleClickBrands}
                to={"/puma"}
                className="w-full flex justify-center items-center"
                value="Puma"
              >
                <img
                  id="Puma"
                  src="/puma.webp"
                  alt="puma icon"
                  className="object-contain h-full w-full md:w-1/2"
                />
              </Link>
            </div>
          </div> */}
          {destacados?.length > 0 && (
            <div className="w-full 2xl:w-[75%] h-auto flex justify-center items-center flex-col mb-10">
              <div className="py-4 w-full px-5 lg:px-16 flex items-center justify-between  text-nav font-semibold">
                <p className="text-lg md:text-2xl py-1">DESTACADOS</p>
                <Link
                  to={"products/:filters"}
                  className="border border-yellow py-1 px-3 rounded-full text-sm md:text-base text-yellow hover:text-white hover:bg-yellow transition-all ease-in-out"
                  id={"relevancia"}
                  onClick={(e) => dispatch(orderProductsAction(e.target.id))}
                >
                  ver todo
                </Link>
              </div>
              <CardsSlider data={destacados} mounth={mes} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
