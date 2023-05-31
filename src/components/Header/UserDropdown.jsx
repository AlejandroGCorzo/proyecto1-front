import React, { useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";

const SingUp = ({ register, setRegister, code, setCode }) => {
  const handleCodeRegister = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "back") {
      setRegister(false);
      return;
    }
    if (value === "sendCode") {
      setRegister(false);
      setCode(true);
      return;
    }
    if (value === "backRegister") {
      setCode(false);
      setRegister(true);
      return;
    }
    return;
  };
  console.log(code);
  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      {code ? (
        <>
          <input
            type="text"
            name="code"
            placeholder="Ingrese su código de acceso"
            className="bg-white border w-full h-10 
        focus:outline-none
        appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
          />
          <button
            type="submit"
            className="w-full border border-header bg-header 
      text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded"
            value="confirm"
            onClick={handleCodeRegister}
          >
            Confirmar
          </button>
          <div
            className="w-full p-2 flex flex-row self-start justify-start 
    text-sm text-blue-400"
          >
            <button
              className="flex"
              value="backRegister"
              onClick={handleCodeRegister}
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
          <input
            type="email"
            name="email"
            placeholder="Ej.: ejemplo@gmail.com"
            className="bg-white border w-full h-10 
      focus:outline-none
      appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
          />
          <button
            type="submit"
            className="w-full border border-header bg-header 
    text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded"
            value="sendCode"
            onClick={handleCodeRegister}
          >
            Enviar
          </button>
          <div
            className="w-full p-2 flex flex-row self-start justify-start 
  text-sm text-blue-400"
          >
            <button className="flex" value="back" onClick={handleCodeRegister}>
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

const LogIn = ({ logIn, setLogIn, handleComponents }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      <input
        type="email"
        name="email"
        placeholder="Ej.: ejemplo@gmail.com"
        className="bg-white border w-full h-10 
        focus:outline-none
        appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
      />
      <input
        type="password"
        name="password"
        placeholder="Ingrese su contraseña"
        className="bg-white border w-full h-10 
        focus:outline-none
        appearance-none py-2 px-5 text-start flex justify-start items-start"
      />
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

const ResetPassword = ({
  resetPass,
  setResetPass,
  setLogIn,
  codeReset,
  setCodeReset,
}) => {
  const handleGoBack = (e) => {
    e.preventDefault();
    setResetPass(false);
    setLogIn(true);
  };
  const handleCodeReset = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "back") {
      setResetPass(false);
      setCodeReset(false);
      setLogIn(true);
      return;
    }
    if (value === "sendCode") {
      setResetPass(false);
      setCodeReset(true);

      return;
    }
    return;
  };
  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      {codeReset ? (
        <>
          <input
            type="text"
            name="code"
            placeholder="Ingrese su código de acceso"
            className="bg-white border w-full h-10 
            focus:outline-none
            appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            className="bg-white border w-full h-10 
            focus:outline-none
            appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Confirmar contraseña"
            className="bg-white border w-full h-10 
            focus:outline-none
            appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
          />
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
        </>
      ) : (
        <>
          <input
            type="email"
            name="email"
            placeholder="Ej.: ejemplo@gmail.com"
            className="bg-white border w-full h-10 
            focus:outline-none
            appearance-none py-2 px-5 text-start flex justify-start items-start mb-4"
          />
          <button
            value="sendCode"
            type="submit"
            className="w-full border border-header bg-header 
          text-white hover:bg-white hover:text-nav transition-all ease-in-out duration-300 h-10 rounded"
            onClick={handleCodeReset}
          >
            Enviar
          </button>
          <div
            className="w-full p-2 flex flex-row self-start justify-start 
        text-sm text-blue-400"
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

const UserDropdown = () => {
  const dropdownRef = useRef(null);
  const [logIn, setLogIn] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [register, setRegister] = useState(false);
  const [code, setCode] = useState(false);
  const [codeReset, setCodeReset] = useState(false);

  const toggleDropdown = () => {
    dropdownRef.current.classList.toggle("dropdown-open");
    document.activeElement.blur();
  };

  const handleComponents = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "forgotPass") {
      setResetPass(true);
      setLogIn(false);
    } else if (value === "register") {
      setRegister(true);
      setLogIn(false);
    }
  };

  return (
    <div className="dropdown dropdown-end " ref={dropdownRef}>
      <div
        tabIndex={0}
        className="btn m-1"
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleDropdown();
          }
        }}
      >
        <FaRegUser color="white" fontSize={20} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-white text-nav w-96 font-medium flex justify-center items-center p-4 shadow-2xl gap-4"
      >
        <li className="py-2 font-semibold">Elija una opción para ingresar</li>

        {register || code ? (
          <SingUp setRegister={setRegister} setCode={setCode} code={code} />
        ) : null}
        {logIn && (
          <LogIn setLogIn={setLogIn} handleComponents={handleComponents} />
        )}
        {resetPass || codeReset ? (
          <ResetPassword
            setResetPass={setResetPass}
            setLogIn={setLogIn}
            codeReset={codeReset}
            setCodeReset={setCodeReset}
          />
        ) : null}
        {!register && !logIn && !resetPass && !code && !codeReset && (
          <>
            <li className="bg-gray-100 border rounded w-80 h-10 focus:bg-blue-100">
              <button
                className="w-80 h-10 text-center flex justify-center focus:bg-blue-100"
                onClick={() => setRegister(true)}
              >
                Recibir codigo de acceso por e-mail
              </button>
            </li>
            <li className="bg-gray-100 border rounded w-80 h-10 focus:bg-blue-100">
              <button
                className="w-80 h-10 text-center flex justify-center focus:bg-blue-100"
                onClick={() => setLogIn(true)}
              >
                Entrar con e-mail y contraseña
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default UserDropdown;
