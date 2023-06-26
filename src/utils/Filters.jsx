import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProductsAction } from "../redux/productActions";
import { useParams } from "react-router-dom";

const Filters = ({ products }) => {
  const dispatch = useDispatch();
  const params = useParams();
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
  let productDisciplines = [
    ...new Set(products?.map((item) => item.disciplina)),
  ];
  let productGenders = [...new Set(products?.map((item) => item.genero))];
  let productCategory = [...new Set(products?.map((item) => item.tipo))];
  let maxPrice = Math.max(...products.map((item) => item.precio));
  let minPrice = Math.min(...products.map((item) => item.precio));
  const [price, setPrice] = useState(maxPrice);
  const [filters, setFilters] = useState({
    category: productCategory.includes(params.filter) ? [params.filter] : [],
    color: [],
    marca: [],
    genero: [],
    disciplina: [],
    talle: [],
    precio: [minPrice, price],
  });

  const handlePrice = (e) => {
    const { value, name } = e.target;
    console.log("me llame");
    setPrice(value);
    setFilters((prev) => ({ ...prev, precio: [minPrice, Number(value)] }));
  };
  const handleRange = (e) => {
    const { value, name } = e.target;
    console.log("me llame range");
    dispatch(filterProductsAction(filters));
  };

  const handleFilters = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      if (filters[name]?.length) {
        setFilters((prev) => ({ ...prev, [name]: [...prev[name], value] }));
        dispatch(
          filterProductsAction({
            ...filters,
            [name]: [...filters[name], value],
          })
        );
      } else {
        setFilters((prev) => ({ ...prev, [name]: [value] }));
        dispatch(filterProductsAction({ ...filters, [name]: [value] }));
      }
    } else {
      if (filters[name]?.length) {
        setFilters((prev) => ({
          ...prev,
          [name]: prev[name].filter((item) => item !== value),
        }));
        dispatch(
          filterProductsAction({
            ...filters,
            [name]: filters[name].filter((item) => item !== value),
          })
        );
      } else {
        setFilters((prev) => ({ ...prev, [name]: [] }));
        dispatch(filterProductsAction({ ...filters, [name]: [] }));
      }
    }
  };

  return (
    <>
      {Object.values(filters).length > 0 && (
        <div className=" rounded-none bg-white border-b border-x flex flex-col justify-center items-start">
          <div className="collapse-title text-sm font-medium uppercase text-nav border-t rounded">
            Filtros aplicados
          </div>
          <div className=" text-fontDark px-5">
            {filters?.category?.length > 0 &&
              filters.category.map((cat) => (
                <label
                  key={cat + "current"}
                  className="label cursor-pointer flex flex-row justify-start items-center gap-2"
                >
                  <input
                    className="checkbox checkbox-warning checkbox-sm rounded"
                    type="checkbox"
                    name="category"
                    id=""
                    value={cat}
                    onChange={handleFilters}
                    checked={filters.category.includes(cat)}
                  />
                  <span>{cat}</span>
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
                    id=""
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
                    id=""
                    value={dis}
                    onChange={handleFilters}
                    checked={filters.disciplina.includes(dis)}
                  />
                  <span>{dis}</span>
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
                    id=""
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
                    id=""
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
                    id=""
                    value={tall}
                    onChange={handleFilters}
                    checked={filters.talle.includes(tall)}
                  />
                  <span>{tall.slice(0, 1).toUpperCase() + tall.slice(1)}</span>
                </label>
              ))}
          </div>
        </div>
      )}
      <div className="collapse collapse-arrow rounded-none bg-white border">
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium uppercase text-nav border-b rounded">
          Categoría
        </div>
        <div className="collapse-content text-fontDark">
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
                    id=""
                    value={category}
                    onChange={handleFilters}
                    checked={filters.category.includes(category)}
                  />
                  <span>{category}</span>
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium uppercase text-nav border-b rounded">
          Color
        </div>
        <div className="collapse-content text-fontDark">
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
                    id=""
                    value={color}
                    onChange={handleFilters}
                    checked={filters.color.includes(color)}
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
        <div className="collapse-title text-sm font-medium uppercase text-nav border-b rounded">
          Disciplina
        </div>
        <div className="collapse-content text-fontDark">
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
                    id=""
                    onChange={handleFilters}
                    checked={filters.disciplina.includes(disciplina)}
                  />
                  <span>{disciplina}</span>
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium uppercase text-nav border-b rounded">
          Género
        </div>
        <div className="collapse-content text-fontDark">
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
                    id=""
                    value={genero}
                    onChange={handleFilters}
                    checked={filters.genero.includes(genero)}
                  />
                  <span>{genero}</span>
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className="collapse collapse-arrow rounded-none bg-white border-b border-x">
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium uppercase text-nav border-b rounded">
          Marca
        </div>
        <div className="collapse-content text-fontDark">
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
                    id=""
                    value={brand}
                    onChange={handleFilters}
                    checked={filters.marca.includes(brand)}
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
        <div className="collapse-title text-sm font-medium uppercase text-nav border-b rounded">
          Talle
        </div>
        <div className="collapse-content text-fontDark">
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
                    id=""
                    onChange={handleFilters}
                    value={size}
                    checked={filters.talle.includes(size)}
                  />
                  <span>{size}</span>
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className=" rounded-none bg-white border-b border-x flex flex-col justify-center items-center">
        <div className="collapse-title text-sm font-medium uppercase text-nav border-b rounded">
          Precio
        </div>
        <div className=" text-fontDark w-[90%] flex h-10 items-center">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handlePrice}
            className="range range-warning "
            onMouseUp={handleRange}
          />
        </div>
        <div className="w-[90%] flex flex-row justify-between items-center text-lg text-nav">
          <span>${minPrice},00</span>
          <span>${price},00</span>
        </div>
      </div>
    </>
  );
};

export default Filters;
