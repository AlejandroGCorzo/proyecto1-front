import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../redux/productActions";
import CardsSlider from "./Home/CardsSlider";


const OtrosProductosInteres = ({ currentProductType }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.featuredProducts);
  

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

 
 

  return (
    <div>
      <h2 className="text-2xl font-bold mx-4 my-4 px-2 py-2 ">También te puede interesar</h2>
      <CardsSlider data={allProducts} />
    </div>
  );
};

export default OtrosProductosInteres;
