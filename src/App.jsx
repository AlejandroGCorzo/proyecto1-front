import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer.jsx/Footer";
import UserDropdown from "./components/Header/UserDropdown";

function App() {
  return (
    <div className="flex flex-col w-full h-auto bg-grey">
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={UserDropdown} />
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
