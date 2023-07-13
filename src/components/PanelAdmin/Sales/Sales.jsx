import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersAction } from "../../../redux/ordersActions";

const Sales = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);
  const [offset, setOffset] = useState(5);

  useEffect(() => {
    dispatch(getOrdersAction(offset));
  }, [dispatch, offset]);

  const handleNextPage = () => {
    setOffset(offset + 1);
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

 

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  const renderTablesByStatus = () => {
    const pendingOrders = orders.filter((order) => order.status === "PENDING");
    console.log(pendingOrders);
    const acceptedOrders = orders.filter(
      (order) => order.status === "ACEPTADO"
    );
    const cancelledOrders = orders.filter(
      (order) => order.status === "CANCELADO"
    );

    return (
      <>
        {pendingOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-500 py-4 my-8">
              Pendientes
            </h2>
            <table className="min-w-full divide-y divide-gray-300 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Compra
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Envío
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total con Descuento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total sin Descuento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Productos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {pendingOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOrderClick(order._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.Customer?.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.shiping ? "Sí" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.payType}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.totalWithDiscount ? order.totalWithDiscount.toFixed(2) : ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.totalWithOutDiscount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Ver Productos
                      </td>
                    </tr>
                    {expandedOrderId === order._id && (
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
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {acceptedOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-500 py-4 my-8">
              Aceptadas
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Compra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre del Cupón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cupón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Envío
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total con Descuento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total sin Descuento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Productos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {acceptedOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOrderClick(order._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.usuario}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.creacion).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.nombreCupon}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.cupon}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.envio ? "Sí" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.tipoDePago}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.totalConDescuento}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.totalSinDescuento}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Ver Productos
                      </td>
                    </tr>
                    {expandedOrderId === order._id && (
                      <tr>
                        <td colSpan="8" className="px-6 py-4">
                          <ul>
                            {order.productos.map((producto, index) => (
                              <li key={index}>
                                {producto.cantidad} x{" "}
                                {producto.producto.descripcion}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {cancelledOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-500 py-4 my-8">
              Canceladas
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Compra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre del Cupón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cupón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Envío
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total con Descuento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total sin Descuento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ver Productos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cancelledOrders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOrderClick(order._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.usuario}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.creacion).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.nombreCupon}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.cupon}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.envio ? "Sí" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.tipoDePago}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.totalConDescuento}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.totalSinDescuento}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Ver Productos
                      </td>
                    </tr>
                    {expandedOrderId === order._id && (
                      <tr>
                        <td colSpan="8" className="px-6 py-4">
                          <ul>
                            {order.productos.map((producto, index) => (
                              <li key={index}>
                                {producto.cantidad} x{" "}
                                {producto.producto.descripcion}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  };

  return <div>{renderTablesByStatus()}</div>;
};

export default Sales;
