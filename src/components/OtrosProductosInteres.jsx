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

 console.log(allProducts)
 

  return (
    <div>
     
      <CardsSlider data={allProducts} />
    </div>
  );
};

export default OtrosProductosInteres;
