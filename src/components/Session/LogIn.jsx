import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logInAction } from "../../redux/userActions";
import { encode } from "js-base64";
function validateEmail(input) {
  let errors = {};
  if (input.email.length && !/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Ingresa un email valido, por ejemplo: nombre@ejemplo.com";
  }
  if (!input.email) {
    errors.email = "Email requerido";
  }
  return errors;
}

const LogIn = ({ logIn, setLogIn, handleComponents, validatePassword }) => {
  const dispatch = useDispatch();
  let [inputLogIn, setInputLogIn] = useState({
    email: "",
    password: "",
  });
  let [errorEmail, setErrorEmail] = useState({ email: "" });
  let [errorLogIn, setErrorLogIn] = useState({
    upperCase: "",
    lowerCase: "",
    number: "",
    passwordLength: "",
  });
  const validateOnBlur = (e) => {
    const { name, value } = e.target;
    if (name === "email" && !inputLogIn.email.length) {
      setInputLogIn((prev) => ({ ...prev, [name]: value }));
      let errorObjEmail = validateEmail({
        [name]: value,
      });
      setErrorEmail(errorObjEmail);
    }
  };
  const handleInputChangeLogIn = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      setInputLogIn((prev) => ({ ...prev, [name]: value }));
      let errorObjEmail = validateEmail({
        [name]: value,
      });
      setErrorEmail(errorObjEmail);
    }
    setInputLogIn((prev) => ({ ...prev, [name]: value }));
    let errorObj = validatePassword({
      ...inputLogIn,
      [name]: value,
    });
    setErrorLogIn((prev) => ({ ...prev, ...errorObj }));
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

  let isDisabled =
    !inputLogIn.email.length ||
    !inputLogIn.password.length ||
    errorLogIn.lowerCase?.length ||
    errorLogIn.upperCase?.length ||
    errorLogIn.number?.length ||
    errorLogIn.passwordLength?.length ||
    errorEmail?.email?.length
      ? true
      : false;

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
          appearance-none py-2 px-5 text-start flex justify-start items-start mb-2"
          onChange={handleInputChangeLogIn}
          onBlur={validateOnBlur}
        />
        {errorEmail?.email?.length ? (
          <small className="h-auto text-red-600 w-full flex self-start mb-2">
            {errorEmail.email}
          </small>
        ) : null}
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
        {errorLogIn.upperCase?.length ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorLogIn.upperCase}
          </small>
        ) : null}
        {errorLogIn.lowerCase?.length ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorLogIn.lowerCase}
          </small>
        ) : null}
        {errorLogIn.number?.length ? (
          <small className="h-6 text-red-600 w-full flex self-start mb-1">
            {errorLogIn.number}
          </small>
        ) : null}
        {errorLogIn.passwordLength?.length ? (
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
            text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded disabled:bg-header/80 disabled:text-fontLigth"
          disabled={isDisabled}
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
