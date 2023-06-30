import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/productActions";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";

const ProductosDestacados = ({ productType }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.featuredProducts);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const filteredProducts = allProducts.filter((product) => product.tipo === productType);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 5, filteredProducts.length - 1)
    );
  };

  const visibleProducts = filteredProducts.slice(currentIndex, currentIndex + 5);

  const handlers = useSwipeable({
    onSwipedLeft: handleNextClick,
    onSwipedRight: handlePrevClick,
  });
console.log(allProducts)
return (
    <div>
    <h2 className="text-2xl font-bold mb-4">También te puede interesar</h2>
    <div className="flex flex-col items-center sm:flex-row sm:justify-between">
      <div
        {...handlers}
        className="flex items-center space-x-4 xsm:flex-col sm:flex-row sm:justify-between"
      >
        {currentIndex > 0 && (
          <button
            onClick={handlePrevClick}
            className="btn btn-circle w-14 h-7 hover:bg-black hover:text-white items-center text-black border-transparent bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-5 overflow-x-auto">
          {visibleProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="flex-shrink-0 w-full bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={product.imagenes[0]}
                alt={product.nombre}
                className="w-full h-40 object-cover rounded-lg"
              />
              <p className="text-sm font-medium mt-2">{product.marca}</p>
              <p className="text-xs text-gray-600">{product.modelo}</p>
              <p className="text-xs text-gray-600">${product.precio}</p>
              <p className="text-xs text-gray-600">
                3 Cuotas de {Math.round(product.precio / 3)}
              </p>
            </Link>
          ))}
        </div>
        {currentIndex + 1 < filteredProducts.length && (
          <button
            onClick={handleNextClick}
            className="btn btn-circle w-14 h-7 hover:bg-black hover:text-white items-center text-black border-transparent bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  </div>
);
};

export default ProductosDestacados;



