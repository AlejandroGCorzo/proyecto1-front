import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Routes, Route, Outlet } from "react-router-dom";
import ProductForm from "./Product/ProductForm";
import Clients from "./Clients/Clients";
import Sales from "./Sales/Sales";
import Discounts from "./Discount/Discounts";
import Categories from "./Category/Categories";
import Products from "./Product/Products";
import CategoriesForm from "./Category/CategoriesForm";

const PanelHome = () => {
  return (
    <div className="w-full h-auto min-h-[450px] flex flex-row justify-start items-start lg:justify-center   max-h-max bg-grey mt-10 lg:mt-5">
      <div className=" max-w-[340px] sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl w-full xl:w-4/5 h-auto flex justify-between items-start  ">
        <SideBar />
        <aside className="flex w-full justify-center items-center p-4 ">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/products/form" element={<ProductForm />} />
            <Route path="/products/form/:id" element={<ProductForm />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/form/:id" element={<CategoriesForm />} />
            <Route path="/categories/form" element={<CategoriesForm />} />
          </Routes>
        </aside>
      </div>
    </div>
  );
};

export default PanelHome;
