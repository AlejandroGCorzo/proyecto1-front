import { encode } from "js-base64";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  resetPasswordAction,
  resetPasswordCodeAction,
} from "../../redux/userActions";
import { useDispatch } from "react-redux";

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
  let [errorEmail, setErrorEmail] = useState({ email: "" });
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

  const validateOnBlur = (e) => {
    const { name, value } = e.target;
    if (name === "email" && !inputReset.email.length) {
      setInputReset((prev) => ({ ...prev, [name]: value }));
      let errorObjEmail = validateEmail({
        [name]: value,
      });
      setErrorEmail((prev) => ({ ...prev, ...errorObjEmail }));
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    setResetPass(false);
    setLogIn(true);
  };
  const handleInputChangeReset = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      setInputReset((prev) => ({ ...prev, [name]: value }));
      let errorObjEmail = validateEmail({
        [name]: value,
      });
      setErrorEmail(errorObjEmail);
    }
    setInputReset((prev) => ({ ...prev, [name]: value }));
    let errorObj = validatePassword({
      ...inputReset,
      [name]: value,
    });
    setErrorReset((prev) => ({ ...prev, ...errorObj }));
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
        code: Number(inputReset.code),
      })
    );
  };
  let isDisabled =
    !errorEmail?.email?.length && inputReset.email?.length ? false : true;
  let isCreateDisabled =
    !Object.values(inputReset).length ||
    errorReset.lowerCase?.length ||
    errorReset.upperCase?.length ||
    errorReset.number?.length ||
    errorReset.passwordLength?.length ||
    errorReset.confirmPassword?.lowerCase.length ||
    errorReset.confirmPassword?.upperCase.length ||
    errorReset.confirmPassword?.number.length ||
    errorReset.confirmPassword?.passwordLength.length
      ? true
      : false;

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
          {errorReset.upperCase?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.upperCase}
            </small>
          ) : null}
          {errorReset.lowerCase?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.lowerCase}
            </small>
          ) : null}
          {errorReset.number?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.number}
            </small>
          ) : null}
          {errorReset.passwordLength?.length ? (
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
          {errorReset.confirmPassword.upperCase?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.confirmPassword.upperCase}
            </small>
          ) : null}
          {errorReset.confirmPassword.lowerCase?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.confirmPassword.lowerCase}
            </small>
          ) : null}
          {errorReset.confirmPassword.number?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.confirmPassword.number}
            </small>
          ) : null}
          {errorReset.confirmPassword.passwordLength?.length ? (
            <small className="h-6 text-red-600 w-full flex self-start mb-1">
              {errorReset.confirmPassword.passwordLength}
            </small>
          ) : null}
          <button
            type="submit"
            className="w-full border border-header bg-header 
              text-white hover:bg-white  transition-all ease-in-out duration-300 h-10 rounded hover:text-fontDark  disabled:bg-header/80 disabled:text-fontLigth"
            disabled={isCreateDisabled}
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
              onBlur={validateOnBlur}
            />
            {errorEmail?.email?.length ? (
              <small className="h-auto text-red-600 w-full flex self-start mb-2">
                {errorEmail.email}
              </small>
            ) : null}
            <button
              type="submit"
              className="w-full border border-header bg-header 
              text-white hover:bg-white  transition-all ease-in-out duration-300 h-10 rounded hover:text-fontDark  disabled:bg-header/80 disabled:text-fontLigth"
              disabled={isDisabled}
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
