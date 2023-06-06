import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logInAction } from "../../redux/userActions";
import { encode } from "js-base64";

const LogIn = ({ logIn, setLogIn, handleComponents, validatePassword }) => {
  const dispatch = useDispatch();
  let [inputLogIn, setInputLogIn] = useState({
    email: "",
    password: "",
  });
  let [errorLogIn, setErrorLogIn] = useState({
    upperCase: "",
    lowerCase: "",
    number: "",
    passwordLength: "",
  });

  const handleInputChangeLogIn = (e) => {
    e.preventDefault();
    setInputLogIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    let errorObj = validatePassword({
      ...inputLogIn,
      [e.target.name]: e.target.value,
    });
    setErrorLogIn((prev) => errorObj);
  };
  const handleSubmitLogIn = (e) => {
    e.preventDefault();
    let encriptedEmail = encode(inputLogIn.email);
    let encriptedPassword = encode(inputLogIn.password);
    setLogIn(false);
    dispatch(
      logInAction({ email: encriptedEmail, password: encriptedPassword })
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      <span className="py-4 font-semibold">Elija una opción para ingresar</span>
      <form onSubmit={handleSubmitLogIn}>
        <input
          type="email"
          name="email"
          value={inputLogIn.email}
          placeholder="Ej.: ejemplo@gmail.com"
          className="bg-white border w-full h-10 
          focus:outline-none
          appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
          onChange={handleInputChangeLogIn}
        />
        <input
          type="password"
          name="password"
          value={inputLogIn.password}
          placeholder="Ingrese su contraseña"
          className="bg-white border w-full h-10 
          focus:outline-none
          appearance-none py-2 px-5 text-start flex justify-start items-start"
          onChange={handleInputChangeLogIn}
        />
        {errorLogIn.upperCase ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorLogIn.upperCase}
          </small>
        ) : null}
        {errorLogIn.lowerCase ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorLogIn.lowerCase}
          </small>
        ) : null}
        {errorLogIn.number ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorLogIn.number}
          </small>
        ) : null}
        {errorLogIn.passwordLength ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorLogIn.passwordLength}
          </small>
        ) : null}
        <div
          className="w-full py-2 flex flex-row self-end justify-end 
          text-sm text-blue-400  mb-4"
        >
          <button
            className="flex hover:underline"
            value="forgotPass"
            onClick={handleComponents}
          >
            Olvidé mi contraseña
          </button>
        </div>
        <button
          type="submit"
          className="w-full border border-header bg-header 
            text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded"
        >
          Enviar
        </button>
      </form>
      <div
        className="w-full px-2 pt-2 pb-5 flex flex-row self-start justify-start 
          text-sm text-blue-400"
      >
        <button className="flex" onClick={() => setLogIn(false)}>
          <AiOutlineArrowLeft className="flex self-center pr-1" fontSize={16} />{" "}
          Volver
        </button>
      </div>
      <div
        className="w-full flex flex-row self-center justify-center 
          text-sm hover:underline"
      >
        <button className="flex" value="register" onClick={handleComponents}>
          ¿No tiene una cuenta? Regístrese
        </button>
      </div>
    </div>
  );
};

export default LogIn;
