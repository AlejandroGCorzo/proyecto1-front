import { Link, useRouteError } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function ErrorPage() {
  return (
    <>
      <div
        id="error-page"
        className="flex flex-col justify-center items-center w-full min-h-[450px] sm:min-h-[650px] md:min-h-[450px] gap-4 text-lg text-nav"
      >
        <h1>Oops!</h1>
        <p>Ocurrió un error inesperado.</p>
        <p>
          <i>La dirección a la que intenta acceder no existe.</i>
        </p>
        <Link
          to="/"
          className="w-96 text-center border border-header bg-yellow/70  text-header font-semibold py-1 px-4 rounded text-lg hover:text-header transition-all mt-6"
        >
          Volver al Inicio
        </Link>
      </div>
    </>
  );
}
