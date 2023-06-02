import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { TbMapPinFilled } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import ShoppingCart from "./ShoppingCart";
import SearchBar from "./SearchMobile";
import Dropdown from "./Dropdown";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleShoppingCart = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {isOpen && (
        <ShoppingCart isOpen={isOpen} toggleShoppingCart={toggleShoppingCart} />
      )}
      {isSearchOpen && (
        <SearchBar
          isSearchOpen={isSearchOpen}
          toggleSearchBar={toggleSearchBar}
        />
      )}

      <header className="z-30 w-full  flex flex-col items-center justify-center max-[1026px]:fixed max-[1026px]:top-0 ">
        <section
          className="
     flex flex-row justify-between items-center h-16 w-full mx-auto border-b-[10px] border-grid bg-header"
        >
          <div className="flex flex-row text-white justify-between w-1/2 sm:w-1/3 lg:w-1/5 h-full pl-2">
            <button className="w-full h-full flex justify-center items-center focus:border-r focus:border-r-white">
              MARK
            </button>

            <button className="bg-grid w-full h-full flex justify-center items-center focus:border-x focus:border-x-white">
              GRID
            </button>

            <button className="w-full h-full flex justify-center items-center">
              dash
            </button>
          </div>
          <div className="text-white text-center text-xs font-semibold uppercase hidden lg:flex w-1/3 justify-end">
            <p>envío gratis a partir de $29.999 - 3 cuotas sin interés</p>
          </div>
          <div className="w-1/3 flex justify-end">
            <button className="text-white hidden lg:flex lg:pr-2 justify-center items-center">
              <TbMapPinFilled className="pr-2 text-grid" />
              Sucursales
            </button>
            <button
              className=" lg:hidden flex pr-6"
              onClick={toggleShoppingCart}
            >
              <FiShoppingCart color="white" fontSize={26} />
            </button>
          </div>
        </section>
        <nav className="h-full w-full bg-header flex flex-col items-center justify-center">
          <div className="p-3 w-full h-2/3 flex flex-row justify-between items-center">
            <div className="lg:hidden flex justify-start items-center w-1/3">
              <button
                className=" text-white  flex justify-center items-center"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-center items-center w-auto">
              <Link to={"/"}>
                <img
                  src="https://grid0.vtexassets.com/assets/vtex/assets-builder/grid0.theme/1.0.69/Img/Header/grid___3f6eaa5876e60f68a28d0f2f14c68944.svg"
                  alt="GRID icon"
                />
              </Link>
            </div>
            <div className="hidden lg:flex justify-end bg-nav w-[410px] pr-2">
              <input
                type="text"
                name="search"
                id="search"
                className="bg-nav text-white w-full p-2 border-nav focus:border-nav
              focus:outline-none
              appearance-none
              "
              />
              <button>
                <IoIosSearch color="white" fontSize={32} />
              </button>
            </div>
            <div className=" lg:flex hidden flex-row-reverse justify-between items-center ">
              <button className="pr-6 " onClick={toggleShoppingCart}>
                <FiShoppingCart color="white" fontSize={22} />
              </button>
              <UserDropdown />
            </div>
            <div
              className={`lg:hidden flex justify-end w-1/3 ${
                isSearchOpen ? "hidden" : "flex"
              }`}
            >
              <button onClick={toggleSearchBar}>
                <IoIosSearch color="white" fontSize={32} />
              </button>
            </div>
          </div>
          <div
            className="bg-nav text-white text-center text-xs font-semibold uppercase flex flex-col w-full h-auto justify-center lg:justify-between items-center py-2 lg:py-4 lg:px-20"
            style={{ fontSize: "16px" }}
          >
            <div className="hidden lg:flex flex-row justify-between items-center w-full pb-2">
              <button className="transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid hover:text-grid focus:text-grid">
                new in
              </button>
              <button
                onClick={toggleDropdown}
                className="transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid hover:text-grid focus:text-grid"
              >
                tus favoritos
              </button>
              <button
                onClick={toggleDropdown}
                className="transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid hover:text-grid focus:text-grid"
              >
                hombre
              </button>
              <button
                onClick={toggleDropdown}
                className="transition-all easy-in-out pb-1 uppercase hover:border-b hover:border-b-grid hover:text-grid focus:text-grid"
              >
                mujer
              </button>
              <button
                onClick={toggleDropdown}
                className="transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid hover:text-grid focus:text-grid"
              >
                niños
              </button>
              <button
                onClick={toggleDropdown}
                className="transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid hover:text-grid focus:text-grid"
              >
                marcas
              </button>
              <button className="transition-all ease-in-out pb-1 uppercase hover:border-b hover:border-b-grid hover:text-grid focus:text-grid ">
                sale
              </button>
            </div>
            <p className="lg:hidden block">envío gratis a partir de $29.999</p>
          </div>
        </nav>

        {isDropdownOpen && (
          <Dropdown
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
          />
        )}
        {navbar && (
          <div className="overflow-y-auto relative top-0 right-0 h-[100vh] w-full bg-nav bg-opacity-20 flex items-start justify-start ">
            <div className="bg-header text-white h-auto w-1/2 sm:w-1/3 p-4 ease-in-out transform transition-transform duration-300 delay-150 ">
              <div className=" text-xl font-medium flex justify-center items-center overflow-y-auto">
                <button>NEW IN</button>
              </div>
              <div className="collapse collapse-arrow ">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium ">TITLE</div>
                <div className="collapse-content">
                  <ul>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 1
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 2
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 3
                    </li>
                  </ul>
                </div>
              </div>
              <div className="collapse collapse-arrow">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">TITLE</div>
                <div className="collapse-content">
                  <ul>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 1
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 2
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 3
                    </li>
                  </ul>
                </div>
              </div>
              <div className="collapse collapse-arrow focus:bg-grid">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium ">TITLE</div>
                <div className="collapse-content">
                  <ul>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 1
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 2
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 3
                    </li>
                  </ul>
                </div>
              </div>
              <div className="collapse collapse-arrow">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium ">TITLE</div>
                <div className="collapse-content">
                  <ul>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 1
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 2
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 3
                    </li>
                  </ul>
                </div>
              </div>
              <div className="collapse collapse-arrow focus:bg-grid">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium ">TITLE</div>
                <div className="collapse-content">
                  <ul>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 1
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 2
                    </li>
                    <li className="px-4 py-1 hover:border-b hover:border-b-white text-white">
                      Opción 3
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-xl font-medium flex justify-center items-center pb-4">
                <span>SALE</span>
              </div>
              <Link
                to={isLoggedIn ? "/" : "/login"}
                onClick={() => setNavbar(false)}
              >
                <div className="text-xl font-medium flex justify-center items-center ">
                  <FaRegUser color="white" fontSize={20} className="pr-2" />{" "}
                  <span>INGRESAR</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
