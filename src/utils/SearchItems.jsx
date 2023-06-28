import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ServerError from "./ServerError";
import {
  filterProductsAction,
  searchProductsAction,
  setFiltersAction,
} from "../redux/productActions";

const SearchItems = ({
  setShowItems,
  setSearchValue,
  debouncedSearchValue,
  error,
  setNavbar,
}) => {
  const { productsSearch, productsFilter, loading } = useSelector(
    (state) => state.products
  );
  const categories = [...new Set(productsSearch.map((item) => item.tipo))];
  const dispatch = useDispatch();

  return (
    <div className="w-[95%] md:w-2/3 lg:w-[400px] h-auto contentScroll max-h-[80%] sm:max-h-[70%] xl:max-h-screen bg-white absolute top-32 2xl:left-[850px] z-[9999] overflow-y-auto font-medium">
      <Link
        to={`/${debouncedSearchValue}`}
        className="flex flex-row gap-2 px-2 py-4 hover:bg-grey"
        onClick={() => {
          dispatch(searchProductsAction(debouncedSearchValue));
          dispatch(setFiltersAction({ name: [debouncedSearchValue] }));
          dispatch(filterProductsAction());
          setShowItems(false);
          setNavbar(false);
          setSearchValue("");
        }}
      >
        <p>Buscar por "{debouncedSearchValue}"</p>
      </Link>
      {categories.length > 0 &&
        debouncedSearchValue.length > 0 &&
        categories.map((item) => (
          <Link
            key={item}
            to={`/${item}`}
            className="flex flex-row gap-2 px-2 py-4 hover:bg-grey"
            onClick={() => {
              dispatch(setFiltersAction({ category: [item] }));
              dispatch(filterProductsAction());
              setShowItems(false);
              setNavbar(false);
              setSearchValue("");
            }}
          >
            <p>{debouncedSearchValue}</p>
            <p>{item}</p>
          </Link>
        ))}
      {productsSearch.length > 0 &&
        !error.length &&
        productsSearch.map((item) => (
          <Link
            key={item._id}
            to={`/detail/${item._id}`}
            className="flex flex-row gap-2 my-2 px-2 py-6 hover:bg-grey "
            onClick={() => {
              setShowItems(false);
              setNavbar(false);
              setSearchValue("");
            }}
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
