import React, { useState } from "react";
import {
  deleteCategoriesAction,
  deleteCategoriesSubCategoryAction,
  deleteImgCategoriesAction,
  deleteImgSubcategoriesAction,
  deleteSubCategoriesAction,
} from "../redux/categoriesActions";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImgProductsAction,
  deleteProductAction,
} from "../redux/productActions";

export const ConfirmationComponent = ({
  onDelete,
  toggleModal,
  confirmed,
  setConfirmed,
  itemToDelete,
  setItemToDelete,
  section,
}) => {
  const handleConfirm = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value === "true") {
      setConfirmed(true);
    } else {
      setConfirmed(false);
      toggleModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {confirmed ? (
        <DeleteComponent
          onDelete={onDelete}
          itemToDelete={itemToDelete}
          setItemToDelete={setItemToDelete}
          section={section}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-2/3">
          <h1
            className="text-xl text-center text-fontDark font-semibold mb-4"
            style={{ userSelect: "none" }}
          >
            {`¿Estás seguro que desea eliminar ${itemToDelete?.nombre} de ${section}?`}
          </h1>
          <div className="w-full flex justify-between">
            <button
              className="btn-success text-white px-4 py-2 rounded"
              value={true}
              onClick={handleConfirm}
            >
              Confirmar
            </button>
            <button
              className="btn-error text-white px-4 py-2 rounded"
              value={false}
              onClick={handleConfirm}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const DeleteComponent = ({
  onDelete,
  itemToDelete,
  section,
  setItemToDelete,
}) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const validateName = (input) => {
    if (
      input &&
      input.trim().toLowerCase() === itemToDelete?.nombre?.trim().toLowerCase()
    ) {
      setNameError("");
    }
    if (input && input !== itemToDelete?.nombre) {
      setNameError("El nombre ingresado debe coincidir.");
    }
    if (!input) {
      setNameError("Debe ingresar un nombre");
    }
  };
  const handleOnBlur = (e) => {
    const { value } = e.target;
    validateName(value);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
    validateName(value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (
      name.trim().toLowerCase() === itemToDelete?.nombre.trim().toLowerCase() &&
      itemToDelete?.id?.length
    ) {
      if (section === "Categorías") {
        let isInOneCat = [];
        let subs = [];

        let categoryToDelete = categories.find(
          (category) => category._id === itemToDelete.id
        );

        if (categoryToDelete.subcategorias.length) {
          categories.forEach((item) => {
            if (item.subcategorias.length) {
              subs.push(...item.subcategorias);
            }
          });

          let subsCountMap = new Map();

          subs.forEach((item) => {
            subsCountMap.set(item._id, (subsCountMap.get(item._id) || 0) + 1);
          });

          categoryToDelete.subcategorias.forEach((subcat) => {
            if (subsCountMap.get(subcat._id) === 1) {
              isInOneCat.push(subcat);
            }
          });
        }

        if (isInOneCat.length) {
          isInOneCat.forEach((sub) => {
            dispatch(deleteSubCategoriesAction(sub._id));
            dispatch(deleteImgSubcategoriesAction({ id: sub.imagen[0] }));
          });
        }

        dispatch(deleteCategoriesAction(itemToDelete.id, token));
        dispatch(deleteImgCategoriesAction({ id: categoryToDelete.imagen[0] }));
      } else if (section.includes("Subcategorías")) {
        let isInMoreThanOneCat = categories.map((item) =>
          item.subcategorias.filter((item) => item._id === itemToDelete.id)
        );
        isInMoreThanOneCat = [
          ...isInMoreThanOneCat.filter((item) => item.length).flat(Infinity),
        ];

        /* dispatch(
          deleteCategoriesSubCategoryAction(
            {
              categoriaId: itemToDelete.categoriaId,
              subcategoriaId: itemToDelete.id,
            },
            token
          )
        ); */

        if (isInMoreThanOneCat.length === 1) {
          console.log(isInMoreThanOneCat);
          /* dispatch(deleteSubCategoriesAction(itemToDelete.id)); */
        }
      } else if (section === "Productos") {
        let productToDelete = products.filter(
          (item) => item._id === itemToDelete.id
        );
        dispatch(deleteProductAction(itemToDelete.id, token));
        productToDelete?.imagenes?.forEach((elem) =>
          dispatch(deleteImgProductsAction({ id: elem }))
        );
      }
      setItemToDelete({ nombre: "", id: "" });
    }
  };

  let deleteDisabled = !name.length || nameError.length ? true : false;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleDelete}>
        <h1
          className="text-2xl text-fontDark font-semibold mb-4 "
          style={{ userSelect: "none" }}
        >
          {`Eliminar ${itemToDelete?.nombre} de ${section}:`}
        </h1>
        <small
          className="h-auto text-lg text-fontDark w-full flex self-start mb-1 "
          style={{ userSelect: "none" }}
        >
          {`Para confirmar, ingrese ${itemToDelete?.nombre} en el campo de texto`}
        </small>
        <input
          type="text"
          className="border  rounded px-4 py-2 bg-fontDark text-white w-full  border-nav focus:border-nav
          focus:outline-none
          appearance-none"
          value={name}
          onBlur={handleOnBlur}
          onChange={handleChange}
        />
        {nameError.length ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {nameError}
          </small>
        ) : null}
        <button
          type="submit"
          className="bg-red-500 disabled:bg-red-500/70 text-white px-4 py-2 mt-2 rounded"
          disabled={deleteDisabled}
        >
          Eliminar
        </button>
      </form>
    </div>
  );
};
