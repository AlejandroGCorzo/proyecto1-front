import { encode } from "js-base64";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  logInSetNewCodeAction,
  logInWithCodeAction,
} from "../../redux/userActions";
import { setUserError } from "../../redux/userSlice";

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

const LogInCode = ({ logInCode, setLogInCode, code, setCode }) => {
  const dispatch = useDispatch();
  const { userError } = useSelector((state) => state.users);
  const [input, setInput] = useState({
    email: "",
    code: "",
  });
  const [emailError, setEmailError] = useState({ email: "" });

  const validateOnBlur = (e) => {
    const { name, value } = e.target;
    if (name === "email" && !input.email.length) {
      setInput((prev) => ({ ...prev, [name]: value }));
      let errorObjEmail = validateEmail({
        [name]: value,
      });
      setEmailError((prev) => ({ ...prev, ...errorObjEmail }));
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      setInput((prev) => ({ ...prev, [name]: value }));
      let errorObjEmail = validateEmail({
        [name]: value,
      });
      setEmailError(errorObjEmail);
    }
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeLogIn = (e) => {
    e.preventDefault();
    const { value } = e.target;

    if (value === "back") {
      setLogInCode(false);
      setCode(false);
    }
    if (value === "backLogIn") {
      setCode(false);
      setLogInCode(true);
      dispatch(setUserError(""));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "logInWithCode") {
      setLogInCode(false);
      setCode(false);
      dispatch(logInWithCodeAction({ code: Number(input.code) }));
    }
    if (name === "sendLogInCode") {
      dispatch(logInSetNewCodeAction({ email: encode(input.email) }));
      if (!userError) {
        setLogInCode(false);
        setCode(true);
      } else {
        setLogInCode(true);
        setCode(false);
      }
      //conprobar que el usuario exista
    }
  };
  let isDisabled =
    !Object.values(emailError).length && input.email?.length ? false : true;
  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      <span className="py-4 font-semibold">Elija una opción para ingresar</span>
      {code ? (
        <>
          <form onSubmit={handleSubmit} name="logInWithCode">
            <input
              type="text"
              name="code"
              placeholder="Ingrese su código de acceso"
              className="bg-white border w-full h-10 
        focus:outline-none
        appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
              value={input.code}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-full border border-header bg-header 
      text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded disabled:bg-header/80 disabled:text-fontLigth"
              disabled={input.code.length ? false : true}
            >
              Confirmar
            </button>
          </form>
          <div
            className="w-full p-2 flex flex-row self-start justify-start 
    text-sm text-blue-400"
          >
            <button
              className="flex"
              value="backLogIn"
              onClick={handleCodeLogIn}
            >
              <AiOutlineArrowLeft
                className="flex self-center pr-1"
                fontSize={16}
              />{" "}
              Volver
            </button>
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} name="sendLogInCode">
            <input
              type="email"
              name="email"
              placeholder="Ej.: ejemplo@gmail.com"
              className="bg-white border w-full h-10 
      focus:outline-none
      appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
              value={input.email}
              onChange={handleInputChange}
              onBlur={validateOnBlur}
            />
            {emailError?.email?.length ? (
              <small className="h-auto text-red-600 w-full flex self-start mb-2">
                {emailError.email}
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
  text-sm text-blue-400"
          >
            <button className="flex" value="back" onClick={handleCodeLogIn}>
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

export default LogInCode;
