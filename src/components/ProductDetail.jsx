import React, { useState } from "react";
import Modal from "./Modal";
import { useSwipeable } from "react-swipeable";

import { useSelector } from "react-redux";

const ProductDetail = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isCambioOpen, setIsCambioOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSucursalesOpen, setIsSucursalesOpen] = useState(false);
  const [isEnvioOpen, setIsEnvioOpen] = useState(false);
  const [isTalleOpen, setIsTalleOpen] = useState(false);
  console.log(isTooltipOpen);
  const detailProduct = {
    tipo: "Zapatillas",
    marca: "Adidas",
    modelo: "Superstar",
    colores: ["Negro", "Rojo"],
    talle: ["37", "38", "39", "40", "41", "42", "43"],
    precio: 89.99,
    codigo: "ZA002",
    genero: "Unisex",
    proveedor: "ProveedorB",
    disciplina: "Deportes varios",
    icono:
      "data:image/png;base64,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",
    descripcion:
      "Botitas Jordan Air 5 Retro De Moda Para Hombre Código: Dd0587-047",
    images: [
      "https://essential.vtexassets.com/arquivos/ids/791457-800-auto?v=638193268383530000&width=800&height=auto&aspect=true",
      "https://essential.vtexassets.com/arquivos/ids/791459-800-auto?v=638193268391030000&width=800&height=auto&aspect=true",
      "https://essential.vtexassets.com/arquivos/ids/791458-800-auto?v=638193268387270000&width=800&height=auto&aspect=true",
    ],
  };
  const [selectedImage, setSelectedImage] = useState(detailProduct.images[0]);
  const rutaDelArticulo = "Calzados > Botitas > Botitas Jordan Air 5 Retr";
  const handleToggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  const handleToggleTalle = () => {
    setIsTalleOpen(!isTalleOpen);
  };

  const handleToggleEnvio = () => {
    setIsEnvioOpen(!isEnvioOpen);
  };

  const handleToggleCambio = () => {
    setIsCambioOpen(!isCambioOpen);
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };
  const handleShare = () => {
    // Lógica para compartir
    // ...
  };

  const handleShareWhatsApp = () => {
    // Lógica para compartir en WhatsApp
    // ...
  };

  const handleShareFacebook = () => {
    // Lógica para compartir en Facebook
    // ...
  };
  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
  };

  const handleSwipe = (direction) => {
    if (direction === "LEFT") {
      const currentIndex = detailProduct.images.indexOf(selectedImage);
      const nextIndex =
        currentIndex === 0 ? detailProduct.images.length - 1 : currentIndex - 1;
      setSelectedImage(detailProduct.images[nextIndex]);
    } else if (direction === "RIGHT") {
      const currentIndex = detailProduct.images.indexOf(selectedImage);
      const nextIndex =
        currentIndex === detailProduct.images.length - 1 ? 0 : currentIndex + 1;
      setSelectedImage(detailProduct.images[nextIndex]);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
  });

  const handleToggleSucursales = () => {
    setIsSucursalesOpen(!isSucursalesOpen);
  };

  const precios = 100;
  const review = {
    avg: 4.5,
    count: 10,
  };

  const BrightStar = (index, avg) => {
    // Lógica para determinar el estilo de la estrella según el promedio de calificaciones
    // ...

    return "text-yellow-400";
  };

  const createMarkup = (summary) => {
    return { __html: summary };
  };

  return detailProduct ? (
    <div className="flex flex-col sm:flex-row sm:mr-20 w-full mt-14 lg:w-full xl:w-full">
      <div className="hidden w-full sm:hidden md:block md:w-1/4 lg:block lg:w-1/3 xl:block xl:w-1/4"></div>
      <div className="lg:flex lg:mx-0 lg:w-1/2 xl:w-1/2 lg:p-8 ">
        <div
          {...handlers}
          className="hidden lg:block lg:mt-0 lg:w-1/4 sm:mt-2 md:mt-4 sm:ml-1 md:ml-1 lg:mr-1 sm:mr-1 md:mr-1 xl:w-1/4 xl:h-1/2"
        >
          {detailProduct.images.map((imageName, index) => (
            <img
              key={index}
              className={`w-full mb-4 ${
                selectedImage === imageName ? "border border-black" : ""
              }`}
              src={imageName}
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(imageName)}
            />
          ))}
        </div>

        <div className="w-full items-center lg:mx-5 lg:w-3/4 xl:mx-10 xl:p-10">
          {/* Imagen principal */}
          <img
            src={selectedImage}
            alt={detailProduct.modelo}
            className="items-center w-full sm:w-3/4 sm:mb-0 md:w-full xsm:mt-20 lg:mt-0 lg:w-full xl:w-full xl:mt-0"
          />

          {/* Navegación */}
          <div className="lg:hidden flex justify-between mt-2">
            <button onClick={() => handleSwipe("LEFT")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button onClick={() => handleSwipe("RIGHT")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <main className="flex-1 h-auto lg:w-3/4 order-2 xsm:order-1 mt-1 ml-1 mb-6 mr-8 sm:mr-0 mx-auto w-full sm:w-3/5 justify-center sm:justify-end">
            <div className="flex flex-col items-center sm:items-start">
              <div className="mt-0">
                <h3 className="text-lg3 mt-3 font-bold">DESCRIPCION</h3>
                <p className="text-gray-500 mt-3">
                  {detailProduct.descripcion}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">ESPECIFICACIONES</h3>
              <table className="mt-3 w-full">
                <tbody>
                  <tr>
                    <th className="bg-gray-200 text-left px-4 py-2">Genero:</th>
                    <td className="bg-gray-100 text-left px-4 py-2">
                      {detailProduct.genero}
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-100 text-left px-4 py-2">Color:</th>
                    <td className="bg-gray-100 text-left px-4 py-2">
                      {detailProduct.colores.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-200 text-left px-4 py-2">
                      Proveedor:
                    </th>
                    <td className="bg-gray-100 text-left px-4 py-2">
                      {detailProduct.proveedor}
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-100 text-left px-4 py-2">
                      Disciplina:
                    </th>
                    <td className="bg-gray-100 text-left px-4 py-2">
                      {detailProduct.disciplina}
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-200 text-left px-4 py-2">Marca:</th>
                    <td className="bg-gray-100 text-left px-4 py-2">
                      {detailProduct.marca}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      <aside className="flex-1 lg:p-8 lg:w-1/3 md:w-1/2 order-2 xsm:order-1 md:mt-28 xsm:mt-0 xsm:mb-0 xsm:ml-0 xsm:mr-0 sm:ml-0  sm:mr-1 mx-auto w-full sm:w-1/2 sm:mt-20 lg:mt-0 xl:mt-0 lg:mr-20 xl:w-1/2 justify-end">
        <h1 className="font-bold tracking-tight text-gray-400 text-1xl mt-4 xsm:mt.0">
          {rutaDelArticulo}
        </h1>
        <img
          src={detailProduct.icono}
          alt="Logo del producto"
          className="w-12 h-12 mt-2 mb-2"
        />
        <h1 className="font-extrabold tracking-tight text-gray-900 text-3xl mt-4 xsm:mt.0 ">
          {detailProduct.tipo} - {detailProduct.marca} {detailProduct.modelo}
        </h1>
        <div className="flex items-center mt-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-5 w-5 fill-current ${BrightStar(
                  index,
                  review.avg
                )}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.106l2.447 4.978 5.487.796L13.942 10l1.992 4.12-5.488.798L10 18.893l-2.446-4.978-5.488-.798L6.058 10 .566 5.878l5.487-.796L10 1.106zM5.978 9.766l-2.584.375 1.956 1.997-.464 2.713 2.451-1.28 2.45 1.28-.463-2.713 1.956-1.997-2.584-.375-1.209-2.37-.912 2.369zm8.622.375l-2.584-.375-.912-2.369-1.209 2.369-2.584.375 1.956 1.997-.464 2.713 2.45-1.28 2.451 1.28-.463-2.713 1.956-1.997zm-1.209-5.086L13.933 8.82l.5 2.924-2.337-1.22-2.338 1.22.5-2.924L6.609 5.056l2.338-1.22.5-2.924 1.957 1.997L12 3.47zm.5 11.144L10 14.303l-2.5 1.368.954-2.79-2.506-1.938 3.1-.268L10 7.958l1.952 3.717 3.1.268-2.507 1.938.954 2.79z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-700">
              {review.avg.toFixed(1)}
            </span>
          </div>
          <span className="ml-3 text-sm text-gray-500">
            {review.count} reseñas
          </span>
        </div>
        <div className="mt-4">
          <p className="ml-3 text-sm text-gray-500">
            CODIGO: {detailProduct.codigo}
          </p>
        </div>
        <hr className="w-full border-gray-300 mt-2" />
        <div className="mt-4">
          <p className="text-3xl text-gray-900">${detailProduct.precio}</p>
        </div>
        <div className="mt-4">
          <p>3 CUOTAS SIN INTERÉS DE $ 38.333,00</p>
          <p>6 CUOTAS FIJAS DE $ 23.754,96</p>
          <p>12 CUOTAS FIJAS DE $ 13.905,30</p>
        </div>
        <div className="mt-4 mx-auto sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
          <div className="flex items-center justify-between mr-16">
            <p>Seleccione un talle:</p>

            <button
              onClick={handleToggleTalle}
              className="flex items-center ml-10 "
            >
              <p className="text-blue-500 underline mr-2">Tabla de Talles</p>
            </button>
          </div>
          <Modal
            id="talleModal"
            isOpen={isTalleOpen}
            onClose={handleToggleTalle}
          >
            <div className="bg-white text-black p-6">
              <div>
                <h3 className="font-bold">TABLA DE TALLES</h3>
                <div className="leading-tight text-sm">
                  <p className="mt-8">
                    Buscá tu talle en la tabla y comprá seguro. Si tienes dudas
                    sobre cómo medir tu talle, visita el siguiente link:
                    <a href="URL_DEL_LINK">Enlace para medir el talle</a>
                  </p>
                  <table className="mt-4 w-full h-full">
                    <tbody>
                      <tr>
                        <td className="text-center bg-black text-white py-2 px-4">
                          CM
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          24
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          24.5
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          25
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          25.5
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          26
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          26.5
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          27
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          27.5
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          28
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          28.5
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          29
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          29.5
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          30
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          30.5
                        </td>
                        <td className="text-center bg-black text-white border py-2 px-4">
                          31
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center bg-white py-2 px-4">ARG</td>
                        <td className="text-center border py-2 px-4">37.5</td>
                        <td className="text-center border py-2 px-4">38</td>
                        <td className="text-center border py-2 px-4">39</td>
                        <td className="text-center border py-2 px-4">39.5</td>
                        <td className="text-center border py-2 px-4">40</td>
                        <td className="text-center border py-2 px-4">40.5</td>
                        <td className="text-center border py-2 px-4">41</td>
                        <td className="text-center border py-2 px-4">41.5</td>
                        <td className="text-center border py-2 px-4">42</td>
                        <td className="text-center border py-2 px-4">42.5</td>
                        <td className="text-center border py-2 px-4">43</td>
                        <td className="text-center border py-2 px-4">43.5</td>
                        <td className="text-center border py-2 px-4">44</td>
                        <td className="text-center border py-2 px-4">44.5</td>
                        <td className="text-center border py-2 px-4">45</td>
                      </tr>
                      <tr>
                        <td className="text-center bg-white py-2 px-4">US</td>
                        <td className="text-center border py-2 px-4">6.00</td>
                        <td className="text-center border py-2 px-4">6.50</td>
                        <td className="text-center border py-2 px-4">7.00</td>
                        <td className="text-center border py-2 px-4">7.50</td>
                        <td className="text-center border py-2 px-4">8.00</td>
                        <td className="text-center border py-2 px-4">8.50</td>
                        <td className="text-center border py-2 px-4">9.00</td>
                        <td className="text-center border py-2 px-4">9.50</td>
                        <td className="text-center border py-2 px-4">10.0</td>
                        <td className="text-center border py-2 px-4">10.5</td>
                        <td className="text-center border py-2 px-4">11.0</td>
                        <td className="text-center border py-2 px-4">11.5</td>
                        <td className="text-center border py-2 px-4">12.0</td>
                        <td className="text-center border py-2 px-4">12.5</td>
                        <td className="text-center border py-2 px-4">13.0</td>
                      </tr>
                      <tr>
                        <td className="text-center bg-white py-2 px-4">EU</td>
                        <td className="text-center border py-2 px-4">38.5</td>
                        <td className="text-center border py-2 px-4">39</td>
                        <td className="text-center border py-2 px-4">40</td>
                        <td className="text-center border py-2 px-4">40.5</td>
                        <td className="text-center border py-2 px-4">41</td>
                        <td className="text-center border py-2 px-4">42</td>
                        <td className="text-center border py-2 px-4">42.5</td>
                        <td className="text-center border py-2 px-4">43</td>
                        <td className="text-center border py-2 px-4">44</td>
                        <td className="text-center border py-2 px-4">44.5</td>
                        <td className="text-center border py-2 px-4">45</td>
                        <td className="text-center border py-2 px-4">45.5</td>
                        <td className="text-center border py-2 px-4">46</td>
                        <td className="text-center border py-2 px-4">46.5</td>
                        <td className="text-center border py-2 px-4">47</td>
                      </tr>
                      {/* Continuar con las filas restantes */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal>

          <div className="flex items-center mt-2 mx-auto w-auto sm:mx-auto md:mx-auto lg:mx-auto xl:mr-3 flex-grow">
            {detailProduct.talle.map((size) => (
              <div
                key={size}
                className={`border border-gray-300 rounded-md p-2 mr-1 sm:mx-auto md:mr-0 lg:p-2 xl:p-3${
                  selectedSize === size ? "bg-black text-white" : ""
                }`}
                onClick={() => handleSizeSelection(size)}
              >
                <span className="text-center">{size}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="bg-black text-white py-2 px-0 mt-8 rounded-lg w-1/2">
          AGREGAR AL CARRITO
        </button>
        <div className="flex items-center mt-6">
          <button onClick={handleShare}>
            <img
              src="data:image/png;base64,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"
              alt="Compartir "
              className="w-6 h-6 mr-2"
            />
          </button>
          <button onClick={handleShareWhatsApp}>
            <img
              src="data:image/png;base64,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"
              alt="Compartir en WhatsApp"
              className="w-6 h-6 mr-2"
            />
          </button>
          <button onClick={handleShareFacebook}>
            <img
              src="data:image/png;base64,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"
              alt="Compartir en Facebook"
              className="w-6 h-6"
            />
          </button>
        </div>
        <div>
          <button
            onClick={handleToggleTooltip}
            className="flex items-center mt-8"
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/357/048/small/3__2821_29.jpg"
              alt="Icono"
              className="w-6 h-6 mr-2"
            />
            <p className="mr-2">Cuotas sin interés</p>
            <p className="text-blue-500 underline">- Ver más</p>
          </button>
          <Modal
            id="tooltipModal"
            isOpen={isTooltipOpen}
            onClose={handleToggleTooltip}
          >
            <div className="bg-white text-black p-4">
              <div>
                <h3 className="font-bold">MEDIOS DE PAGO:</h3>
                <hr className="w-full border-gray-300 mt-2" />
              </div>
              <div>
                <h3 className="font-bold">
                  Podés pagar en efectivo, débito y crédito.
                </h3>
                <ul>
                  <li>
                    Tenes 3 cuotas sin interés con todas las tarjetas de crédito
                    bancarias Visa y Mastercard
                  </li>
                </ul>
                <div className="flex items-center justify-center mt-4">
                  <img
                    src="data:image/png;base64,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"
                    alt="Tarjeta 1"
                    className="w-12 h-10 mx-2"
                  />
                  <img
                    src="data:image/png;base64,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"
                    alt="Tarjeta 2"
                    className="w-12 h-10 mx-2"
                  />
                  <img
                    src="data:image/png;base64,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"
                    alt="Tarjeta 3"
                    className="w-12 h-10 mx-2"
                  />
                </div>
              </div>
            </div>
          </Modal>
        </div>

        <hr className="w-full border-gray-300 mt-2" />

        <div>
          <button
            onClick={handleToggleCambio}
            className="flex items-center mt-8"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkcZd8dnBz1_rpOggGdJhtN-Za3GgJ0cYBoxZ2Ls7sQ&s"
              alt="Icono"
              className="w-6 h-6 mr-2"
            />
            <p className="mr-2">Cambios gratis en sucursales</p>
            <p className="text-blue-500 underline">- Ver más</p>
          </button>
          <Modal
            id="cambioModal"
            isOpen={isCambioOpen}
            onClose={handleToggleCambio}
          >
            <div className="bg-white text-black p-4">
              <div>
                <h3 className="font-bold">POLÍTICAS DE CAMBIO</h3>
                <div className="leading-tight text-sm">
                  <p>
                    El plazo de cambio es de treinta (30) días corridos contando
                    a partir de la fecha en que recibiste tu compra.
                  </p>
                  <ul className="list-disc ml-4">
                    <li>
                      El producto debe estar sin uso y en perfecto estado.
                    </li>
                    <li>
                      El producto debe poseer sus etiquetas, envoltorios y todos
                      los accesorios adicionales con los que fue adquirido.
                    </li>
                    <li>
                      En caso de realizar el cambio por correo, el mismo debe
                      estar envuelto en una bolsa negra o de papel madera.
                    </li>
                    <li>
                      Al momento del cambio se debe tener la factura de compra o
                      ticket de cambio.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <hr className="w-full border-gray-300 mt-2" />
        <div>
          <button
            onClick={handleToggleSucursales}
            className="flex items-center mt-8"
          >
            <img
              src="data:image/png;base64,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"
              alt="Icono"
              className="w-8 h-8 mr-2"
            />
            <p className="mr-2">Retiro expres en tiendas</p>
            <p className="text-blue-500 underline">- Ver más</p>
          </button>
          <Modal
            id="sucursalesModal"
            isOpen={isSucursalesOpen}
            onClose={handleToggleSucursales}
          >
            <div className="bg-white text-black p-8 w-full">
              <div>
                <h3 className="font-bold text-2xl uppercase">SUCURSALES</h3>
                <hr className="w-full border-gray-300 mt-4 mb-4" />
                <div className="leading-tight text-base w-full">
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    GRID JOSÉ C.PAZ - José C.Paz 1784
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    MARK MARTINEZ - Av. Panamericana 535 esq Edison
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    DASH SAN MARTIN - Belgrano 3607
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    GRID CONSTITUYENTES - Av. Constituyentes 6020
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    DASH GRAN BOURG - Colectora Panamericana KM34 Ramal Escobar
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    DASH PILAR - Colectora Panamericana KM 54 Ramal Pilar
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    GRID SAN MIGUEL - Av. Presidente Perón 1320
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    DASH JOSÉ C. PAZ - José C. Paz 1827
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    DASH PILAR - Rivadia 744
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    GRID MORÓN - Av. Rivadavia 18276
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 p-4">
                    GRID SAN JUSTO SHOPPING - Brigadier Juan Manuel de Rosas
                    3910
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <hr className="w-full border-gray-300 mt-2" />
        <div>
          <button
            onClick={handleToggleEnvio}
            className="flex items-center mt-8"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFh3pmCoUR5XuBsyixzgQxrRbruxRyg80YQ&usqp=CAU"
              alt="Icono"
              className="w-8 h-8 mr-2"
            />
            <p className="mr-2">Envios</p>
            <p className="text-blue-500 underline">- Ver más</p>
          </button>
          <Modal
            id="envioModal"
            isOpen={isEnvioOpen}
            onClose={handleToggleEnvio}
          >
            <div className="bg-white text-black p-4">
              <div>
                <h3 className="font-bold text-lg uppercase">ENVÍOS</h3>
                <hr className="w-full border-gray-300 mt-4 mb-4" />
                <div className="leading-tight text-base w-full">
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 text-lg">
                    ENVIOS GRATIS en compras superiores a $29.999.
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 text-lg">
                    PICKUP GRATIS EN SUCURSALES EN 24hs, podes ver las tiendas
                    disponibles en el checkout.
                  </p>
                  <p className="mt-6 mb-6 border border-gray-300 border-t-2 border-b-2 text-lg">
                    Envío express en 24hs a domicilio a través de Andreani. Solo
                    válido para compras de domingos a jueves, únicamente para
                    AMBA y CABA.
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </aside>
    </div>
  ) : (
    <div>Cargando...</div>
  );
};

export default ProductDetail;
