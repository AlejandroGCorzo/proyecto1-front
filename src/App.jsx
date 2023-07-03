import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer.jsx/Footer";
import UserDropdown from "./components/Header/UserDropdown";
import PanelHome from "./components/PanelAdmin/PanelHome";
import PrivateRoutes from "./utils/PrivateRoutes";
import Profile from "./components/Session/Profile";
import ProductDetail from "./components/ProductDetail";
import { useEffect } from "react";
import FilterProducts from "./components/Home/FilterProducts";
import { useDispatch } from "react-redux";
import { getProductsAction } from "./redux/productActions";
import {
  getCategoriesAction,
  getSubCategoriesAction,
} from "./redux/categoriesActions";
import ShoppingCartPage from "./components/Home/ShoppingCartPage";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getProducts = () => {
      dispatch(getProductsAction());
      dispatch(getCategoriesAction());
      dispatch(getSubCategoriesAction());
    };
    getProducts();
  }, []);

  return (
    <div className="flex flex-col w-full m-auto bg-grey">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:filter" element={<FilterProducts />} />
        <Route path="/login" element={<UserDropdown />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<ShoppingCartPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin/*" element={<PanelHome />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
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
