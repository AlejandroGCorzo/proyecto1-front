import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
const Footer = () => {
  return (
    <div className="w-full h-full mt-20 text-fontGrey text-sm">
      <div className="h-[420px] flex flex-col justify-center items-center ">
        <div className="w-full h-36 bg-grid flex flex-row justify-center items-center">
          <div className="w-1/2 flex flex-row justify-between items-center">
            <div className="uppercase font-semibold text-nav text-lg w-1/3">
              <p>suscribite al newsletter</p>
            </div>
            <form className="w-1/3 flex justify-center">
              <input
                type="email"
                name="email"
                id="newsletter"
                placeholder="Ingresá tu E-mail"
                className="w-2/3 h-10 rounded-tl rounded-bl p-4 bg-grey text-nav border-none focus:border-none
                focus:outline-none
                appearance-none"
              />
              <button
                type="submit"
                className="bg-nav w-1/3 rounded-tr rounded-br uppercase font-semibold text-base"
              >
                Enviar
              </button>
            </form>
            <div className="flex flex-row justify-center items-center w-1/3 gap-4">
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
        <div className=" w-full h-56 py-11 flex justify-evenly items-center bg-nav">
          <div className="flex flex-row w-[585px] h-[140px] justify-between items-start gap-4">
            <div className="flex flex-col gap-3">
              <a href="#" target="_blank" className="hover:underline">
                Quienes somos
              </a>
              <a href="#" target="_blank" className="hover:underline">
                Preguntas frecuentes
              </a>
              <a href="#" target="_blank" className="hover:underline">
                Sucursales
              </a>
              <a href="#" target="_blank" className="hover:underline">
                Formas de pago
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" target="_blank" className="hover:underline">
                Términos y condiciones
              </a>
              <a href="#" target="_blank" className="hover:underline">
                Políticas de cambios
              </a>
              <a href="#" target="_blank" className="hover:underline">
                Defensa del consumidor
              </a>
              <a href="#" target="_blank" className="hover:underline">
                Políticas de envíos
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" target="_blank" className="hover:underline">
                Retiro en sucursal en 24 hs
              </a>
            </div>
          </div>
          <a
            href="https://wa.me/5491133130958/?text=Hola, quisiera cancelar mi compra..."
            target="_blank"
            className="border py-2 px-4 self-end rounded uppercase"
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
