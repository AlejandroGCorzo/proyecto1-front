import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CardsSlider from "./Home/CardsSlider";

const OtrosProductosInteres = ({ currentProductType }) => {
  let fechaActual = new Date();
  let mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
  
  const allProducts = useSelector((state) => state.products.featuredProducts);
   
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mx-4 my-4 px-2 py-2 flex md:self-start">
        También te puede interesar
      </h2>
      <CardsSlider data={allProducts} mounth={mes}/>
    </div>
  );
};

export default OtrosProductosInteres;
