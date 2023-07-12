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
import useClickOutside from "../../hooks/useClickOutside";
import useViewport from "../../hooks/useViewport";
import { BsList } from "react-icons/bs";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const modalRef = useRef(null);
  const { viewportSize } = useViewport();
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
  const refSearch = useClickOutside(() => setShowItems(false));

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

  const toggleModal = (e) => {
    modalRef?.current?.classList?.toggle("modal-open");
    document.activeElement.blur();
  };

  const conditionShoppingCart =
    location.pathname !== "/checkout" &&
    location.pathname !== "/checkout/success" &&
    location.pathname !== "/checkout/failure" &&
    location.pathname !== "/checkout/form"
      ? true
      : false;

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
                  {viewportSize.width < 1026 && conditionShoppingCart ? (
                    <ShoppingCartPreview />
                  ) : null}
                  <Link
                    to={"/wishlist"}
                    className="px-3 pt-1 flex items-center"
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
                <div className="drawer lg:hidden w-1/2">
                  <input
                    id="my-drawer-3"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content transition-all">
                    <label
                      htmlFor="my-drawer-3"
                      className="drawer-button p-2 rounded-lg flex justify-between lg:justify-center items-center lg:max-w-max w-ful text-white font-normal whitespace-nowrap text-lg"
                    >
                      <BsList fontSize={44} fontWeight={700} />
                    </label>
                  </div>

                  <div className="drawer-side z-[9999] ">
                    <label
                      htmlFor="my-drawer-3"
                      className="drawer-overlay"
                    ></label>
                    <ul className="mt-[155px] w-2/3 sm:w-2/4 h-auto max-h-screen bg-header text-white p-0 overflow-y-auto ">
                      <Link
                        to={"/products/:filter"}
                        id={"nuevo"}
                        className="text-xl font-medium flex justify-center items-center my-2 w-full "
                        onClick={(e) => {
                          dispatch(orderProductsAction(e.target.id));
                          setNavbar(false);
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        NEW IN
                      </Link>

                      <Link
                        to={"/products/:filter"}
                        className="text-xl w-full font-medium flex justify-center items-center pb-4 "
                        id={"descuento"}
                        onClick={(e) => {
                          dispatch(orderProductsAction(e.target.id));
                          setNavbar(false);
                          document.getElementById(
                            "my-drawer-3"
                          ).checked = false;
                        }}
                      >
                        SALE
                      </Link>
                    </ul>
                  </div>
                </div>
                {/* <div
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
 */}
                <div className="flex w-full flex-row bg-header justify-end items-center py-2 px-3">
                  <div
                    ref={refSearch}
                    className="hidden lg:flex justify-between items-center bg-nav w-[410px] md:w-full md:max-w-sm 2xl:max-w-md 3xl:max-w-lg pr-2"
                  >
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
                        showItems={showItems}
                        setShowItems={setShowItems}
                        error={errorSearch}
                        debouncedSearchValue={debouncedSearchValue}
                        setNavbar={setNavbar}
                        setSearchValue={setSearchValue}
                      />
                    )}
                  </div>
                  <div className=" lg:flex hidden flex-row-reverse items-center w-[37%] pr-8 ">
                    {viewportSize.width >= 1026 && conditionShoppingCart ? (
                      <ShoppingCartPreview />
                    ) : null}

                    {/*  <UserDropdown
                      toggleDropdownUser={toggleDropdownUser}
                      dropdownUserRef={dropdownUserRef}
                    /> */}
                    <Link to={"/wishlist"} className="px-4 flex">
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

                <div className={`lg:hidden flex justify-center w-auto px-2 `}>
                  <button
                    onClick={toggleModal}
                    className="focus:outline-none focus-visible:outline-none"
                  >
                    <IoIosSearch color="white" fontSize={32} />
                  </button>
                  <dialog
                    ref={modalRef}
                    id="my_modal_2"
                    className="modal transition-all justify-center items-start w-full bg-header/40"
                  >
                    <form
                      method="dialog"
                      className=" modal-box mt-20 p-0 h-max w-2/3 rounded-none max-h-max max-w-full overflow-visible"
                    >
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
                        toggleModal={toggleModal}
                      />
                    </form>
                    <button
                      className="modal-backdrop w-screen"
                      onClick={toggleModal}
                      type="button"
                    ></button>
                  </dialog>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div
          className="bg-nav text-white text-center text-xs font-semibold uppercase flex-col w-full h-10 justify-center lg:justify-between items-center py-2 lg:py-3 lg:px-20 hidden lg:flex "
          style={{ fontSize: "16px" }}
        >
          <div className="hidden lg:flex flex-row justify-end items-center w-72 gap-6">
            <Link
              to={"products/:filter"}
              className="transition-all ease-in-out uppercase border-b border-b-transparent  hover:border-b-yellow hover:text-yellow focus:text-yellow flex items-center "
              name={"nuevo"}
              onClick={(e) => dispatch(orderProductsAction(e.target.name))}
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
              to={"/products/:filter"}
              className="transition-all ease-in-out uppercase border-b border-b-transparent hover:border-b-yellow hover:text-yellow focus:text-yellow "
              name={"descuento"}
              onClick={(e) => dispatch(orderProductsAction(e.target.name))}
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
        {/* {navbar && (
          <div className=" relative top-0 right-0  h-screen w-full bg-nav bg-opacity-20 flex items-start justify-start">
            <div className="bg-header text-white max-h-[430px] w-1/2 sm:w-1/3 p-4 ease-in-out transform transition-transform duration-300 delay-150 overflow-y-scroll">
              <div className=" text-xl font-medium flex justify-center items-center mb-2">
                <Link
                  to={"/products/:filter"}
                  id={"nuevo"}
                  onClick={(e) => {
                    dispatch(orderProductsAction(e.target.id));
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
                to={"/products/:filter"}
                className="text-xl font-medium flex justify-center items-center pb-4 "
                id={"descuento"}
                onClick={(e) => {
                  dispatch(orderProductsAction(e.target.id));
                  setNavbar(false);
                }}
              >
                <span>SALE</span>
              </Link> */}
        {/* 
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
                      to={isLoggedIn ? "/profile" : "/login"}
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
              </div> */}
        {/*   </div>
          </div>
        )} */}
      </header>
    </>
  );
};

export default Header;
