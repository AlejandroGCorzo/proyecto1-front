import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ServerError from "./ServerError";

const SearchItems = ({ setShowItems, error }) => {
  const { productsBackUp, loading } = useSelector((state) => state.products);
  return (
    <div className="lg:w-[410px] max-h-72 bg-white absolute top-32 lg:left-[850px] z-[9999] overflow-y-auto contentScroll">
      {productsBackUp.length > 0 &&
        productsBackUp.map((item) => (
          <Link
            to={`/detail/${item._id}`}
            key={item._id}
            className="flex flex-row gap-2 my-2 px-2 py-6 hover:bg-grey"
            onClick={() => setShowItems(false)}
          >
            <img
              src={item.imagenes[0]}
              alt={item.modelo + "search"}
              className="w-10 "
            />
            <p>{item.tipo}</p>
            <p>{item.marca}</p>
            <p className="overflow-hidden whitespace-nowrap">{item.modelo}</p>
          </Link>
        ))}
      {error?.length > 0 && <ServerError error={error} />}
    </div>
  );
};

export default SearchItems;
