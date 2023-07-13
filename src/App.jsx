import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import UserDropdown from "./components/Header/UserDropdown";
import PanelHome from "./components/PanelAdmin/PanelHome";
import PrivateRoutes from "./utils/PrivateRoutes";
import Profile from "./components/Session/Profile";
import ProductDetail from "./components/ProductDetail";
import { useEffect } from "react";
import FilterProducts from "./components/Home/FilterProducts";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "./redux/productActions";
import {
  getCategoriesAction,
  getSubCategoriesAction,
} from "./redux/categoriesActions";
import ShoppingCartPage from "./components/Home/ShoppingCartPage";
import WishList from "./components/WishList/WishList";
import CheckoutForm from "./components/Checkout/CheckoutForm";
import SuccessComponent from "./utils/SuccessPage";
import ErrorComponent from "./utils/FailurePage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { setProductsCartAction } from "./redux/shoppingCartActions";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  const { isLoggedIn, userId } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);
  const { productos, isFacturaA, tipoDePago, envio } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const getProducts = () => {
      dispatch(getProductsAction());
      dispatch(getCategoriesAction());
      dispatch(getSubCategoriesAction());
    };
    getProducts();
  }, []);
  useEffect(() => {
    if (productos?.length && products?.length) {
      let productsWithStock = products
        .filter((prod) => prod.stock > 0)
        .map((prod) => prod._id);

      let productsToAdd = productos.filter((elem) =>
        productsWithStock.includes(elem.producto)
      );
      let productsToIgnore = productos.filter(
        (elem) => !productsWithStock.includes(elem.producto)
      );
      dispatch(
        setProductsCartAction({
          productosDisponibles: productsToAdd,
          productosNoDisponibles: productsToIgnore,
        })
      );
    }
  }, [productos, products]);

  return (
    <div className="flex flex-col w-full m-auto bg-grey">
      <Header />
      <div className="mt-[25%] sm:mt-[17%] md:mt-[13%] lg:mt-[14%] 2xl:mt-[8%] ">
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products/:filter" element={<FilterProducts />} />
          {/* <Route path="/login" element={<UserDropdown />} /> */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<ShoppingCartPage />} />
          <Route path="/checkout/form" element={<CheckoutForm />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout/success" element={<SuccessComponent />} />
          <Route path="/checkout/failure" element={<ErrorComponent />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/admin/*" element={<PanelHome />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
          {/*  <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
      <Footer />
      <a href="https://wa.me/5491133130958/?text=Hola" target="_blank">
        <img
          src="/whatsappicon.png"
          alt="Logo WhatsApp"
          width={40}
          height={40}
          className="fixed bottom-16 right-10 hover:w-[52px] hover:transition-all z-10 drop-shadow-lg rounded-full"
        />
      </a>
    </div>
  );
}

export default App;
