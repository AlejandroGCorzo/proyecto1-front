// En el componente ProductosDestacados
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../redux/productActions";
import CardsSlider from "./Home/CardsSlider";

const ProductosDestacados = ({ productType }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.featuredProducts);

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  const filteredProducts = allProducts.filter(
    (product) => product.tipo === productType
  );
console.log(filteredProducts)
  const currentMonth = new Date().getMonth(); // Obtener el mes actual

  return (
    <div>
      <h2 className="text-2xl font-bold mx-4 my-4 px-2 py-2">
        Productos Relacionados
      </h2>
      <CardsSlider data={filteredProducts} currentMonth={currentMonth} />
    </div>
  );
};

export default ProductosDestacados;



