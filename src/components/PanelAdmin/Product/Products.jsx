import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductAction } from "../../../redux/productActions";
const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    const getImages = () => {
      dispatch(getProductAction());
    };
    getImages();
  }, []);
  return (
    <div className="flex flex-col mt-6 w-3/4 max-w-7xl h-full justify-center items-start">
      <Link
        to="/admin/products/form"
        className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
      >
        Crear producto
      </Link>

      <div className="flex flex-wrap w-auto">
        {products.products &&
          products.products.map((item, index) => (
            <div
              key={`${index}card`}
              className="w-auto border border-nav/20 rounded px-3 py-5 hover:shadow-md hover:outline-offset-8 transition-all ease-in-out text-header m-1 bg-white"
            >
              {/* <span className=" absolute text-white bg-header p-1 ">NUEVO</span> */}

              <p>
                {item.marca
                  .slice(0, 1)
                  .toUpperCase()
                  .concat(item.marca.slice(1))}
              </p>
              <p className="text-gray-400 py-2 uppercase font-medium">
                Product's title
              </p>
              <p>
                <strong>${item.precio}</strong>
              </p>
              <p className="py-2">
                <strong>3</strong> cuotas de{" "}
                <strong>$ {Math.ceil(item.precio / 3)}</strong>
              </p>
              <p className="font-medium text-orange text-sm">ENVÍO GRATIS</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
