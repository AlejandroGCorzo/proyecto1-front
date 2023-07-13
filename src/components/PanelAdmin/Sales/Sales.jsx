import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrdersAcceptedAction,
  getOrdersCanceledAction,
  getOrdersPendingAction,
} from "../../../redux/ordersActions";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../../../utils/formatPrice";

const Sales = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { ordersPending, ordersAccepted, ordersCanceled } = useSelector(
    (state) => state.orders
  );

  const [offsetAceptadas, setOffsetAceptadas] = useState(1);
  const [offsetPendientes, setOffsetPendientes] = useState(1);
  const [offsetCanceladas, setOffsetCanceladas] = useState(1);
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (!status.length) {
      dispatch(getOrdersAcceptedAction(offsetAceptadas, "ACCEPTED"));
      dispatch(getOrdersPendingAction(offsetPendientes, "PENDING"));
      dispatch(getOrdersCanceledAction(offsetCanceladas, "CANCELED"));
    } else {
      if (status === "ACCEPTED") {
        dispatch(getOrdersAcceptedAction(offsetAceptadas, status));
      }
      if (status === "PENDING") {
        dispatch(getOrdersPendingAction(offsetPendientes, status));
      }
      if (status === "CANCELED") {
        dispatch(getOrdersCanceledAction(offsetCanceladas, status));
      }
    }
  }, [dispatch, offsetAceptadas, offsetCanceladas, offsetPendientes, status]);

  const setDetailToShow = (id, status) => {
    let detail;
    if (status === "aceptadas") {
      detail = ordersAccepted.orders.find((item) => item._id === id);
    } else if (status === "pendientes") {
      detail = ordersPending.orders.find((item) => item._id === id);
    } else {
      detail = ordersCanceled.orders.find((item) => item._id === id);
    }
    if (detail) {
      setDetail(detail);
    }
  };

  const toggleModal = (e) => {
    const { name, value } = e.target;
    if (name?.length && value?.length) {
      setDetailToShow(value, name);
    }
    modalRef?.current?.classList?.toggle("modal-open");
    document.activeElement.blur();
  };

  const handleNextPage = (e) => {
    const { value } = e.target;
    if (value === "pendiente") {
      if (offsetPendientes + 1 <= ordersPending?.maxpages) {
        setOffsetPendientes(offsetPendientes + 1);
        setStatus("PENDING");
      }
    }
    if (value === "aceptada") {
      if (offsetAceptadas + 1 <= ordersAccepted?.maxpages) {
        setOffsetAceptadas(offsetAceptadas + 1);
        setStatus("ACCEPTED");
      }
    }
    if (value === "cancelada") {
      if (offsetCanceladas + 1 <= ordersCanceled?.maxpages) {
        setOffsetCanceladas(offsetAceptadas + 1);
        setStatus("CANCELED");
      }
    }
  };

  const handlePrevPage = (e) => {
    const { value } = e.target;
    if (value === "pendiente") {
      if (offsetPendientes > 1) {
        setOffsetPendientes(offsetPendientes - 1);
        setStatus("PENDING");
      }
    }
    if (value === "aceptada") {
      if (offsetAceptadas > 1) {
        setOffsetAceptadas(offsetAceptadas - 1);
        setStatus("ACCEPTED");
      }
    }
    if (value === "cancelada") {
      if (offsetCanceladas > 1) {
        setOffsetCanceladas(offsetAceptadas - 1);
        setStatus("CANCELED");
      }
    }
  };

  return (
    <>
      {/* You can open the modal using ID.showModal() method */}
      <dialog id="my_modal_3" className="modal bg-header/20" ref={modalRef}>
        {detail && (
          <form
            method="dialog"
            className="modal-box bg-white text-header w-full max-w-2xl"
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={toggleModal}
            >
              ✕
            </button>
            <div className="w-full px-2 justify-center items-center">
              <div className="w-full flex justify-between items-start">
                {detail.Customer && (
                  <ul className="w-1/2 py-4 flex flex-col justify-center items-start gap-2 text-lg">
                    <li className="font-bold text-xl ">Datos del cliente.</li>
                    <li className="font-semibold">
                      Nombre:{" "}
                      <span className="font-normal">
                        {detail.Customer.fullName}
                      </span>
                    </li>
                    <li className="font-semibold">
                      Correo:{" "}
                      <span className="font-normal">
                        {detail.Customer.email}
                      </span>
                    </li>

                    <li className="flex flex-row font-semibold">
                      Dirección:{" "}
                      <div className="flex flex-col px-2">
                        <span className="font-normal">
                          {detail.Customer.address}
                          {detail.Customer.department?.length
                            ? detail.Customer.department
                            : null}
                        </span>
                        <span className="font-normal">
                          {detail.Customer.city}
                        </span>
                      </div>
                    </li>
                    <li className="flex whitespace-nowrap font-semibold">
                      Provincia - CP:
                      <div className="flex flex-col pl-2 font-normal">
                        <span>{detail.Customer.province}</span>
                        <span>{detail.Customer.zipCode}</span>
                        <span>{detail.Customer.country}</span>
                      </div>
                    </li>
                  </ul>
                )}
                <ul className="w-1/2 py-4 flex flex-col justify-start items-start gap-2 h-full text-lg">
                  <li className="font-bold text-xl ">Datos del pedido.</li>
                  <li className="font-semibold">
                    Estado:{" "}
                    <span
                      className={`font-normal ${
                        detail.status === "ACCEPTED"
                          ? "bg-green-400"
                          : detail.status === "CANCELED"
                          ? "bg-red-400"
                          : "bg-yellow"
                      } px-2`}
                    >
                      {detail.status === "ACCEPTED"
                        ? "ACEPTADO"
                        : detail.status === "CANCELED"
                        ? "CANCELADO"
                        : "PENDIENTE"}
                    </span>
                  </li>
                  <li className="font-semibold">
                    Factura A?{" "}
                    <span className="font-normal">
                      {detail?.isFacturaA ? "Si" : "No"}
                    </span>
                  </li>
                  <li className="font-semibold">
                    Con envio?{" "}
                    <span className="font-normal">
                      {detail?.shiping ? "Si" : "No"}
                    </span>
                  </li>
                  <li className="font-semibold">
                    Fecha de compra:{" "}
                    <span className="font-normal">
                      {new Date(detail?.payDate)?.toLocaleDateString()}
                    </span>
                  </li>
                  <li className="font-semibold">
                    Total:{" "}
                    <span className="font-normal">
                      {detail &&
                        detail?.totalWithDiscount &&
                        formatearPrecio(detail?.totalWithDiscount)}
                    </span>
                  </li>
                  <li className="font-semibold">
                    Tipo de pago:{" "}
                    <span className="font-normal">{detail?.payType}</span>
                  </li>
                </ul>
              </div>
              <div className="w-full flex flex-col justify-start items-center gap-2 max-h-60 overflow-y-auto contentScroll border">
                {detail &&
                  detail?.products?.length > 0 &&
                  detail?.products?.map((elem) => (
                    <div
                      key={elem.producto._id + "admin"}
                      className=" flex flex-row  justify-center items-center
                      w-full h-28 border-y py-2 bg-white"
                    >
                      <span className="px-4 text-header">{elem.cantidad}x</span>
                      <div className="flex h-20 w-20 py-1 border">
                        <img
                          className="h-16 w-full object-contain aspect-auto"
                          src={
                            elem.producto?.imagen?.length
                              ? elem.producto.imagen
                              : elem.producto.imagenes
                          }
                          alt={elem.producto.descripcion}
                          onError={(e) => {
                            e.target.src = "/nodisponible.jpg";
                          }}
                        />
                      </div>
                      <div className="w-2/3  flex flex-col sm:flex-row justify-center items-center px-2">
                        <Link to={`/product/${elem.producto._id}`}>
                          <h2 className="text-header uppercase text-center w-32 lg:w-44 h-full hover:text-blue-400">
                            {elem.producto.descripcion}
                          </h2>
                        </Link>

                        {elem.producto.precio ? (
                          <div className="flex flex-col w-full gap-2">
                            <p className="text-lg pb-1 font-medium text-header/60 w-full text-center line-through">
                              {formatearPrecio(elem.producto.precio)}
                            </p>
                            <p className="text-lg pb-1 font-medium text-header w-full text-center">
                              {formatearPrecio(elem.producto.preciocondesc)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-lg pb-1 font-medium text-header w-full text-center">
                            {formatearPrecio(elem.producto.precio)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </form>
        )}
      </dialog>
      <div className="flex flex-col  justify-center items-center px-6 max-w-sm sm:max-w-[90%] sm:w-[90%]">
        <h1 className="text-2xl underline text-header font-bold uppercase text-start w-full pb-4">
          Mis ordenes
        </h1>
        {ordersPending?.orders?.length > 0 && (
          <div className="flex flex-col justify-between items-center py-4 w-full">
            <h2 className="text-2xl font-bold text-header w-full text-start">
              Pendientes
            </h2>
            <div className="flex items-center justify-center mb-4">
              <button
                className="px-3 py-2 border rounded-l-md bg-white text-gray-600 disabled:bg-header/20 focus:outline-none"
                value={"pendiente"}
                onClick={handlePrevPage}
                disabled={offsetPendientes === 1}
              >
                &lt;
              </button>
              <span className="px-3 py-2 bg-white text-gray-600">
                Página {offsetPendientes} de {ordersPending?.maxpages}
              </span>
              <button
                className="px-3 py-2 border rounded-r-md bg-white text-gray-600 disabled:bg-header/20  focus:outline-none"
                value={"pendiente"}
                onClick={handleNextPage}
                disabled={offsetPendientes === ordersPending?.maxpages}
              >
                &gt;
              </button>
            </div>
            <section className=" flex flex-col justify-between items-start sm:items-center gap-4 w-full max-w-sm sm:max-w-full overflow-x-auto ">
              <table className="min-w-full  sm:max-w-full  divide-y divide-gray-300 bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de Compra
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CUIT/DNI
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300 h-auto">
                  {ordersPending?.orders?.map((order) => (
                    <React.Fragment key={order._id}>
                      {true ? (
                        <React.Fragment>
                          <tr className=" h-14">
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </td>
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.Customer?.fullName}
                            </td>

                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order?.Customer?.dni}
                            </td>
                            {/* <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.payType}
                          </td>

                          <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.totalWithDiscount
                              ? order.totalWithDiscount.toFixed(2)
                              : ""}
                          </td>
                          <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.totalWithOutDiscount}
                          </td> */}
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                className="border px-2 py-2 bg-yellow uppercase text-header border-header font-semibold rounded-xl hover:bg-yellow/70"
                                name="pendientes"
                                value={order._id}
                                onClick={toggleModal}
                              >
                                Ver Detalles
                              </button>
                            </td>
                          </tr>
                          {/* {expandedOrderId === order._id && (
                            <tr>
                              <td colSpan="8" className="px-6 py-4">
                                <ul>
                                  {order.products.map((producto, index) => (
                                    <li key={index}>
                                      {producto.cantidad} x{" "}
                                      {producto.producto.descripcion}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          )} */}
                        </React.Fragment>
                      ) : null}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {ordersAccepted?.orders?.length > 0 && (
          <div className="flex flex-col justify-between items-center py-4 w-full ">
            <h2 className="text-2xl font-bold text-header pb-6 w-full text-start">
              Aceptadas
            </h2>
            <div className="flex items-center justify-center mb-4">
              <button
                className="px-3 py-2 border rounded-l-md bg-white text-gray-600 disabled:bg-header/20 focus:outline-none"
                value={"aceptada"}
                onClick={handlePrevPage}
                disabled={offsetAceptadas === 1}
              >
                &lt;
              </button>
              <span className="px-3 py-2 bg-white text-gray-600">
                Página {offsetAceptadas} de {ordersAccepted?.maxpages}
              </span>
              <button
                className="px-3 py-2 border rounded-r-md bg-white text-gray-600 disabled:bg-header/20  focus:outline-none"
                value={"aceptada"}
                onClick={handleNextPage}
                disabled={offsetAceptadas === ordersAccepted?.maxpages}
              >
                &gt;
              </button>
            </div>
            <section className=" flex flex-col justify-between items-start sm:items-center gap-4 w-full max-w-sm sm:max-w-full overflow-x-auto">
              <table className="min-w-full  sm:max-w-full  divide-y divide-gray-300 bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de Compra
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CUIT/DNI
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300 h-auto">
                  {ordersAccepted?.orders?.map((order) => (
                    <React.Fragment key={order._id}>
                      {true ? (
                        <React.Fragment>
                          <tr className=" h-14">
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </td>
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.Customer?.fullName}
                            </td>

                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order?.Customer?.dni}
                            </td>
                            {/* <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.payType}
                          </td>

                          <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.totalWithDiscount
                              ? order.totalWithDiscount.toFixed(2)
                              : ""}
                          </td>
                          <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.totalWithOutDiscount}
                          </td> */}
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                className="border px-2 py-2 bg-yellow uppercase text-header border-header font-semibold rounded-xl hover:bg-yellow/70"
                                name="aceptadas"
                                value={order._id}
                                onClick={toggleModal}
                              >
                                Ver Detalles
                              </button>
                            </td>
                          </tr>
                          {/* {expandedOrderId === order._id && (
                            <tr>
                              <td colSpan="8" className="px-6 py-4">
                                <ul>
                                  {order.products.map((producto, index) => (
                                    <li key={index}>
                                      {producto.cantidad} x{" "}
                                      {producto.producto.descripcion}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          )} */}
                        </React.Fragment>
                      ) : null}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}
        {ordersCanceled?.orders?.length > 0 && (
          <div className="flex flex-col justify-between items-center py-4 w-full ">
            <h2 className="text-2xl font-bold text-header pb-6 w-full text-start">
              Canceladas
            </h2>
            <div className="flex items-center justify-center mb-4">
              <button
                className="px-3 py-2 border rounded-l-md bg-white text-gray-600 disabled:bg-header/20 focus:outline-none"
                value={"cancelada"}
                onClick={handlePrevPage}
                disabled={offsetCanceladas === 1}
              >
                &lt;
              </button>
              <span className="px-3 py-2 bg-white text-gray-600">
                Página {offsetCanceladas} de {ordersCanceled?.maxpages}
              </span>
              <button
                className="px-3 py-2 border rounded-r-md bg-white text-gray-600 disabled:bg-header/20  focus:outline-none"
                value={"cancelada"}
                onClick={handleNextPage}
                disabled={offsetCanceladas === ordersCanceled?.maxpages}
              >
                &gt;
              </button>
            </div>
            <section className=" flex flex-col justify-between items-start sm:items-center gap-4 w-full max-w-sm sm:max-w-full overflow-x-auto">
              <table className="min-w-full  sm:max-w-full  divide-y divide-gray-300 bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de Compra
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CUIT/DNI
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productos
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300 h-auto">
                  {ordersCanceled?.orders?.map((order) => (
                    <React.Fragment key={order._id}>
                      {true ? (
                        <React.Fragment>
                          <tr className="h-14">
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </td>
                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.Customer?.fullName}
                            </td>

                            <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order?.Customer?.dni}
                            </td>
                            {/* <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.payType}
                          </td>

                          <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.totalWithDiscount
                              ? order.totalWithDiscount.toFixed(2)
                              : ""}
                          </td>
                          <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.totalWithOutDiscount}
                          </td> */}
                            <td className="text-center  py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                className="border px-2 py-2 bg-yellow uppercase text-header border-header font-semibold rounded-xl hover:bg-yellow/70"
                                name="canceladas"
                                value={order._id}
                                onClick={toggleModal}
                              >
                                Ver Detalles
                              </button>
                            </td>
                          </tr>
                          {/* {expandedOrderId === order._id && (
                          <tr>
                            <td colSpan="8" className="px-6 py-4">
                              <ul>
                                {order.products.map((producto, index) => (
                                  <li key={index}>
                                    {producto.cantidad} x{" "}
                                    {producto.producto.descripcion}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        )} */}
                        </React.Fragment>
                      ) : null}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

/* return (
    <div className="w-full justify-center items-center flex">
      {renderTablesByStatus()}
    </div>
  ); */

export default Sales;
