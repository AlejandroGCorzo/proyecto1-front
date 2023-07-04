import React, { useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    function handleResize() {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="lg:hidden w-max ">
        <button onClick={() => setNavbar(!navbar)} className="p-4 text-header">
          <AiOutlineMenuUnfold fontSize={36} />
        </button>
        <nav
          className={`fixed flex flex-col top-32 left-0 h-full bg-white p-2 transition-transform duration-200 ease-in-out transform w-60  min-w-[150px] z-10 ${
            navbar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setNavbar(!navbar)}
            className="p-4 text-header flex self-end justify-end"
          >
            {navbar && <MdOutlineClose fontSize={36} />}
          </button>
          <section className="lg:hidden flex flex-row items-center justify-center gap-4 py-2">
            <img
              src="/avatar.jpg"
              alt="user avatar"
              className="mask mask-circle w-10 h-10"
            />
            <span className="text-2xl text-header font-semibold">Hola!</span>
          </section>
          <ul className="lg:hidden space-y-6 flex flex-col justify-center items-center text-lg pt-2">
            <li>
              <Link
                to="/admin/products"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Categorías
              </Link>
            </li>

            <li>
              <Link
                to="/admin/sales"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Ventas
              </Link>
            </li>
            <li>
              <Link
                to="/admin/discounts"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Descuentos
              </Link>
            </li>
            <li>
              <Link
                to="/admin/clients"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Clientes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden lg:block">
        <nav className={`h-full bg-grey w-1/4 p-5 min-w-[150px]`}>
          <section className=" flex flex-row items-center justify-start gap-4 py-6">
            <img
              src="/avatar.jpg"
              alt="user avatar"
              className="mask mask-circle w-10 h-10"
            />
            <span className="text-2xl text-header font-semibold">Hola!</span>
          </section>
          <ul className=" space-y-6 flex flex-col justify-center items-start text-lg pt-2">
            <li>
              <Link
                to="/admin/products"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Categorías
              </Link>
            </li>

            <li>
              <Link
                to="/admin/sales"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Ventas
              </Link>
            </li>
            <li>
              <Link
                to="/admin/discounts"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Descuentos
              </Link>
            </li>
            <li>
              <Link
                to="/admin/clients"
                className="w-full py-2 px-4 font-medium focus:text-header focus:border-l-4 focus:border-l-yellow"
              >
                Clientes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
