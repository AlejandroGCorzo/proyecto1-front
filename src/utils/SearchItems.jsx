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
  setIsSearchOpen,
  isSearchOpen,
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
    <div className="w-[95%] md:w-2/3 lg:w-[350px] 2xl:w-[500px] h-auto contentScroll max-h-[80%] sm:max-h-[70%] xl:max-h-[600px] bg-white absolute top-[120px] xl:left-[500px] 2xl:left-[790px] z-[9999] overflow-y-auto font-medium">
      <Link
        to={`/products/${debouncedSearchValue}`}
        className="flex flex-row gap-2 px-2 py-4 hover:bg-grey"
        onClick={() => {
          dispatch(searchProductsAction(debouncedSearchValue));
          dispatch(setFiltersAction({ nombre: [debouncedSearchValue] }));
          dispatch(filterProductsAction());
          setShowItems(false);
          setNavbar(false);
          setSearchValue("");
          if (isSearchOpen) {
            setIsSearchOpen(false);
          }
        }}
      >
        <p>Buscar por "{debouncedSearchValue}"</p>
      </Link>
      {/* {categories.length > 0 &&
        debouncedSearchValue.length > 0 &&
        categories.map((item) => (
          <Link
            key={item}
            to={`/products/${item}`}
            className="flex flex-row gap-2 px-2 py-4 hover:bg-grey"
            onClick={() => {
              dispatch(setFiltersAction({ category: [item] }));
              dispatch(filterProductsAction());
              setShowItems(false);
              setNavbar(false);
              setSearchValue("");
              if (isSearchOpen) {
                setIsSearchOpen(false);
              }
            }}
          >
            <p>{debouncedSearchValue}</p>
            <p>{item}</p>
          </Link>
        ))} */}

      {productsSearch.length > 0 &&
        !error.length &&
        productsSearch.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="flex flex-row gap-2  px-2 py-6 hover:bg-grey items-center justify-center w-full"
            onClick={() => {
              setShowItems(false);
              setNavbar(false);
              setSearchValue("");
              if (isSearchOpen) {
                setIsSearchOpen(false);
              }
            }}
          >
            <img
              src={item.imagen?.length ? item.imagen : item.imagenes}
              alt={item.descripcion + "search"}
              className="w-12 max-h-12 overflow-hidden"
              onError={(e) => {
                e.target.src = "/nodisponible.jpg";
              }}
            />

            <p className="overflow-hidden whitespace-nowrap w-full">
              {item.descripcion}
            </p>
          </Link>
        ))}
      {error?.length > 0 && <ServerError error={error} />}
    </div>
  );
};

export default SearchItems;
