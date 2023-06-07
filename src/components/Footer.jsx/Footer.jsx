import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import FooterOptions from "./FooterOptions";
const Footer = () => {
  return (
    <div className="w-full h-auto mt-10 lg:mt-18 text-fontGrey text-sm self-end justify-end flex bg-header">
      <div className="h-auto lg:h-[420px] w-full flex flex-col justify-end items-center">
        <div className="w-full h-auto lg:h-36 bg-grid flex flex-row justify-center items-center py-2">
          <div className="h-full w-3/4 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 lg:gap-0">
            <div className="uppercase font-semibold text-nav text-lg w-full lg:w-1/3 flex justify-center">
              <p>suscribite al newsletter</p>
            </div>
            <form className="w-full md:w-2/3 lg:w-1/3 flex justify-center">
              <input
                type="email"
                name="email"
                id="newsletter"
                placeholder="Ingresá tu E-mail"
                className="w-3/4 md:w-2/3 h-10 rounded-tl rounded-bl p-4 bg-grey text-nav border-none focus:border-none
                focus:outline-none
                appearance-none"
              />
              <button
                type="submit"
                className="bg-header w-1/4 md:w-1/3 rounded-tr rounded-br uppercase font-semibold text-base"
              >
                Enviar
              </button>
            </form>
            <div className="flex flex-row justify-center items-center w-full lg:w-1/4 gap-4">
              <img
                src="https://grid0.vtexassets.com/assets/vtex/assets-builder/grid0.theme/1.0.73/Img/Header/grid-small___04d11d3aa7baa9d8d3abf8fa29402b11.svg"
                alt="GRID icon"
                className=""
              />
              <FaFacebookF className="text-header text-xl" />
              <GrInstagram className="text-header text-xl" />
            </div>
          </div>
        </div>
        <div className=" w-full h-auto lg:h-56 lg:py-11 flex flex-col lg:flex-row justify-end lg:justify-evenly items-center bg-nav">
          <FooterOptions />
          <a
            href="https://wa.me/5491133130958/?text=Hola, quisiera cancelar mi compra..."
            target="_blank"
            className="text-base flex items-center border-b border-b-white h-12 w-full bg-header lg:h-auto lg:bg-nav lg:w-auto lg:border py-2 px-4 lg:self-end lg:rounded lg:uppercase"
          >
            Arrepentimiento de compra
          </a>
        </div>
        <div className=" w-full h-14 flex justify-center items-center bg-header">
          Copyright
        </div>
      </div>
    </div>
  );
};

export default Footer;
