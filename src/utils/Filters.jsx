import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFiltersAction,
  filterProductsAction,
  setFiltersAction,
} from "../redux/productActions";
import { useParams } from "react-router-dom";
import useViewport from "../hooks/useViewport";

const Filters = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { viewportSize } = useViewport();
  const { filters, products, productsFilter } = useSelector(
    (state) => state.products
  );

  let productBrands = [...new Set(products?.map((item) => item.marca))];
  let productColors = [
    ...new Set(
      products?.map((item) => item.colores.map((color) => color)).flat(Infinity)
    ),
  ];
  let productSizes = [
    ...new Set(
      products
        ?.map((item) => item.talle.map((talle) => talle.talle))
        .flat(Infinity)
    ),
  ];

  let sizeNumbers = productSizes
    .filter((item) => Number(item))
    .sort((a, b) => a - b);
  let sizeStrings = productSizes.filter((item) => !Number(item));

  productSizes =
    sizeNumbers.length && sizeStrings.length
      ? [...sizeStrings, ...sizeNumbers]
      : sizeNumbers.length
      ? sizeNumbers
      : sizeStrings.length
      ? sizeStrings
      : productSizes;

  let productDisciplines = [
    ...new Set(products?.map((item) => item.disciplina.toUpperCase())),
  ];
  let productGenders = [...new Set(products?.map((item) => item.genero))];
  let productCategory = [...new Set(products?.map((item) => item.tipo))];
  let maxPrice = Math.max(...products.map((item) => item.precio));
  let minPrice = Math.min(...products.map((item) => item.precio));
  const [price, setPrice] = useState(maxPrice);
  const [filtersState, setFiltersState] = useState({
    nombre: [],
    category: productCategory?.includes(params.filter) ? params.filter : "",
    color: [],
    marca: [],
    genero: [],
    disciplina: [],
    talle: [],
    precio: [],
  });

  useEffect(() => {
    setFiltersState(filters);
  }, [params.filter]);

  const handlePrice = (e) => {
    const { value, name } = e.target;
    setPrice(value);
    setFiltersState((prev) => ({ ...prev, precio: [minPrice, Number(value)] }));
  };
  const handleRange = (e) => {
    const { value, name } = e.target;
    if (viewportSize.width > 1024) {
      dispatch(setFiltersAction(filtersState));
      dispatch(filterProductsAction());
    }
  };

  const handleName = (e) => {
    const { name, value } = e.target;
    if (name === "removeNombre") {
      setFiltersState((prev) => ({ ...prev, nombre: [] }));
      if (viewportSize.width > 1024) {
        dispatch(
          setFiltersAction({
            ...filtersState,
            nombre: [],
          })
        );
        dispatch(filterProductsAction());
      }
    }
  };

  const handleFilters = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      if (filtersState[name]?.length) {
        setFiltersState((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
        if (viewportSize.width > 1024) {
          dispatch(
            setFiltersAction({
              ...filtersState,
              [name]: [...filtersState[name], value],
            })
          );
        }
      } else {
        setFiltersState((prev) => ({ ...prev, [name]: [value] }));
        if (viewportSize.width > 1024) {
          dispatch(setFiltersAction({ ...filtersState, [name]: [value] }));
        }
      }
    } else {
      if (filtersState[name]?.length) {
        setFiltersState((prev) => ({
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        }));
        if (viewportSize.width > 1024) {
          dispatch(
            setFiltersAction({
              ...filtersState,
              [name]: filtersState[name].filter((item) => item !== value),
            })
          );
        }
      } else {
        setFiltersState((prev) => ({ ...prev, [name]: [] }));
        if (viewportSize.width > 1024) {
          dispatch(setFiltersAction({ ...filtersState, [name]: [] }));
        }
      }
    }

    if (viewportSize.width > 1024) {
      dispatch(filterProductsAction());
    }
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setFiltersState({
      nombre: [],
      category: [],
      color: [],
      marca: [],
      genero: [],
      disciplina: [],
      talle: [],
      precio: [],
    });
    dispatch(clearFiltersAction());
    dispatch(filterProductsAction());
  };
  const handleBtn = () => {
    dispatch(setFiltersAction(filtersState));
    dispatch(filterProductsAction());
  };

  return (
    <div
      className={`lg:block flex flex-col w-full h-full justify-between transition-all ${
        filters?.nombre?.length > 0 && viewportSize.width > 1024
          ? "mt-0"
          : "lg:mt-12"
      }`}
    >
      <div className="lg:block flex flex-col w-full h-auto overflow-y-auto ">
        <span className="h-14 bg-header flex justify-center items-center text-xl text-white lg:hidden">
          FILTROS
        </span>
        {filters?.nombre?.length > 0 && viewportSize.width > 1024 && (
          <div className="flex flex-row justify-between items-center pb-6 px-6 gap-4">
            <p className="font-medium text-header ">
              {params.filter.toUpperCase()}
            </p>
            <button
              name="removeNombre"
              onClick={handleName}
              className="text-fontGrey bg-nav border w-6 rounded-full"
            >
              X
            </button>
          </div>
        )}
        {Object.values(filters).filter((item) => item.length).length > 0 && (
          <div className=" rounded-none bg-white border-x flex flex-col justify-center items-start">
            <div className="collapse-title text-sm font-medium uppercase text-nav border-y lg:border-t rounded">
              Filtros aplicados
            </div>
            <div className=" w-full text-header px-4 py-0 max-h-80 contentScroll flex items-start sm:py-0 border-b">
              {filtersState?.nombre?.length > 0 &&
                viewportSize.width <= 1024 && (
                  <div className="flex flex-row justify-between items-center py-2 px-2 w-full">
                    <p className="font-medium text-header ">
                      {params.filter.toUpperCase()}
                    </p>
                    <button
                      name="removeNombre"
                      onClick={handleName}
                      className="text-fontGrey bg-nav border w-6 h-6 rounded-full flex items-center justify-center"
                    >
                      X
                    </button>
                  </div>
                )}
              {filters?.category?.length > 0 &&
                filters?.category?.map((item) => (
                  <label
                    key={item + "current"}
                    className="label cursor-pointer flex flex-row justify-start items-center gap-2"
                  >
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="category"
                      value={item}
                      onChange={handleFilters}
                      checked={filtersState.category.includes(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              {filters?.color?.length > 0 &&
                filters.color.map((color) => (
                  <label
                    key={color + "current"}
                    className="label cursor-pointer flex flex-row justify-start items-center gap-2"
                  >
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="color"
                      value={color}
                      onChange={handleFilters}
                      checked={filters.color.includes(color)}
                    />
                    <span>
                      {color.slice(0, 1) + color.slice(1).toLowerCase()}
                    </span>
                  </label>
                ))}
              {filters?.disciplina?.length > 0 &&
                filters.disciplina.map((dis) => (
                  <label
                    key={dis + "current"}
                    className="label cursor-pointer flex flex-row justify-start items-center gap-2"
                  >
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="disciplina"
                      value={dis}
                      onChange={handleFilters}
                      checked={filters.disciplina.includes(dis)}
                    />
                    <span>{dis.slice(0, 1) + dis.slice(1).toLowerCase()}</span>
                  </label>
                ))}
              {filters?.genero?.length > 0 &&
                filters.genero.map((gen) => (
                  <label
                    key={gen + "current"}
                    className="label cursor-pointer flex flex-row justify-start items-center gap-2"
                  >
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="genero"
                      value={gen}
                      onChange={handleFilters}
                      checked={filters.genero.includes(gen)}
                    />
                    <span>{gen}</span>
                  </label>
                ))}
              {filters?.marca?.length > 0 &&
                filters.marca.map((mar) => (
                  <label
                    key={mar + "current"}
                    className="label cursor-pointer flex flex-row justify-start items-center gap-2"
                  >
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="marca"
                      value={mar}
                      onChange={handleFilters}
                      checked={filters.marca.includes(mar)}
                    />
                    <span>{mar}</span>
                  </label>
                ))}
              {filters?.talle?.length > 0 &&
                filters.talle.map((tall) => (
                  <label
                    key={tall + "current"}
                    className="label cursor-pointer flex flex-row justify-start items-center gap-2"
                  >
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="talle"
                      value={tall}
                      onChange={handleFilters}
                      checked={filters.talle.includes(tall)}
                    />
                    <span>
                      {tall.slice(0, 1).toUpperCase() + tall.slice(1)}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        )}
        <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium uppercase text-nav  rounded">
            Categoría
          </div>
          <div className="collapse-content border-t text-header p-0 max-h-80 sm:p-0">
            {productCategory?.length > 0 &&
              productCategory.map((category) => (
                <div
                  className="flex flex-row justify-start items-center w-full p-2"
                  key={category}
                >
                  <label
                    key={category}
                    className="label cursor-pointer flex flex-row justify-start items-center gap-2"
                  >
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="category"
                      value={category}
                      onChange={handleFilters}
                      checked={filtersState.category.includes(category)}
                    />
                    <span>{category}</span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium uppercase text-nav  rounded">
            Color
          </div>
          <div className="collapse-content border-t text-header p-0 max-h-80 contentScroll sm:p-0">
            {productColors?.length > 0 &&
              productColors.map((color) => (
                <div
                  className="flex flex-row justify-start items-center w-full p-2"
                  key={color}
                >
                  <label className="label cursor-pointer flex flex-row justify-start items-center gap-2">
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="color"
                      value={color}
                      onChange={handleFilters}
                      checked={filtersState.color.includes(color)}
                    />
                    <span>
                      {color.slice(0, 1) + color.slice(1).toLowerCase()}
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium uppercase text-nav  rounded">
            Disciplina
          </div>
          <div className="collapse-content border-t text-header p-0 max-h-80 contentScroll sm:p-0">
            {productDisciplines?.length > 0 &&
              productDisciplines.map((disciplina) => (
                <div
                  className="flex flex-row justify-start items-center w-full p-2"
                  key={disciplina}
                >
                  <label className="label cursor-pointer flex flex-row justify-start items-center gap-2">
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="disciplina"
                      value={disciplina}
                      onChange={handleFilters}
                      checked={filtersState.disciplina.includes(disciplina)}
                    />
                    <span>
                      {disciplina.slice(0, 1) +
                        disciplina.slice(1).toLowerCase()}
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium uppercase text-nav  rounded">
            Género
          </div>
          <div className="collapse-content border-t text-header p-0 max-h-80 contentScroll sm:p-0">
            {productGenders?.length > 0 &&
              productGenders.map((genero) => (
                <div
                  className="flex flex-row justify-start items-center w-full p-2"
                  key={genero}
                >
                  <label className="label cursor-pointer flex flex-row justify-start items-center gap-2">
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="genero"
                      value={genero}
                      onChange={handleFilters}
                      checked={filtersState.genero.includes(genero)}
                    />
                    <span>{genero}</span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium uppercase text-nav  rounded">
            Marca
          </div>
          <div className="collapse-content border-t text-header p-0 max-h-80 contentScroll sm:p-0">
            {productBrands?.length > 0 &&
              productBrands.map((brand) => (
                <div
                  className="flex flex-row justify-start items-center w-full p-2"
                  key={brand}
                >
                  <label className="label cursor-pointer flex flex-row justify-start items-center gap-2">
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="marca"
                      value={brand}
                      onChange={handleFilters}
                      checked={filtersState.marca.includes(brand)}
                    />
                    <span>
                      {brand.slice(0, 1).toUpperCase() + brand.slice(1)}
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium uppercase text-nav  rounded">
            Talle
          </div>
          <div className="collapse-content border-t text-header p-0 max-h-80 contentScroll sm:p-0">
            {productSizes?.length > 0 &&
              productSizes.map((size) => (
                <div
                  className="flex flex-row justify-start items-center w-full p-2"
                  key={size}
                >
                  <label className="label cursor-pointer flex flex-row justify-start items-center gap-2">
                    <input
                      className="checkbox checkbox-warning checkbox-sm rounded"
                      type="checkbox"
                      name="talle"
                      onChange={handleFilters}
                      value={size}
                      checked={filtersState.talle.includes(size)}
                    />
                    <span>{size}</span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
          <input type="checkbox" />
          <div className="collapse-title text-sm font-medium uppercase text-nav  rounded">
            Gama de precios
          </div>
          <div className="collapse-content border-t text-header max-h-80 px-2">
            <div className="text-header flex flex-col items-center justify-center p-6 lg:w-full lg:px-0 lg:pt-6 lg:pb-2">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={price}
                onChange={handlePrice}
                className="range range-warning "
                onMouseUp={handleRange}
              />
              <div className="w-[90%] lg:w-full flex flex-row justify-between items-center text-lg text-nav">
                <span>${minPrice},00</span>
                <span>${price},00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-row justify-between items-end w-full h-max p-4 bg-white  ">
        <button
          className="btn w-[40%] bg-white text-lg text-header"
          onClick={clearFilters}
        >
          Limpiar
        </button>
        <button
          className="btn w-[40%] text-lg text-fontGrey"
          onClick={handleBtn}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default Filters;
