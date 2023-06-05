import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="w-1/4 h-full p-5">
      <section className="flex flex-row items-center justify-start gap-4 py-6">
        <img
          src="/avatar.jpg"
          alt="user avatar"
          className="mask mask-circle w-10 h-10"
        />
        <span className="text-2xl text-fontDark font-semibold">Hola!</span>
      </section>
      <ul className="space-y-6 flex flex-col justify-center items-start text-lg">
        <li>
          <Link
            to="/admin/products"
            className="w-full py-2 px-4 font-medium focus:text-fontDark focus:border-l-4 focus:border-l-orange"
          >
            Productos
          </Link>
        </li>
        <li>
          <Link
            to="/admin/categories"
            className="w-full py-2 px-4 font-medium focus:text-fontDark focus:border-l-4 focus:border-l-orange"
          >
            Categorías
          </Link>
        </li>
        <li>
          <Link
            to="/admin/sales"
            className="w-full py-2 px-4 font-medium focus:text-fontDark focus:border-l-4 focus:border-l-orange"
          >
            Ventas
          </Link>
        </li>
        <li>
          <Link
            to="/admin/discounts"
            className="w-full py-2 px-4 font-medium focus:text-fontDark focus:border-l-4 focus:border-l-orange"
          >
            Descuentos
          </Link>
        </li>
        <li>
          <Link
            to="/admin/clients"
            className="w-full py-2 px-4 font-medium focus:text-fontDark focus:border-l-4 focus:border-l-orange"
          >
            Clientes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
