import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClientsAction } from "../../../redux/clientActions";

const Clients = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);

  
  useEffect(() => {
    dispatch(getClientsAction());
  }, [dispatch]);

  // Resto de tu código...

  return (
    <div className="flex flex-col w-full max-w-full h-full justify-start items-center">
      <div className="w-full max-w-[350px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto flex justify-between gap-1 mb-2">
        <h2 className="text-2xl font-bold text-header pb-6 w-full text-start">
          CLIENTES
        </h2>
      </div>
      <div className="flex flex-nowrap w-full xl:flex-wrap max-w-[400px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl h-auto">
        <div className="overflow-x-auto w-full flex-col flex px-4">
          <table className="min-w-full  sm:max-w-full  divide-y divide-gray-300 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-header font-medium  uppercase tracking-wider">
                  Nombre Completo
                </th>
                <th className="px-6 py-3 text-center text-header font-medium  uppercase tracking-wider">
                  DNI
                </th>
                <th className="px-6 py-3 text-center text-header font-medium  uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-header font-medium  uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-center text-header font-medium  uppercase tracking-wider">
                  Ciudad
                </th>

                <th className="px-6 py-3 text-center text-header font-medium  uppercase tracking-wider">
                  Provincia
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {clients.map((client) => {
                const hasData =
                  client.fullName ||
                  client.dni ||
                  client.email ||
                  client.address ||
                  client.city ||
                  client.province;

                if (!hasData) {
                  return null;
                }

                return (
                  <tr key={client._id} className="h-14">
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 text-center">
                      {client.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 text-center">
                      {client.dni}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 text-center">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 text-center">
                      {client.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 text-center">
                      {client.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 text-center">
                      {client.province}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;
