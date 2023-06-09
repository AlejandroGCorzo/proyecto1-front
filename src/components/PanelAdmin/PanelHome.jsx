import React from "react";
import SideBar from "./SideBar";
import { Routes, Route } from "react-router-dom";
import ProductForm from "./Product/ProductForm";
import Clients from "./Clients/Clients";
import Sales from "./Sales/Sales";
import Discounts from "./Discount/Discounts";
import Categories from "./Category/Categories";
import Products from "./Product/Products";
import CategoriesForm from "./Category/CategoriesForm";
import SubCategoriesForm from "./Category/SubCategoriesForm";

const PanelHome = () => {
  return (
    <div className="w-full h-auto flex flex-row justify-center items-center mt-[38%] sm:mt-[21%] md:max-lg:mt-[15.5%] lg:mt-0">
      <div className="w-full xl:w-3/4 h-auto flex">
        <SideBar />
        <aside className="flex w-full justify-center items-center">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/products/form" element={<ProductForm />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/form" element={<CategoriesForm />} />
            <Route
              path="/categories/subcategories-form"
              element={<SubCategoriesForm />}
            />
          </Routes>
        </aside>
      </div>
    </div>
  );
};

export default PanelHome;
