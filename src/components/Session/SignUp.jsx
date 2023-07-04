import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { sendCodeAction, signUpAction } from "../../redux/userActions";
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

const SignUp = ({
  signUpPass,
  setSignUpPass,
  setRegister,
  codeSignUp,
  setCodeSignUp,
  validatePassword,
}) => {
  const dispatch = useDispatch();
  let [inputSignUp, setInputSignUp] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  let [errorEmail, setErrorEmail] = useState({ email: "" });
  let [errorSignUp, setErrorSignUp] = useState({
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
    if (name === "email" && !inputSignUp.email.length) {
      setInputSignUp((prev) => ({ ...prev, [name]: value }));
      let errorObjEmail = validateEmail({
        [name]: value,
      });
      setErrorEmail(errorObjEmail);
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    setSignUpPass(false);
    setRegister(false);
  };
  const handleCodeSignUp = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value === "back") {
      setSignUpPass(false);
      setCodeSignUp(false);
      setRegister(false);
      return;
    }
    if (name === "sendCode") {
      dispatch(sendCodeAction({ email: encode(inputSignUp.email) }));
      setSignUpPass(false);
      setCodeSignUp(true);
    }
    return;
  };

  const handleInputChangeSignUp = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      setInputSignUp((prev) => ({ ...prev, [name]: value }));
      let errorObjEmail = validateEmail({
        [name]: value,
      });
      setErrorEmail(errorObjEmail);
    }
    setInputSignUp((prev) => ({ ...prev, [name]: value }));
    let errorObj = validatePassword({
      ...inputSignUp,
      [name]: value,
    });
    setErrorSignUp((prev) => ({ ...prev, ...errorObj }));
  };
  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    let encriptedEmail = encode(inputSignUp.email);
    let encriptedPassword = encode(inputSignUp.password);
    dispatch(
      signUpAction({
        email: encriptedEmail,
        password: encriptedPassword,
        code: Number(inputSignUp.code),
      })
    );
    setSignUpPass(false);
    setCodeSignUp(false);
    setRegister(false);
  };

  let isDisabled =
    !inputSignUp.email.length || errorEmail?.email?.length ? true : false;
  let isRegisterDisabled =
    !Object.values(inputSignUp).length ||
    errorSignUp.lowerCase?.length ||
    errorSignUp.upperCase?.length ||
    errorSignUp.number?.length ||
    errorSignUp.passwordLength?.length
      ? true
      : false;

  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      <span className="py-4 font-semibold">Elija una opción para ingresar</span>
      {codeSignUp ? (
        <>
          <form onSubmit={handleSubmitSignUp}>
            <input
              type="text"
              name="code"
              placeholder="Ingrese su código de acceso"
              className="bg-white border w-full h-10 
            focus:outline-none
            appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
              value={inputSignUp.code}
              onChange={handleInputChangeSignUp}
            />
            <input
              type="password"
              name="password"
              value={inputSignUp.password}
              placeholder="Ingrese su contraseña"
              className="bg-white border w-full h-10 
            focus:outline-none
            appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
              onChange={handleInputChangeSignUp}
            />
            {errorSignUp.upperCase?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSignUp.upperCase}
              </small>
            ) : null}
            {errorSignUp.lowerCase?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSignUp.lowerCase}
              </small>
            ) : null}
            {errorSignUp.number?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSignUp.number}
              </small>
            ) : null}
            {errorSignUp.passwordLength?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSignUp.passwordLength}
              </small>
            ) : null}
            <input
              type="password"
              name="confirmPassword"
              value={inputSignUp.confirmPassword}
              placeholder="Confirmar contraseña"
              className="bg-white border w-full h-10 
            focus:outline-none
            appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
              onChange={handleInputChangeSignUp}
            />
            {errorSignUp.confirmPassword.upperCase?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSignUp.confirmPassword.upperCase}
              </small>
            ) : null}
            {errorSignUp.confirmPassword.lowerCase?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSignUp.confirmPassword.lowerCase}
              </small>
            ) : null}
            {errorSignUp.confirmPassword.number?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSignUp.confirmPassword.number}
              </small>
            ) : null}
            {errorSignUp.confirmPassword.passwordLength?.length ? (
              <small className="h-6 text-red-600 w-full flex self-start mb-1">
                {errorSignUp.confirmPassword.passwordLength}
              </small>
            ) : null}
            <button
              type="submit"
              className="w-full border border-header bg-header 
          text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded"
            >
              Crear
            </button>
          </form>
          <div
            className="w-full p-2 flex flex-row self-start justify-start 
        text-sm text-blue-400 ml-4"
          >
            <button className="flex" value={"back"} onClick={handleCodeSignUp}>
              <AiOutlineArrowLeft
                className="flex self-center pr-1"
                fontSize={16}
              />{" "}
              Volver
            </button>
          </div>{" "}
        </>
      ) : (
        <>
          <form onSubmit={handleCodeSignUp} name="sendCode">
            <input
              type="email"
              name="email"
              placeholder="Ej.: ejemplo@gmail.com"
              className="bg-white border w-full h-10 
              focus:outline-none
              appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
              value={inputSignUp.email}
              onChange={handleInputChangeSignUp}
              onBlur={validateOnBlur}
            />
            {errorEmail?.email?.length ? (
              <small className="h-auto text-red-600 w-full flex self-start mb-2">
                {errorEmail.email}
              </small>
            ) : null}
            <button
              value="sendCode"
              type="submit"
              className="w-full border border-header bg-header 
            text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded disabled:bg-header/80 disabled:text-fontLigth"
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

export default SignUp;
