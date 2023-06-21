import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { encode } from "js-base64";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAction, resetPasswordAction, resetPasswordCodeAction } from "../../redux/userActions";

function Profile() {
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [nombre, setNombre] = useState(usuario.name || "");
  const [apellido, setApellido] = useState(usuario.lastName || "");
  const [dni, setDNI] = useState(usuario.dni || "");
  const [telefono, setTelefono] = useState(usuario.phone || "");
  const [showCamposCorporativos, setShowCamposCorporativos] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [Password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState({
    upperCase: "",
    lowerCase: "",
    number: "",
    passwordLength: ""
  });

  const handleSaveChanges = () => {
    const updatedUser = {
      ...usuario,
      name: nombre,
      lastName: apellido,
      dni: dni,
      phone: telefono,
    };
    dispatch(updateUserAction(usuario.userId, updatedUser)); 
    setEditMode(false);
  };

  const handleApellidoChange = (e) => {
    console.log("Nuevo valor de apellido:", e.target.value);
    setApellido(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (value) => {
    // Realiza tus validaciones de contraseña aquí y actualiza el estado de errorPassword en consecuencia
    const errors = {
      upperCase: "", // Error de mayúsculas
      lowerCase: "", // Error de minúsculas
      number: "", // Error de números
      passwordLength: "" // Error de longitud
    };

    // Ejemplo de validación de mayúsculas
    if (!/[A-Z]/.test(value)) {
      errors.upperCase = "La contraseña debe contener al menos una letra mayúscula.";
    }

    // Ejemplo de validación de minúsculas
    if (!/[a-z]/.test(value)) {
      errors.lowerCase = "La contraseña debe contener al menos una letra minúscula.";
    }

    // Ejemplo de validación de números
    if (!/\d/.test(value)) {
      errors.number = "La contraseña debe contener al menos un número.";
    }

    // Ejemplo de validación de longitud
    if (value.length < 8) {
      errors.passwordLength = "La contraseña debe tener al menos 8 caracteres.";
    }

    setErrorPassword(errors);
  };

  const sendVerificationCode = () => {
    try {
      const encryptedEmail = encode(usuario.email);
      dispatch(resetPasswordCodeAction({ email: encryptedEmail }));
      setErrorMessage(""); // Limpiar el mensaje de error en caso de que haya uno previo
    setSuccessMessage("¡Se envió el código de verificación a su correo electrónico!");
    } catch (error) {
      setErrorMessage("Error al enviar el código de verificación. Por favor, inténtelo nuevamente.");
    setSuccessMessage(""); // Limpiar el mensaje de éxito en caso de que haya uno previo
    }
  };
  
  const updatePassword = async (e) => {
    e.preventDefault();
  
    try {
      // Validar campos antes de la llamada a la acción
      if (!verificationCode || !Password) {
        setErrorMessage("Por favor, complete todos los campos.");
        setSuccessMessage("");
        return;
      }
  
      // Validar longitud del código de verificación
      if (verificationCode.length !== 6) {
        setErrorMessage("El código de verificación debe tener 6 cifras.");
        setSuccessMessage("");
        return;
      }
  
      const encryptedPassword = encode(Password);
  
      dispatch(
        resetPasswordAction({
          password: encryptedPassword,
          code: +verificationCode,
        })
      );
  
      // Si la acción se ejecuta correctamente, aquí puedes realizar acciones adicionales
      setPassword("");
      setVerificationCode("");
      setErrorMessage(""); // Limpiar el mensaje de error en caso de que haya uno previo
      setSuccessMessage("¡La contraseña se cambió con éxito!");

      setTimeout(() => {
        setShowForm(false);
        alert("¡La contraseña se cambió con éxito!");
      }, 3000); 
  
      // Volver a la primera pestaña de modificar contraseña
      
    } catch (error) {
      // Mostrar mensajes de error específicos según el tipo de error
      if (error.code === "INVALID_VERIFICATION_CODE") {
        setErrorMessage("El código de verificación es inválido. Por favor, verifíquelo nuevamente.");
      } else {
        setErrorMessage("Error al modificar la contraseña.");
      }
      setSuccessMessage(""); // Limpiar el mensaje de éxito en caso de que haya uno previo
    }
  };
  
  

  const handleLogout = () => {
    // Realiza cualquier lógica necesaria para cerrar la sesión o limpiar los datos del usuario

    // Navega al componente Home
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "pais") {
      setPais(value);
    } else if (name === "codigoPostal") {
      setCodigoPostal(value);
    } else if (name === "calle") {
      setCalle(value);
    } else if (name === "numero") {
      setNumero(value);
    } else if (name === "ciudad") {
      setCiudad(value);
    }
  };

  const handleToggleAddressFields = () => {
    setShowAddressFields(true);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleBackButtonClick = () => {
    setSelectedOption(null);
    setShowFullContent(false);
  };
  const handleToggleCamposCorporativos = () => {
    setShowCamposCorporativos(!showCamposCorporativos);
  };

  const handleToggleFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  const guardarCambios = () => {
    // Lógica para guardar los cambios en el backend
    setEditMode(false);
    // Lógica para guardar los cambios en el backend
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };
  const agregarDireccion = (e) => {
    e.preventDefault();
    const nuevaDireccion = {
      pais: "Argentina",
      codigoPostal: formData.codigoPostal,
      calle: formData.calle,
      numero: formData.numero,
      ciudad: formData.ciudad,
      destinatario: formData.destinatario,
      
    };

    const nuevoUsuario = {
      ...user,
      direcciones: nuevaDireccion,
    };

    // Lógica para guardar los cambios en la base de datos utilizando nuevoUsuario

    setUser(nuevoUsuario); // Actualiza el estado del usuario con la nueva dirección

    setEditMode(false);
    setShowAddressFields(false);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFormData((prevState) => ({
      ...prevState,
      pais: "",
      codigoPostal: "",
      calle: "",
      numero: "",
      ciudad: "",
      destinatario: "",
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row sm:mr-20 w-full mt-14 lg:w-full xl:w-full xl:mt-5">
      {/* Sidebar */}
      <aside className="w-full h-auto ml-5 mr-1 md:w-1/4 lg:w-1/5 xl:w-1/5">
        <div className="mt-32 mx-10 xl:mt-5">
          <div className="h-auto w-1/4 flex items-center mt-10">
            <img
              src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
              alt="Imagen Usuario"
            />
            <p className="ml-2 font-bold text-lg">
              Hola {usuario.name || usuario.email}!
            </p>
          </div>
          <ul className="mt-12">
            <li
              className={`flex w-full justify-between ${
                selectedOption === "perfil" ? "text-black" : "text-gray-600"
              } hover:text-gray-500 cursor-pointer items-center mb-6`}
              onClick={() => handleOptionClick("perfil")}
            >
              <div className="flex items-center">
                <span className="text-sm ml-2">Perfil</span>
              </div>
            </li>
            <li
              className={`flex w-full justify-between ${
                selectedOption === "direcciones"
                  ? "text-black"
                  : "text-gray-600"
              } hover:text-gray-500 cursor-pointer items-center mb-6`}
              onClick={() => handleOptionClick("direcciones")}
            >
              <div className="flex items-center">
                <span className="text-sm ml-2">Direcciones</span>
              </div>
            </li>
            <li
              className={`flex w-full justify-between ${
                selectedOption === "pedidos" ? "text-black" : "text-gray-600"
              } hover:text-gray-500 cursor-pointer items-center mb-6`}
              onClick={() => handleOptionClick("pedidos")}
            >
              <div className="flex items-center">
                <span className="text-sm ml-2">Pedidos</span>
              </div>
            </li>
            <li
              className={`flex w-full justify-between ${
                selectedOption === "autenticacion"
                  ? "text-black"
                  : "text-gray-600"
              } hover:text-gray-500 cursor-pointer items-center mb-6`}
              onClick={() => handleOptionClick("autenticacion")}
            >
              <div className="flex items-center">
                <span className="text-sm  ml-2">Autenticacion</span>
              </div>
            </li>
            <li
              className={`flex w-full justify-between ${
                selectedOption === "salir" ? "text-black" : "text-gray-600"
              } hover:text-gray-500 cursor-pointer items-center mb-6`}
              onClick={() => {
                handleOptionClick("salir");
                handleLogout();
              }}
            >
              <div className="flex items-center">
                <span className="text-sm  ml-2">Salir</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full h-auto mx-1 py-5 px-1 md:w-1/2 md:mt-10 lg:w-1/2 sm:mt-10 lg:mt-10 xl:w-1/2 xl:mt-10">
        {/* Display content based on selectedOption */}
        {selectedOption === "perfil" && (
          <section className="w-full">
            <h1 className="flex justify-center px-5 py-5 md:justify-start lg:justify-start xl:justify-start text-sm font-bold font-sans">
              PERFIL
            </h1>

            {editMode ? (
              <div className="w-full h-full rounded border-solid border-2 border-gray-300 p-4 sm:mt-14 md:w-3/4 lg:w-1/2 xl:mt-0 xl:w-1/2">
                <label className="block mb-4">
                  <span className="text-gray-700">Nombre:</span>
                  <input
                    type="text"
                    name="name"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Apellido:</span>
                  <input
                    type="text"
                    name="lastname"
                    value={apellido}
                    // onChange={(e) => setApellido(e.target.value)}
                    onChange={handleApellidoChange}
                    className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">DNI:</span>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    name="dni"
                    value={dni}
                    onChange={(e) => setDNI(e.target.value)}
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Teléfono personal:</span>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    name="phone"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </label>

                {showCamposCorporativos && (
                  <>
                    <div>
                      {/* <label className="block mb-4">
                        <span className="text-gray-700">
                          Nombre corporativo:
                        </span>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                          value={nombreCorporativo}
                          onChange={(e) => setNombreCorporativo(e.target.value)}
                        />
                      </label>

                      <label className="block mb-4">
                        <span className="text-gray-700">Nombre comercial:</span>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                          value={nombreComercial}
                          onChange={(e) => setNombreComercial(e.target.value)}
                        />
                      </label>

                      <label className="block mb-4">
                        <span className="text-gray-700">CUIT:</span>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                          value={cuit}
                          onChange={(e) => setCuit(e.target.value)}
                        />
                      </label>

                      <label className="block mb-4">
                        <span className="text-gray-700">
                          Teléfono corporativo:
                        </span>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                          value={telefonoCorporativo}
                          onChange={(e) =>
                            setTelefonoCorporativo(e.target.value)
                          }
                        />
                      </label> */}
                    </div>
                  </>
                )}
                <button
                  className="bg-white w-full hover:bg-black hover:text-white  text-black mx-1 my-2 font-bold py-2 px-4 rounded"
                  onClick={handleToggleCamposCorporativos}
                >
                  {showCamposCorporativos
                    ? "OCULTAR CAMPOS CORPORATIVOS"
                    : "INCLUIR CAMPOS CORPORATIVOS"}
                </button>

                <button
                  className="bg-black w-full hover:bg-white hover:text-black  text-white font-bold py-2 px-4 rounded"
                  onClick={handleSaveChanges}
                >
                  GUARDAR CAMBIOS
                </button>
              </div>
            ) : (
              <div className="w-full bg-gray border border-gray-400 rounded-lg shadow p-2 mx-auto mt-4 md:flex md:flex-wrap md:justify-start md:mx-1 md:p-5 md:w-3/4 lg:flex lg:w-3/4 lg:flex-wrap lg:justify-start lg:mx-1 lg:p-5 xl:flex xl:w-3/4 xl:flex-wrap xl:justify-start xl:mx-1 xl:p-5">
                <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                  <p className="ml-0 py-4 px-0">Nombre:</p>
                  <p className="ml-0 py-1 px-1 text-gray-400">{usuario.name}</p>
                </div>
                <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                  <p className="ml-0 py-4 px-0">Apellido:</p>
                  <p className="ml-0 py-1 px-1 text-gray-400">
                    {usuario.lastName}
                  </p>
                </div>
                <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                  <p className="ml-0 py-4 px-0">Email:</p>
                  <p className="ml-0 py-1 px-1 text-gray-400">
                    {usuario.email}
                  </p>
                </div>
                <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                  <p className="ml-0 py-4 px-0">DNI:</p>
                  <p className="ml-0 py-1 px-1 text-gray-400">{usuario.dni}</p>
                </div>
                <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                  <p className="ml-0 py-4 px-0">Teléfono personal:</p>
                  <p className="ml-0 py-1 px-1 text-gray-400">
                    {usuario.phone}
                  </p>
                </div>

                {/* {usuario.camposCorporativos &&
                  Object.keys(usuario.camposCorporativos).length > 0 && (
                    <>
                      {usuario.camposCorporativos.nombreCorporativo && (
                        <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                          <p className="ml-0 py-4 px-0">Nombre corporativo:</p>
                          <p className="ml-0 py-1 px-1 text-gray-400">
                            {usuario.camposCorporativos.nombreCorporativo}
                          </p>
                        </div>
                      )}
                      {usuario.camposCorporativos.nombreComercial && (
                        <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                          <p className="ml-0 py-4 px-0">Nombre comercial:</p>
                          <p className="ml-0 py-1 px-1 text-gray-400">
                            {usuario.camposCorporativos.nombreComercial}
                          </p>
                        </div>
                      )}
                      {usuario.camposCorporativos.cuit && (
                        <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                          <p className="ml-0 py-4 px-0">CUIT:</p>
                          <p className="ml-0 py-1 px-1 text-gray-400">
                            {usuario.camposCorporativos.cuit}
                          </p>
                        </div>
                      )}
                      {usuario.camposCorporativos.telefonoCorporativo && (
                        <div className="mb-2 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                          <p className="ml-0 py-4 px-0">
                            Teléfono corporativo:
                          </p>
                          <p className="ml-0 py-1 px-1 text-gray-400">
                            {usuario.camposCorporativos.telefonoCorporativo}
                          </p>
                        </div>
                      )}
                    </>
                  )} */}

                <button
                  className="bg-white mr-3 hover:bg-gray-100 text-gray-400 font-bold py-2 px-4 rounded mt-4"
                  onClick={handleToggleEditMode}
                >
                  EDITAR
                </button>
              </div>
            )}
          </section>
        )}
        {selectedOption === "direcciones" && (
          <section className="w-full">
            <h1 className="flex justify-center px-5 py-5 md:justify-start lg:justify-start xl:justify-start text-sm font-bold font-sans">
              DIRECCIONES
            </h1>
            <div className="flex flex-col items-center">
              <p className="text-center">
                Usted no tiene direcciones cargadas.
              </p>
            </div>
            {/* {editMode ? (
              <div className="w-full h-full rounded border-solid border-2 border-gray-300 p-4 sm:mt-14 md:w-3/4 lg:w-1/2 xl:mt-0 xl:w-1/2">
                <form className="w-full h-full" onSubmit={agregarDireccion}>
                  <div className="mb-4">
                    <label
                      htmlFor="pais"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      País
                    </label>
                    <input
                      id="pais"
                      name="pais"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      defaultValue="Argentina"
                      disabled
                    />

                    <div className="mb-4">
                      <label
                        htmlFor="codigoPostal"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Código Postal
                      </label>
                      <input
                        id="codigoPostal"
                        name="codigoPostal"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese el código postal"
                        onChange={handleInputChange}
                        value={formData.codigoPostal || ""}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="calle"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Calle
                      </label>
                      <input
                        id="calle"
                        name="calle"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese la calle"
                        onChange={handleInputChange}
                        value={formData.calle || ""}
                      />

                      <label
                        htmlFor="numero"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Número
                      </label>
                      <input
                        id="numero"
                        name="numero"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese el número"
                        onChange={handleInputChange}
                        value={formData.numero || ""}
                      />

                      <label
                        htmlFor="infoAdicional"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Información adicional (ej.: apto. 201)
                      </label>
                      <input
                        id="infoAdicional"
                        name="infoAdicional"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese información adicional"
                        onChange={handleInputChange}
                        value={formData.infoAdicional || ""}
                      />

                      <label
                        htmlFor="ciudad"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Ciudad
                      </label>
                      <input
                        id="ciudad"
                        name="ciudad"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese la ciudad"
                        onChange={handleInputChange}
                        value={formData.ciudad || ""}
                      />

                      <label
                        htmlFor="destinatario"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Destinatario
                      </label>
                      <input
                        id="destinatario"
                        name="destinatario"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese el destinatario"
                        onChange={handleInputChange}
                        value={formData.destinatario || ""}
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Guardar dirección
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full ">
                {Object.keys(usuario).length > 0 ? (
                  <div className="w-full bg-gray border border-gray-400 rounded-lg shadow p-2 mx-auto mt-4 md:flex md:flex-wrap md:justify-start md:mx-1 md:p-5 md:w-3/4 lg:flex lg:w-3/4 lg:flex-wrap lg:justify-start lg:mx-1 lg:p-5 xl:flex xl:w-3/4 xl:flex-wrap xl:justify-start xl:mx-1 xl:p-5"> 
                    <>
                       <div className="flex flex-col w-full my-2 mx-3 items-center">
                        <h3 className="font-bold w-full mx-3">Código Postal</h3>
                        <p className=" w-full my-2 mx-3">
                          {usuario}
                        </p>
                      </div>
                      <div className="flex flex-col w-full items-center">
                        <h3 className="font-bold w-full mx-3">Calle</h3>
                        <p className=" w-full my-2 mx-3">
                          {usuario}
                        </p>
                      </div>
                      <div className="flex flex-col w-full items-center">
                        <h3 className="font-bold w-full mx-3">Ciudad</h3>
                        <p className=" w-full my-2 mx-3">
                          {usuario}
                        </p>
                      </div>
                      <div className="flex flex-col w-full items-center">
                        <h3 className="font-bold w-full mx-3">Destinatario</h3>
                        <p className=" w-full my-2 mx-3">
                          {usuario}
                        </p>
                      </div> 
                    </>
                     <button
                      className="bg-white mr-3 hover:bg-gray-100 text-gray-400 font-bold py-2 px-4 rounded mt-4"
                      onClick={handleToggleEditMode}
                    >
                      Agregar dirección
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <p className="text-gray-400 mb-4">
                      No tienes ninguna dirección registrada.
                    </p>
                  </div>
                )}
              </div>
            )} */}
          </section>
        )}
        {selectedOption === "pedidos" && (
          <div className="w-full h-full ">
            <h1 className="flex justify-center px-5 py-5 md:justify-start lg:justify-start xl:justify-start text-sm font-bold font-sans">
              PEDIDOS
            </h1>
            <div className="flex flex-col items-center">
              <p className="text-center">Usted no tiene pedidos pendientes.</p>
            </div>
          </div>
        )}
        {selectedOption === "autenticacion" && (
          <div className="w-full h-full ">
            <h1 className="flex justify-center px-5 py-5 md:justify-start lg:justify-start xl:justify-start text-sm font-bold font-sans">
              AUTENTICACIÓN
            </h1>
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold">Contraseña</h2>
              {showForm ? (
                <form onSubmit={updatePassword}>
                  <p>
                    Por favor, revise su casilla de correo para encontrar el
                    código de verificación.
                  </p>
                  <input
                    type="number" // Dependiendo de cómo quieras que sea el código de verificación, puedes ajustar el tipo de entrada
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Código de verificación"
                    className="bg-white border w-full h-10 focus:outline-none appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
                  />
                  <p>Por favor, introduzca su nueva contraseña</p>
                  <div className="grid grid-cols-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={Password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                      }}
                      placeholder="Nueva contraseña"
                      className="bg-white border w-full h-10 focus:outline-none appearance-none py-2 px-5 text-start"
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="self-center cursor-pointer"
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible className="w-5 h-5 text-gray-500" />
                      ) : (
                        <AiFillEye className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                  {errorPassword.upperCase && <p className="text-red-500">{errorPassword.upperCase}</p>}
                  {errorPassword.lowerCase && <p className="text-red-500">{errorPassword.lowerCase}</p>}
                  {errorPassword.number && <p className="text-red-500">{errorPassword.number}</p>}
                  {errorPassword.passwordLength && (
                    <p className="text-red-500">{errorPassword.passwordLength}</p>
                  )}
                  <button
                    className="bg-white mr-3 hover:bg-gray-100 text-gray-400 font-bold py-2 px-4 rounded mt-4"
                    type="submit"
                  >
                    Guardar cambios
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </button>
                  {errorMessage && (
                    <p className="bg-red-500  text-white px-4 py-2 mb-4 mt-4 rounded">
                      {errorMessage}
                    </p>
                  )}
                  {successMessage && (
                    <div className="bg-green-500 text-white px-4 py-2 mb-4 mt-4 rounded">
                      {successMessage}
                    </div>
                  )}
                </form>
              ) : (
                <>
                  <p>{"*".repeat(usuario.email.length)}</p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => {
                      setShowForm(true);
                      sendVerificationCode(); // Llama a la función para enviar el código de verificación al usuario
                    }}
                  >
                    Modificar contraseña
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Back button */}
      {selectedOption && (
        <button
          className="left-4 top-4 text-gray-600 hover:text-gray-500"
          onClick={handleBackButtonClick}
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Profile;
