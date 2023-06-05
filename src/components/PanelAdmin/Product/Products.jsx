import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardsSlider from "../../Home/CardsSlider";
const Products = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getImages = () => {
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then((res) => res.json())
        .then((data) =>
          setData(
            data.map((item) => {
              return {
                url: item.url,
                title: item.title,
              };
            })
          )
        )
        .catch((error) => console.log(error));
    };
    getImages();
  }, []);
  return (
    <div className="flex flex-col mt-6 w-full max-w-7xl h-full justify-center items-start">
      <Link
        to="/admin/products/form"
        className="btn text-white hover:bg-grey hover:text-fontDark transition-all ease-in-out"
      >
        Crear producto
      </Link>

      <CardsSlider data={data.slice(0, 30)} />
    </div>
  );
};

export default Products;
