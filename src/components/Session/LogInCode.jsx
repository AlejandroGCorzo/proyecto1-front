import { encode } from "js-base64";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  logInSetNewCodeAction,
  logInWithCodeAction,
} from "../../redux/userActions";
const LogInCode = ({ logInCode, setLogInCode, code, setCode }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    code: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCodeLogIn = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value === "back") {
      setLogInCode(false);
      setCode(false);
    }
    if (value === "backLogIn") {
      setCode(false);
      setLogInCode(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name;
    if (name === "logInWithCode") {
      setLogInCode(false);
      setCode(false);
      dispatch(logInWithCodeAction({ code: Number(input.code) }));
    }
    if (name === "sendLogInCode") {
      setLogInCode(false);
      setCode(true);

      dispatch(logInSetNewCodeAction({ email: encode(input.email) }));
    }
  };
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
      text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded"
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
