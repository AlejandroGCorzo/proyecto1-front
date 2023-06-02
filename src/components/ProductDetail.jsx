import React, { useState } from "react";
import { Popover } from "react-tiny-popover";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isCambioOpen, setIsCambioOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  console.log(isTooltipOpen);
  const detailProduct = {
    tipo: "Zapatillas",
    marca: "Adidas",
    modelo: "Superstar",
    colores: ["Negro", "Rojo"],
    talle: ["37", "38", "39", "40", "41", "42"],
    precio: 89.99,
    codigo: "ZA002",
    genero: "Unisex",
    proveedor: "ProveedorB",
    disciplina: "Deportes varios",
    descripcion:
      "Botitas Jordan Air 5 Retro De Moda Para Hombre Código: Dd0587-047",
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
    <div className="flex flex-col sm:flex-row w-full mt-0">
      <div className="hidden sm:block w-full sm:w-1/5"></div>
      <main className="flex-1 mt-1 ml-1 mr-8 sm:mr-0 mx-auto w-full sm:w-3/5 justify-end">
      <img
  src="https://essential.vtexassets.com/arquivos/ids/791394-800-auto?v=638193267937000000&width=800&height=auto&aspect=true"
  alt={detailProduct.modelo}
  className="w-full h-auto sm:mt-20"
  style={{
    maxHeight: "80vh",
    marginTop: "auto",
    maxWidth: "600px",
    width: "100%", // Añadido para que la imagen ocupe el 100% del ancho en pantallas pequeñas
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    borderTop: "200px",
    "@media (max-width: 640px)": { // Media query para pantallas menores a 640px
      width: "200px",
      
    },
  }}
/>

<div className="mt-1">
          <h3 className="text-lg font-bold">Descripción</h3>
          <p className="text-gray-500">{detailProduct.descripcion}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Especificaciones</h3>
          <ul className="list-disc list-inside">
            <li>Color: {detailProduct.colores.join(", ")}</li>
            <li>Talle: {detailProduct.talle}</li>
            <li>Proveedor: {detailProduct.proveedor}</li>
          </ul>
        </div>
      </main>
      <aside className="flex-1 mt-20 mb-0 ml-8 mr-8 sm:ml-0 sm:mr-0 mx-auto w-full sm:w-1/3 sm:mt-10 justify-end">
        <h1 className="font-extrabold tracking-tight text-gray-900 text-3xl mt-4 ">
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
        <div className="mt-4">
          <p className="text-lg font-bold">Talles</p>
          <p>Seleccione un talle:</p>
          <div className="flex mt-2">
            {detailProduct.talle.map((size) => (
              <div
                key={size}
                className={`border border-gray-300 rounded-md p-2 mr-2 ${
                  selectedSize === size ? "bg-black text-white" : ""
                }`}
                onClick={() => handleSizeSelection(size)}
              >
                <span className="text-center">{size}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="bg-black text-white py-2 px-4 mt-8 rounded-lg">
          Agregar al carrito
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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEUb10H///8A1TMA1S4A1jYV1z4P1jsJ1jn7//zl+ukA1Cru/PF85Y35/vqx77uR6Z/p++z0/fZq4n7g+eQs2U2k7bDF88135Ii08L7N9dTX99258cLA8shV322o7bNc4HKc66lK3WSI55fS9thj4XiT6aFz44U83FlN3WUl2Ukz2lND3F2D5pOf7KvK9dLb+OFtV+HFAAAMq0lEQVR4nO1d11rrvBI1Kpbj9AqkV0IKyfu/3UkoG2Y0cgljh/98WhfsfQGWRmW0pmgUBB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh6lQ18RhuH7v/fuDC90aIQ0wa63Pywms8nisO3tglAKFf4fCKqvsm3Xx+lzt1Jt1x8+ELWrre6wsewcdCzMf1dMHYo4eGyc/wlmI2pXRsv9f1NKrdSu0+g6ZfuJ6uixZ0R47y7ngTZy2xxmku4L3f6rUP+VmQylrj1HueR7x3nZu+ijvw8TT0bujZeCU0f+9YlU5qVyq3jvaDcD8YdlVGEtm25JQnWz+6syGrls/Vq+K9r9QNxbGAKhfGyzyHdFNFd/TedocVixyXdFa/23lqoK+qzyXTHe/52lquOXKruADw/1ZvxHptEEg/TeDp/mtc5ssd+Fwf4w6TxuGqt2KivobtW9hbtCTJI1aGu8XO/lxVYy76Zh8G4kGiVkvJscG5VEMaOavLd4lxXaTOhhdbB8DaXLDrzajerwOEriCE/3ZuRhmLBCRzOdzqYvFqRZTN08r7u/60pVry4VE61qQmYdfi3iztgp5OMdV6pYOzpVn27jfEd2KHcb12g17yairDnke+vdcFxrESwdMvbvJKKkdUx7Ht5IR7QSNVovP92F4Mgp2ZnprfK9Q8kmeXyc7uDJEU9UT4YT+cuuiP2Y/HBQtoiyQXQjOqrfn15arKmlOizZ+JcU035WPEeXiakNcCqViJNKZvPbBfrj+y+ErflUokYVj3b71QnnGKs94Yws79BQxEF/0rxGuRbESm2WtFDDAzG8/KZcTPCJl3I4qrJtgUJ4FcEJo14ZCjUeWQ0fi9kgYmKd/ucStqKwF0+nqO1hthZRbRQuYriwxnVW3P43PUvEwreisZzahc3ge3NbbDbW98VuRZusLYvV4GpibcW4yPbCV9zepuh9ITqljqnCa3RavG6zVFu9wCNDLFFjwzJ4lMXDR4W1qnuID7d3pVg06oxEnBXlYZTYNu2UQ6LCLRrZSkE7MZwhAfuOhowSShnDN9AK2zLNYoY2RotlSAuoxMtbf745vkxiNhnxIVUvJLoYYiJMqzRR+3dGt1/ZRIwRt5kXsU7FKksjwL3RZVNEBp2K1QIcU3gXtsj8QuRi7LCtJoHiIwXsRNwE2Xk5h7/0zHZy6S1k/C32OcR8bUD1XVmW1ZatI2IDv3zknkSJppBi+DZrfXji0wgCKpsqMwHXIez5mJrC2E4XiviygRWijMzERiEHKTWFFmu9glEjKMhsyEG+HRJOz5hYfLpHxThbfGczGuWI9cDAO4w6ygWdUsN3YOgdnMQaJ7FBvadCCDqgQ3/PjLrmDXx5xblMNew9NS8WqfvCgW0x6X1U0Jdx76vU8qC88O9o8E2ifAZfnvNpMQGp/ZTqs4Ct/wCfhAZaUUM+CQ20m8jVQfj6P8F4YEj4ZTZtqnvgu12STSBK8AMtRl0DQ+trrkMfLQ56TrRTQsYDI4TeU7YtjkaOZNM6cEvIeGBoQE7p1XQDoIFdIZdGkoQPCz4L4wQ+zLQR0TakGFuQuEofHtmWKaLfTB82R/BVB1kyCWnCbBoB00emjYgom4NJKPc9pxUjgYQbkYm4QeO34jjdsJfjGy1OIwB6pas8cygBKXWZZdiC/Idoz2mqwmbaLEEaHQCjZeOYw9AK9H1ixupQQW5FFkNfL8A3XVaZ3tGqpsbru9XbTL3JBfMCvuk82+iNyB5BVcCCYjEv4Mp3+w7QSHyAPxctBgyfdGrmBTSd3E48tF/fwcjX/nUHKNMzRwPwkyf3oEk7lYhVjX52B5zOXY59CA3rkXvQkBJ4KCZ+okDgoMLRgARkJYknxZaZz2c3/YMBzJSFTQhg4JMejE/YR2KFP6cAGqtVjiMfZkH1k9Qzsm0eish9gV4xlgwpDdSzi9J8tG6FZvhzX1AbDMEt5OldJu4s+4oCy4EF+gP1GYNxjdhYMk3SOytzkZm1BXoPPv9a8hwSMdKHA++ZiGgyi987+z68QFrKpspbZwcq7IgjyAw1zVuKhHpvxdhYIyhBCMwnFgMxx2lxhZW/xJy5bMA+qHJk1sG8uXTfD3EjaskoIjR1WhyflCBTKENsWdjhfEYRFQgisvBSAUyGDNcBdM++QsgnIjTmWGwLSObbGRzpykpcvujghNVtZI4r6dDUcWQP5gN0M0dZloUg/G5vzntD4jgcr0XWyYAhBpZ8nax+mp+QxAXTgSPhVL4nO50fZSaXiw7AFmCJTSKqm827FRMe8NaB6o76ygisHsMM10RRb1449iHyv7gSg9EfaSokXLPvYOr999fb8/Rb7vA4jHiiWtDnnTHdMNxTySfjHp5GGO5oN7YpF1GR3uNxk8BQQSuj2jM4/fyjSzWocOwbv+NtYvI09Km0eA4heMaS+VAUjM1Qr1gdfqxERflYV2t3kSh0IYLJ+oRc92GZVX2ZV7o01ujfSgwPdHWa84txyIgye5gyajQM7w4yH0FqQosYTbfvZU+0dlZ3azku4aFY5oTJ9oR5o9Xsm5u4IfmJ57VUhriN+g06bozisFxcEKVE5Ri4MHDOUqW5JstDfIF0Pesd+J0EB3w+IFaTJ3geBreWcSP5GDwNUx0OmYFGLgv5/v5bkzhTbhwpXRPD8WLMYoEfzrW/dYyS7DOCcvWioc6hEdKAYvQ57//J2Q316tokh4XXObJr9VQgD149p3PE7CwHXCrISiYCkl0W2v0JlFqZ12bRAt2lSQdlwqCLSaz3O9HyqOQePDnJV5o2Iq87wEwB1gg6Dn7mjwuGYp6neDK1xcIF/B2+XLIrkJq+5Yaz2KYXkPyHBXXdAVIgJrviCyiJ9qZMHS07WavUUgsQhWQe3phDPhKusdsKGxjTz1QIu0rdlsKJENyRSXwj5sYIvehN07djRIWr8BSycVJXA90bKaEW+9R5JC/B46AWl+H0DRzeTXLxJkILkVgV2+GSQ96AAnKREK/5VYReyfXIpXROATU5OkDMj/eo+AC+RTr+TaJ8KHtH6pLNaUL7E3EFPBZvPoaV8jT7FS3URuwe0aANJo4ARoi0QBGpSIEdGPx1Tpc2Ml40n1bVdrvdHbytnUVrtUGcj+2iBWoHWmc8BqhWQkp5/ZFQVNJKYuFXpJ8NQf5dLavInxU4L6xADbJeGC8WJjeLNyFP/joFdImyCIVNQAtseBVXKApViSppCq38cZa8YBJI0/CmyThhp3ZQlhUPYO4qn7MyEXax2wKrmCJSw3iTOqFNq04D4+VfCwLYPSyZLGmQRyxge1ucfkNnRUJKOxuk7UwusrwYsoE5nZU0NFETvdBSwrD4R7vgEpRXPmenrBRa4w+VMSq8GGxobEd5scOKAluMFRtIiIUd7KgfCt0Z8HJQYez+A5qs5jMpeFSBb6VNLdKQrcRBQAUdCy12a2Vb4TRTrZWUkxlL3XkdT6hw3LHg4wkl1YCL8KESwWJzdbuMb3mcBEH0yKhx4cVuYS7SdzGDy9yZyfL0Nej1efi7zRKKJulOLf6tGQPa+3B1aSPi7XIMl1TrMecbOj8RxjNcjfVziRYvIHTI9sVFOtWrjagNc17f+JyokTNH2YJ18RQRRbYWcvvy5I55dh9N7hdFtDIdh3zt1xIMNQlc1PVGNyW+0trsM79ndUUod0dXclF1W8Jrj0RFxDREg04sM73wc337uTNwhmued2X4g9RNOTHR+CVIeV5cX0+aSSMhcrop5xFEme+B5m/Un+ezHf2K+lU4Gcw2q6TAcHVWjjfIKuSdC9Vzo7neq1iKC5RSl59SxmrbaTZWKblEp11JD67iKr43IIqqq3Fj2n+b96eN0eA5+WXHTzRLe4xMJCWCFobBrrwXnnDopwy0OnzPR6XCLpZQPN6YX1dKhrN80DcqjY7euWpD5sd4W+5zgNJZ9PGKqPVU28Ui1Fr2WPZrNEq7VsIO4e5NZVw7CPFFXbQ8NDKlBCUh9doMP0LHWdEeHw9aQGKmRa/5m/ed69P9HZ6rFMRTh/VBcxsLinZqFXdOedIQvxGdOvFdnuMUKL+nutrMlEwwj4zsLWlDNgnnZe9Gu/K30D8fkotWV56Z+lKlVuJwPGXfkvXnzWv648hF4fuW7LA/S7MVvqGNCNbTLLcthv1JcD/xgs8CwfXKtHO9kJyrHxfDT8rXzdO5Tc9muzpsbNbK+W53SdC9aqXxss9z3RrgYiPFZruuNfvj4fnc7Va65+Fq8DSd12Z7cbWreLt7C3YHQyrNPNDX5+LF+wvygVHyakdd/nvXmfuJP9MRDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8Pj9/hf6tWqsY6b73MAAAAAElFTkSuQmCC"
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
            onClick={() => {
              setIsTooltipOpen(true);
            }}
            className="flex items-center mt-8"
          >
            <p className="mr-2">Cuotas sin interés</p>
            <p className="text-blue-500 underline">- Ver más</p>
          </button>
          {isTooltipOpen && (
            <Popover
              isOpen={isTooltipOpen}
              content={
                <div className="bg-white text-black p-4 rounded-lg border border-black">
                  <div>
                    <h3 className="font-bold">Promociones vigentes:</h3>
                    <ul>
                      <li>Promoción 1</li>
                      <li>Promoción 2</li>
                      <li>Promoción 3</li>
                      {/* Agrega las promociones que desees mostrar */}
                    </ul>
                  </div>
                </div>
              }
              reposition={false}
              positions={["top", "bottom", "left", "right"]} // preferred positions by priority
            >
              <div
                onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                className="cursor-pointer flex justify-center items-center text-red-600 underline"
              >
                X
              </div>
            </Popover>
          )}
        </div>
        <hr className="w-full border-gray-300 mt-2" />
        {/* const [isCambioOpen, setIsCambioOpen] = useState(false) */}
        <div>
          <button
            onClick={() => {
              setIsCambioOpen(true);
            }}
            className="flex items-center mt-8"
          >
            <p className="mr-2">Cambios gratis en sucursales</p>
            <p className="text-blue-500 underline">- Ver más</p>
          </button>
          {isCambioOpen && (
            <Popover
              isOpen={isCambioOpen}
              content={
                <div className="bg-white text-black p-4 rounded-lg border border-black">
                  <div>
                    <h3 className="font-bold">POLÍTICAS DE CAMBIO</h3>
                    <div className="leading-tight text-sm">
                      <p>
                        El plazo de cambio es de treinta (30) días corridos
                        contando a partir de la fecha en que recibiste tu
                        compra.
                      </p>
                      <ul className="list-disc ml-4">
                        <li>
                          El producto debe estar sin uso y en perfecto estado.
                        </li>
                        <li>
                          El producto debe poseer sus etiquetas, envoltorios y
                          todos los accesorios adicionales con los que fue
                          adquirido.
                        </li>
                        <li>
                          En caso de realizar el cambio por correo, el mismo
                          debe estar envuelto en una bolsa negra o de papel
                          madera.
                        </li>
                        <li>
                          Al momento del cambio se debe tener la factura de
                          compra o ticket de cambio.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              }
              reposition={false}
              positions={["top", "bottom", "left", "right"]} // preferred positions by priority
            >
              <div
                onClick={() => setIsCambioOpen(!isCambioOpen)}
                className="cursor-pointer flex justify-center items-center text-red-600 underline"
              >
                X
              </div>
            </Popover>
          )}
        </div>
      </aside>
    </div>
  ) : (
    <div>Cargando...</div>
  );
};

export default ProductDetail;
