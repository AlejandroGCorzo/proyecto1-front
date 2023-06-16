import Header from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer.jsx/Footer";
import UserDropdown from "./components/Header/UserDropdown";
import PanelHome from "./components/PanelAdmin/PanelHome";
import PrivateRoutes from "./utils/PrivateRoutes";
import ProductDetail from "./components/ProductDetail";
import { useEffect } from "react";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="flex flex-col w-full m-auto bg-grey">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<ProductDetail />} />
        <Route path="/login" element={<UserDropdown />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin/*" element={<PanelHome />} />
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
