import { encode } from "js-base64";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  resetPasswordAction,
  resetPasswordCodeAction,
} from "../../redux/userActions";
import { useDispatch } from "react-redux";
const ResetPassword = ({
  resetPass,
  setResetPass,
  setLogIn,
  codeReset,
  setCodeReset,
  validatePassword,
}) => {
  const dispatch = useDispatch();
  let [inputReset, setInputReset] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  let [errorReset, setErrorReset] = useState({
    upperCase: "",
    lowerCase: "",
    number: "",
    passwordLength: "",
    confirmPassword: {
      upperCase: "",
      lowerCase: "",
      number: "",
      passwordLength: "",
    },
  });

  const handleGoBack = (e) => {
    e.preventDefault();
    setResetPass(false);
    setLogIn(true);
  };
  const handleInputChangeReset = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputReset((prev) => ({ ...prev, [name]: value }));
    let errorObj = validatePassword({
      ...inputReset,
      [name]: value,
    });
    setErrorReset(errorObj);
  };
  const handleCodeReset = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value === "back") {
      setResetPass(false);
      setCodeReset(false);
      setLogIn(true);
      return;
    }
    if (name === "sendCode") {
      setResetPass(false);
      setCodeReset(true);
      let encriptedEmail = encode(inputReset.email);
      dispatch(resetPasswordCodeAction({ email: encriptedEmail }));

      return;
    }
    return;
  };

  const handleSubmitReset = (e) => {
    e.preventDefault();

    let encriptedPassword = encode(inputReset.password);
    setCodeReset(false);
    setLogIn(false);
    setResetPass(false);
    dispatch(
      resetPasswordAction({
        password: encriptedPassword,
        code: inputReset.code,
      })
    );
  };
  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      <span className="py-4 font-semibold">Elija una opción para ingresar</span>
      {codeReset ? (
        <form onSubmit={handleSubmitReset}>
          <input
            type="text"
            name="code"
            placeholder="Ingrese su código de acceso"
            className="bg-white border w-full h-10 
              focus:outline-none
              appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
            value={inputReset.code}
            onChange={handleInputChangeReset}
          />
          <input
            type="password"
            name="password"
            value={inputReset.password}
            placeholder="Ingrese su contraseña"
            className="bg-white border w-full h-10 
              focus:outline-none
              appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
            onChange={handleInputChangeReset}
          />
          {errorReset.upperCase ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.upperCase}
            </small>
          ) : null}
          {errorReset.lowerCase ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.lowerCase}
            </small>
          ) : null}
          {errorReset.number ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.number}
            </small>
          ) : null}
          {errorReset.passwordLength ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.passwordLength}
            </small>
          ) : null}
          <input
            type="password"
            name="confirmPassword"
            value={inputReset.confirmPassword}
            placeholder="Confirmar contraseña"
            className="bg-white border w-full h-10 
              focus:outline-none
              appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
            onChange={handleInputChangeReset}
          />
          {errorReset.confirmPassword.upperCase ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.confirmPassword.upperCase}
            </small>
          ) : null}
          {errorReset.confirmPassword.lowerCase ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.confirmPassword.lowerCase}
            </small>
          ) : null}
          {errorReset.confirmPassword.number ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.confirmPassword.number}
            </small>
          ) : null}
          {errorReset.confirmPassword.passwordLength ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.confirmPassword.passwordLength}
            </small>
          ) : null}
          <button
            type="submit"
            className="w-full border border-header bg-header 
            text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded"
          >
            Crear
          </button>
          <div
            className="w-full p-2 flex flex-row self-start justify-start 
          text-sm text-blue-400"
          >
            <button className="flex" value={"back"} onClick={handleCodeReset}>
              <AiOutlineArrowLeft
                className="flex self-center pr-1"
                fontSize={16}
              />{" "}
              Volver
            </button>
          </div>{" "}
        </form>
      ) : (
        <>
          <form name="sendCode" onSubmit={handleCodeReset}>
            <input
              type="email"
              name="email"
              placeholder="Ej.: ejemplo@gmail.com"
              className="bg-white border w-full h-10 
              focus:outline-none
              appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
              value={inputReset.email}
              onChange={handleInputChangeReset}
            />
            <button
              type="submit"
              className="w-full border border-header bg-header 
            text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded"
            >
              Enviar
            </button>
          </form>
          <div
            className="w-full p-2 flex flex-row self-start justify-start 
          text-sm text-blue-400 ml-4"
          >
            <button className="flex" onClick={handleGoBack}>
              <AiOutlineArrowLeft
                className="flex self-center pr-1"
                fontSize={16}
              />{" "}
              Volver
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
