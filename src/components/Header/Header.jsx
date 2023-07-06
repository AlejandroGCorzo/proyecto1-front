import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { TbMapPinFilled } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import ShoppingCartPreview from "./ShoppingCartPreview";
import SearchBar from "./SearchMobile";
import Dropdown from "./Dropdown";
import UserDropdown from "./UserDropdown";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import useDebounce from "../../hooks/useDebounce";
import {
  filterProductsAction,
  orderProductsAction,
  searchProductsAction,
} from "../../redux/productActions";
import {
  setErrorSearchProduct,
  setSearchProducts,
} from "../../redux/productSlice";
import SearchItems from "../../utils/SearchItems";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const dropdownUserRef = useRef(null);
  const { isLoggedIn, userRole } = useSelector((state) => state.users);
  const { products, loading, errorSearch } = useSelector(
    (state) => state.products
  );
  const { wishedProducts } = useSelector((state) => state.wishlist);
  const { productos } = useSelector((state) => state.cart);
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showItems, setShowItems] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    const searchProducts = () => {
      if (debouncedSearchValue?.length) {
        setShowItems(true);
        if (errorSearch.length) {
          dispatch(setErrorSearchProduct(""));
        }
        dispatch(searchProductsAction(debouncedSearchValue));
      } else {
        if (errorSearch.length) {
          dispatch(setErrorSearchProduct(""));
        }

        dispatch(setSearchProducts(""));

        setShowItems(false);
      }
    };
    searchProducts();
  }, [debouncedSearchValue]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleShoppingCart = () => {
    if (location.pathname !== "/checkout") {
      setIsOpen(!isOpen);
    }
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleWishList = () => {
    if (!isLoggedIn) {
      toggleDropdownUser();
    } else {
      return;
    }
  };

  const toggleDropdownUser = () => {
    dropdownUserRef.current.classList.toggle("dropdown-open");
    document.activeElement.blur();
  };

  return (
    <>
      {isOpen && (
        <ShoppingCartPreview
          isOpen={isOpen}
          toggleShoppingCart={toggleShoppingCart}
        />
      )}
      {isSearchOpen && (
        <SearchBar
          isSearchOpen={isSearchOpen}
          toggleSearchBar={toggleSearchBar}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          error={errorSearch}
          setShowItems={setShowItems}
          showItems={showItems}
          setNavbar={setNavbar}
          setIsSearchOpen={setIsSearchOpen}
          debouncedSearchValue={debouncedSearchValue}
        />
      )}

      <header className="z-[999] w-full flex flex-col items-start justify-center fixed top-0 h-auto">
        <div className="flex flex-row w-full bg-header justify-center items-center">
          <div
            className={`${
              isSearchOpen ? "hidden" : "flex"
            } justify-center items-center bg-header w-[20%] sm:w-[15%] h-full `}
          >
            <Link to={"/"}>
              <img
                src="/reyesdeloestelogo_edited.png"
                alt="Reyes del Oeste icono"
                className="w-24"
              />
            </Link>
          </div>
          <div className="flex flex-col w-full h-full">
            <section
              className="
     flex flex-row justify-end lg:justify-center items-center h-16 w-full mx-auto border-b-[10px] border-yellow bg-header "
            >
              <div className="text-white text-center text-xs font-semibold uppercase hidden lg:flex w-[88%] justify-center">
                <p>envío gratis a partir de $29.999 - 3 cuotas sin interés</p>
              </div>
              <div className="w-auto flex justify-center items-center">
                <button className="text-white hidden lg:flex justify-center items-center ">
                  <TbMapPinFilled className=" text-yellow text-xl" />
                  Sucursales
                </button>
                <div className="w-auto flex justify-center items-center lg:hidden pr-4 ">
                  <div className="lg:hidden indicator ">
                    {productos?.length > 0 && (
                      <span className="indicator-item badge badge-warning -left-1">
                        {productos?.length}
                      </span>
                    )}
                    <button
                      className=" lg:hidden flex pr-2"
                      onClick={toggleShoppingCart}
                    >
                      <FiShoppingCart color="white" fontSize={26} />
                    </button>
                  </div>
                  <Link
                    to={isLoggedIn ? "/wishlist" : "/login"}
                    className="px-3 pt-1"
                  >
                    <div className="indicator">
                      {wishedProducts?.length > 0 && (
                        <span className="indicator-item badge badge-warning -left-1">
                          {wishedProducts.length}
                        </span>
                      )}

                      <MdOutlineFavoriteBorder color="white" fontSize={24} />
                    </div>
                  </Link>
                </div>
              </div>
            </section>
            <nav className="h-full w-full  bg-header flex flex-col items-center justify-center">
              <div className=" w-full h-2/3 flex flex-row justify-between  items-center ">
                <div
                  className={`lg:hidden flex justify-center items-center w-auto px-2`}
                >
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

                <div className="flex w-full flex-row bg-header justify-end items-center py-2 px-3">
                  <div className="hidden lg:flex justify-between bg-nav w-[410px] md:w-[390px] 2xl:w-1/3 pr-2">
                    <input
                      autoComplete="off"
                      type="text"
                      name="search"
                      id="search"
                      className="bg-nav text-white w-full p-2 border-nav focus:border-nav
              focus:outline-none
              appearance-none
              "
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />

                    {!searchValue.length ? (
                      <button>
                        <IoIosSearch color="white" fontSize={32} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSearchValue("");
                          setShowItems(false);
                        }}
                        className="p-1 text-white text-xl"
                      >
                        X
                      </button>
                    )}
                    {showItems && (
                      <SearchItems
                        setShowItems={setShowItems}
                        error={errorSearch}
                        debouncedSearchValue={debouncedSearchValue}
                        setNavbar={setNavbar}
                        setSearchValue={setSearchValue}
                      />
                    )}
                  </div>
                  <div className=" lg:flex hidden flex-row-reverse items-center w-[35%] ">
                    <div className="indicator">
                      {productos.length > 0 && (
                        <span className="indicator-item badge badge-warning -left-1">
                          {productos.length}
                        </span>
                      )}
                      <button onClick={toggleShoppingCart} className="px-5">
                        <FiShoppingCart color="white" fontSize={22} />
                      </button>
                    </div>

                    <UserDropdown
                      toggleDropdownUser={toggleDropdownUser}
                      dropdownUserRef={dropdownUserRef}
                    />
                    <Link
                      to={isLoggedIn ? "/wishlist" : "/"}
                      onClick={handleWishList}
                      className="px-4 flex"
                    >
                      <div className="indicator">
                        {wishedProducts?.length > 0 && (
                          <span className="indicator-item badge badge-warning -left-1">
                            {wishedProducts?.length}
                          </span>
                        )}
                        <MdOutlineFavoriteBorder color="white" fontSize={24} />
                      </div>
                    </Link>
                  </div>
                </div>

                <div
                  className={`lg:hidden flex justify-center w-auto px-2 ${
                    isSearchOpen ? "hidden" : "flex"
                  }`}
                >
                  <button onClick={toggleSearchBar}>
                    <IoIosSearch color="white" fontSize={32} />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div
          className="bg-nav text-white text-center text-xs font-semibold uppercase flex-col w-full h-10 justify-center lg:justify-between items-center py-2 lg:py-3 lg:px-20 hidden lg:flex "
          style={{ fontSize: "16px" }}
        >
          <div className="hidden lg:flex flex-row justify-center items-center w-full gap-6">
            <Link
              to={"/:filter"}
              className="transition-all ease-in-out uppercase border-b border-b-transparent  hover:border-b-yellow hover:text-yellow focus:text-yellow flex items-center "
              value={"nuevo"}
              onClick={(e) => dispatch(orderProductsAction(e.target.value))}
            >
              new in
            </Link>
            <button
              onClick={toggleDropdown}
              className="transition-all ease-in-out uppercase hover:border-b hover:border-b-yellow hover:text-yellow focus:text-yellow flex items-center lg:hidden"
            >
              tus favoritos
            </button>
            <button
              onClick={toggleDropdown}
              className="transition-all ease-in-out uppercase hover:border-b hover:border-b-yellow hover:text-yellow focus:text-yellow flex items-center lg:hidden"
            >
              hombre
            </button>
            <button
              onClick={toggleDropdown}
              className="transition-all easy-in-out pb-1 uppercase hover:border-b hover:border-b-yellow hover:text-yellow focus:text-yellow lg:hidden"
            >
              mujer
            </button>
            <button
              onClick={toggleDropdown}
              className="transition-all ease-in-out uppercase hover:border-b hover:border-b-yellow hover:text-yellow focus:text-yellow flex items-center lg:hidden"
            >
              niños
            </button>
            <button
              onClick={toggleDropdown}
              className="transition-all ease-in-out uppercase hover:border-b hover:border-b-yellow hover:text-yellow focus:text-yellow flex items-center lg:hidden"
            >
              marcas
            </button>
            <Link
              to={"/:filter"}
              className="transition-all ease-in-out uppercase border-b border-b-transparent hover:border-b-yellow hover:text-yellow focus:text-yellow "
              value={"descuento"}
              onClick={(e) => dispatch(orderProductsAction(e.target.value))}
            >
              sale
            </Link>
          </div>
        </div>
        <div className="lg:hidden flex bg-nav w-full justify-center items-center text-white text-xs uppercase py-2 font-medium">
          <p>envío gratis a partir de $29.999</p>
        </div>

        {isDropdownOpen && (
          <Dropdown
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
          />
        )}
        {navbar && (
          <div className=" relative top-0 right-0  h-screen w-full bg-nav bg-opacity-20 flex items-start justify-start">
            <div className="bg-header text-white max-h-[430px] w-1/2 sm:w-1/3 p-4 ease-in-out transform transition-transform duration-300 delay-150 overflow-y-scroll">
              <div className=" text-xl font-medium flex justify-center items-center mb-2">
                <Link
                  to={"/:filter"}
                  value={"nuevo"}
                  onClick={(e) => {
                    dispatch(orderProductsAction(e.target.value));
                    setNavbar(false);
                  }}
                >
                  NEW IN
                </Link>
              </div>
              <div className="collapse collapse-arrow hidden">
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
              <div className="collapse collapse-arrow hidden">
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
              <div className="collapse collapse-arrow focus:bg-yellow hidden">
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
              <div className="collapse collapse-arrow hidden">
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
              <div className="collapse collapse-arrow focus:bg-yellow hidden">
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
              <Link
                to={"/:filter"}
                className="text-xl font-medium flex justify-center items-center pb-4"
                value={"descuento"}
                onClick={(e) => {
                  dispatch(orderProductsAction(e.target.value));
                  setNavbar(false);
                }}
              >
                <span>SALE</span>
              </Link>

              <div className="text-xl font-medium flex justify-center items-center ">
                {!isLoggedIn ? (
                  <Link
                    to={isLoggedIn ? "/" : "/login"}
                    onClick={() => setNavbar(false)}
                    className="w-full flex justify-center items-center flex-row"
                  >
                    <FaRegUser color="white" fontSize={20} className="pr-2" />
                    <span>INGRESAR</span>
                  </Link>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <Link
                      to={isLoggedIn ? "/" : "/login"}
                      onClick={() => setNavbar(false)}
                    >
                      <div className="flex flex-row pb-2">
                        <FaRegUser
                          color="white"
                          fontSize={20}
                          className="pr-2 flex self-center"
                        />
                        <span>MI PERFIL</span>
                      </div>
                    </Link>
                    {userRole.includes("ADMIN") && (
                      <Link
                        to="/admin/products"
                        onClick={() => setNavbar(!navbar)}
                      >
                        <span>PANEL ADMIN</span>
                      </Link>
                    )}
                    <button
                      className={userRole.includes("ADMIN") ? "pt-2" : pt - 0}
                      onClick={() => {
                        dispatch(logout());
                        setNavbar(!navbar);
                      }}
                    >
                      SALIR
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
