import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import SignUp from "../Session/SignUp";
import LogInCode from "../Session/LogInCode";
import LogIn from "../Session/LogIn";
import ResetPassword from "../Session/ResetPassword";
import Session from "../Session/Session";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../../redux/userActions";

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

const UserDropdown = () => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [logIn, setLogIn] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [signUpPass, setSignUpPass] = useState(false);
  const [register, setRegister] = useState(false);
  const [logInCode, setLogInCode] = useState(false);
  const [code, setCode] = useState(false);
  const [codeSignUp, setCodeSignUp] = useState(false);
  const [codeReset, setCodeReset] = useState(false);
  const currentPath = useLocation();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

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

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutAction());
  };

  return (
    <>
      {currentPath.pathname === "/login" ? (
        <div className="flex flex-col justify-center items-center mt-56 bg-grey">
          <ul
            className={` text-nav w-96 font-medium flex flex-col justify-center items-center p-4  ${
              isLoggedIn ? "gap-2" : "gap-4"
            }`}
          >
            {register || codeSignUp ? (
              <SignUp
                register={register}
                setRegister={setRegister}
                setSignUpPass={setSignUpPass}
                signUpPass={signUpPass}
                setCodeSignUp={setCodeSignUp}
                codeSignUp={codeSignUp}
                validatePassword={validatePassword}
              />
            ) : null}
            {logInCode || code ? (
              <LogInCode
                logInCode={logInCode}
                setLogInCode={setLogInCode}
                setCode={setCode}
                code={code}
              />
            ) : null}
            {logIn && (
              <LogIn
                setLogIn={setLogIn}
                handleComponents={handleComponents}
                validatePassword={validatePassword}
              />
            )}
            {resetPass || codeReset ? (
              <ResetPassword
                setResetPass={setResetPass}
                setLogIn={setLogIn}
                codeReset={codeReset}
                setCodeReset={setCodeReset}
                validatePassword={validatePassword}
              />
            ) : null}
            {!register &&
            !logIn &&
            !logInCode &&
            !resetPass &&
            !code &&
            !codeReset &&
            !isLoggedIn ? (
              <>
                <li className="py-2 font-semibold">
                  Elija una opción para ingresar
                </li>
                <li className="bg-gray-100 border rounded w-80 h-10 focus:bg-blue-100">
                  <button
                    className="w-80 h-10 text-center flex justify-center items-center focus:bg-blue-100"
                    onClick={() => setLogInCode(true)}
                  >
                    Recibir codigo de acceso por e-mail
                  </button>
                </li>
                <li className="bg-gray-100 border rounded w-80 h-10 focus:bg-blue-100">
                  <button
                    className="w-80 h-10 text-center flex justify-center items-center focus:bg-blue-100"
                    onClick={() => setLogIn(true)}
                  >
                    Entrar con e-mail y contraseña
                  </button>
                </li>
              </>
            ) : !register &&
              !logIn &&
              !logInCode &&
              !resetPass &&
              !code &&
              !codeReset &&
              isLoggedIn ? (
              <Session />
            ) : null}
          </ul>
        </div>
      ) : (
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
            className={`dropdown-content menu bg-white text-nav w-96 font-medium flex justify-center items-center p-4 shadow-2xl ${
              isLoggedIn ? "gap-2" : "gap-4"
            }`}
          >
            {register || codeSignUp ? (
              <SignUp
                register={register}
                setRegister={setRegister}
                setSignUpPass={setSignUpPass}
                signUpPass={signUpPass}
                setCodeSignUp={setCodeSignUp}
                codeSignUp={codeSignUp}
                validatePassword={validatePassword}
              />
            ) : null}

            {logInCode || code ? (
              <LogInCode
                logInCode={logInCode}
                setLogInCode={setLogInCode}
                setCode={setCode}
                code={code}
              />
            ) : null}
            {logIn && (
              <LogIn
                setLogIn={setLogIn}
                handleComponents={handleComponents}
                validatePassword={validatePassword}
              />
            )}
            {resetPass || codeReset ? (
              <ResetPassword
                setResetPass={setResetPass}
                setLogIn={setLogIn}
                codeReset={codeReset}
                setCodeReset={setCodeReset}
                validatePassword={validatePassword}
              />
            ) : null}
            {!register &&
            !logIn &&
            !logInCode &&
            !resetPass &&
            !code &&
            !codeSignUp &&
            !codeReset &&
            !isLoggedIn ? (
              <>
                <li className="py-2 font-semibold">
                  Elija una opción para ingresar
                </li>
                <li className="bg-gray-100 border rounded w-80 h-10 focus:bg-blue-100">
                  <button
                    className="w-80 h-10 text-center flex justify-center focus:bg-blue-100"
                    onClick={() => setLogInCode(true)}
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
            ) : !register &&
              !logIn &&
              !logInCode &&
              !resetPass &&
              !code &&
              !codeSignUp &&
              !codeReset &&
              isLoggedIn ? (
              <Session />
            ) : null}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserDropdown;
