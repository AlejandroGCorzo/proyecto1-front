import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import useViewport from "../../hooks/useViewport";

const FooterOptions = () => {
  const collapseRefs = useRef([]);
  const [moreInfo, setMoreInfo] = useState(false);
  const { viewportSize } = useViewport();

  const toggleCollapse = (index) => {
    const targetCollapse = collapseRefs.current[index];
    targetCollapse.classList.toggle("collapse-open");
    document.activeElement.blur();
  };

  return (
    <>
      {viewportSize.width < 1026 ? (
        <>
          <div
            className="h-10 w-full bg-grey text-header font-semibold text-base flex justify-center items-center"
            onClick={() => setMoreInfo(!moreInfo)}
          >
            <span className="px-2 w-2/3 text-center">Más información</span>
            {moreInfo ? (
              <button>
                {" "}
                <MdKeyboardArrowRight />
              </button>
            ) : (
              <button>
                <MdKeyboardArrowDown />
              </button>
            )}
          </div>
          {moreInfo && (
            <div className="join join-vertical w-full">
              <div
                ref={(element) => (collapseRefs.current[0] = element)}
                className="collapse collapse-arrow join-item"
                onClick={() => toggleCollapse(0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleCollapse(0);
                  }
                }}
              >
                <div className="collapse-title text-lg border-t border-t-white rounded-none">
                  grid
                </div>
                <div className="collapse-content rounded-none flex flex-col justify-start items-start bg-grey text-nav text-base px-0 pb-0">
                  <a
                    href="#"
                    target="_blank"
                    className="h-auto flex justify-center items-center  py-4 px-3"
                  >
                    Quienes somos
                  </a>
                  <span className="border border-white w-full"></span>
                  <a
                    href="#"
                    target="_blank"
                    className="h-auto flex justify-center items-center px-3 py-4"
                  >
                    Sucursales
                  </a>
                  <span className="border border-white w-full"></span>
                  <a
                    href="#"
                    target="_blank"
                    className="h-auto flex justify-center items-center px-3 py-4"
                  >
                    Retiro en sucursal en 24 hs
                  </a>
                </div>
              </div>
              <div
                ref={(element) => (collapseRefs.current[1] = element)}
                className="collapse collapse-arrow join-item"
                onClick={() => toggleCollapse(1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleCollapse(1);
                  }
                }}
              >
                <div className="collapse-title text-lg border-t border-t-white rounded-none">
                  Compras online
                </div>
                <div className="collapse-content rounded-none flex flex-col justify-start items-start bg-grey text-nav text-base px-0 pb-0">
                  <a
                    href="#"
                    target="_blank"
                    className="px-3 py-4 h-auto flex justify-start items-center "
                  >
                    Formas de pago
                  </a>
                  <span className="border border-white w-full"></span>
                  <a
                    href="#"
                    target="_blank"
                    className="px-3 py-4 h-auto flex justify-center items-center"
                  >
                    Preguntas frecuentes
                  </a>
                  <span className="border border-white w-full"></span>
                  <a
                    href="#"
                    target="_blank"
                    className="px-3 py-4 h-auto flex justify-center items-center"
                  >
                    Términos y condiciones
                  </a>
                  <span className="border border-white w-full"></span>
                  <a
                    href="#"
                    target="_blank"
                    className="px-3 py-4 h-auto flex justify-center items-center"
                  >
                    Políticas de cambios
                  </a>
                  <span className="border border-white w-full"></span>
                  <a
                    href="#"
                    target="_blank"
                    className="px-3 py-4 h-auto flex justify-center items-center"
                  >
                    Políticas de envíos
                  </a>
                  <span className="border border-white w-full"></span>
                  <a
                    href="https://autogestion.produccion.gob.ar/consumidores"
                    target="_blank"
                    className="px-3 py-4 h-auto flex justify-center items-center"
                  >
                    Defensa del consumidor
                  </a>
                </div>
              </div>
              <a
                href="https://wa.me/5491133130958/?text=Hola"
                target="_blank"
                className="collapse-title collapse text-lg text-white font-medium border-y border-y-white rounded-none"
              >
                Contacto
              </a>
            </div>
          )}
        </>
      ) : (
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
            <a
              href="https://autogestion.produccion.gob.ar/consumidores"
              target="_blank"
              className="hover:underline"
            >
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
      )}
    </>
  );
};

export default FooterOptions;
