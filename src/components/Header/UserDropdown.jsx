import React, { useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";

function validatePassword(input) {
  const regexUpperCase = /^(?=.*[A-Z])/;
  const regexLowerCase = /^(?=.*[a-z])/;
  const regexNumber = /^(?=.*\d)/;
  const regexLength = /^.{8,}$/;

  let errors = {
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
  };

  if (!regexUpperCase.test(input.password)) {
    errors.upperCase = "ABC Una letra mayúscula";
  }

  if (!regexLowerCase.test(input.password)) {
    errors.lowerCase = "abc Una letra minúscula";
  }

  if (!regexNumber.test(input.password)) {
    errors.number = "Un número";
  }

  if (!regexLength.test(input.password)) {
    errors.passwordLength = "Mínimo 8 caracteres";
  }

  if (input.confirmPassword) {
    if (!regexUpperCase.test(input.confirmPassword)) {
      errors.confirmPassword.upperCase = "ABC Una letra mayúscula";
    }

    if (!regexLowerCase.test(input.confirmPassword)) {
      errors.confirmPassword.lowerCase = "abc Una letra minúscula";
    }

    if (!regexNumber.test(input.confirmPassword)) {
      errors.confirmPassword.number = "Un número";
    }

    if (!regexLength.test(input.confirmPassword)) {
      errors.confirmPassword.passwordLength = "Mínimo 8 caracteres";
    }
  }

  return errors;
}

const SignUp = ({ register, setRegister, code, setCode, setUser }) => {
  const handleCodeRegister = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "back") {
      setRegister(false);
      return;
    }
    if (value === "backRegister") {
      setCode(false);
      setRegister(true);
      return;
    }
    if (value === "confirm") {
      setRegister(false);
      setCode(false);
      setUser(true);
      return;
    }
    if (value === "sendCode") {
      setRegister(false);
      setCode(true);
      return;
    }
    return;
  };
  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    console.log("registrado");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      {code ? (
        <form onSubmit={handleCodeRegister}>
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
        </form>
      ) : (
        <form onSubmit={handleSubmitSignUp}>
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
        </form>
      )}
    </div>
  );
};

const LogIn = ({ logIn, setLogIn, handleComponents, setUser }) => {
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
    setUser(true);
    console.log("sesion iniciada");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
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

const ResetPassword = ({
  resetPass,
  setResetPass,
  setLogIn,
  codeReset,
  setCodeReset,
  setUser,
}) => {
  let [inputReset, setInputReset] = useState({
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

  const handleInputChangeReset = (e) => {
    e.preventDefault();
    setInputReset((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    let errorObj = validatePassword({
      ...inputReset,
      [e.target.name]: e.target.value,
    });
    setErrorReset(errorObj);
  };
  const handleSubmitReset = (e) => {
    e.preventDefault();
    setUser(true);
    console.log("contraseña reseteada");
  };
  return (
    <div className="flex flex-col justify-center items-center w-full px-8">
      {codeReset ? (
        <form onSubmit={handleSubmitReset}>
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
        <form>
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
        </form>
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
  const [user, setUser] = useState(false);

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
          <SignUp
            setRegister={setRegister}
            setCode={setCode}
            code={code}
            setUser={setUser}
          />
        ) : null}
        {logIn && (
          <LogIn
            setLogIn={setLogIn}
            handleComponents={handleComponents}
            setUser={setUser}
          />
        )}
        {resetPass || codeReset ? (
          <ResetPassword
            setResetPass={setResetPass}
            setLogIn={setLogIn}
            codeReset={codeReset}
            setCodeReset={setCodeReset}
            setUser={setUser}
          />
        ) : null}
        {!register && !logIn && !resetPass && !code && !codeReset && !user ? (
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
        ) : user ? (
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
        ) : null}
      </ul>
    </div>
  );
};

export default UserDropdown;
