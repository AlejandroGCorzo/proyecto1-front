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
    <div className="w-full h-auto flex flex-row justify-start items-start md:justify-center md:items-center  max-h-max mt-[35%] sm:mt-[20%] md:mt-[14%] lg:mt-[8%] ">
      <div className=" max-w-[340px] sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl w-full xl:w-4/5 h-auto flex justify-between items-start ">
        <SideBar />
        <aside className="flex w-full justify-center items-center">
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
