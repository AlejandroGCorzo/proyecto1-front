import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Navigate, useLocation } from "react-router-dom";
import SignUp from "../Session/SignUp";
import LogInCode from "../Session/LogInCode";
import LogIn from "../Session/LogIn";
import ResetPassword from "../Session/ResetPassword";
import Session from "../Session/Session";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../../redux/userActions";
import ServerError from "../../utils/ServerError";
import { setUserError } from "../../redux/userSlice";

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

const UserDropdown = ({ toggleDropdownUser, dropdownUserRef }) => {
  const dispatch = useDispatch();
  const currentPath = useLocation();
  const { isLoggedIn, userRole, userError, loading } = useSelector(
    (state) => state.users
  );
  const condition = currentPath.pathname === "/login";
  const [logIn, setLogIn] = useState(false);
  const [resetPass, setResetPass] = useState(false);
  const [signUpPass, setSignUpPass] = useState(false);
  const [register, setRegister] = useState(false);
  const [logInCode, setLogInCode] = useState(false);
  const [code, setCode] = useState(false);
  const [codeSignUp, setCodeSignUp] = useState(false);
  const [codeReset, setCodeReset] = useState(false);

  const handleComponents = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value === "forgotPass") {
      setResetPass(true);
      setLogIn(false);
    } else if (value === "register") {
      setRegister(true);
      setLogIn(false);
    }
  };
  const handleRedirect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value === "loginCode") {
      setLogInCode(true);
    } else if (value === "login") {
      setLogIn(true);
    }
    if (userError) {
      dispatch(setUserError(""));
    }
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutAction());
  };

  return (
    <>
      {condition ? (
        <div className="flex flex-col justify-center items-center bg-grey flex-1 md:flex-auto">
          {condition && isLoggedIn && <Navigate to="/" replace={true} />}
          <ul
            className={` text-nav w-96 font-medium flex flex-col justify-center items-center p-4 text-base ${
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
            {loading && (
              <div className="z-50 flex w-36 h-36 justify-center items-center ">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
            {!register &&
            !logIn &&
            !logInCode &&
            !resetPass &&
            !code &&
            !codeReset &&
            !codeSignUp &&
            !isLoggedIn &&
            !loading ? (
              <>
                <li className="py-2 font-semibold">
                  Elija una opción para ingresar
                </li>
                <li
                  className={`${
                    condition ? "bg-white" : "bg-gray-100"
                  } border rounded w-80 h-10 focus:bg-blue-100`}
                >
                  <button
                    className="w-80 h-10 text-center flex justify-center items-center focus:bg-blue-100"
                    onClick={handleRedirect}
                    value="loginCode"
                  >
                    Recibir codigo de acceso por e-mail
                  </button>
                </li>
                <li
                  className={`${
                    condition ? "bg-white" : "bg-gray-100"
                  } border rounded w-80 h-10 focus:bg-blue-100`}
                >
                  <button
                    className="w-80 h-10 text-center flex justify-center items-center focus:bg-blue-100"
                    onClick={handleRedirect}
                    value="login"
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
              !codeSignUp &&
              isLoggedIn ? (
              <Session handleLogOut={handleLogOut} userRole={userRole} />
            ) : null}
          </ul>
        </div>
      ) : (
        <div className="dropdown dropdown-end " ref={dropdownUserRef}>
          <div
            tabIndex={0}
            className="btn m-1 bg-header outline-none border-none "
            onClick={toggleDropdownUser}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleDropdownUser();
              }
            }}
          >
            <FaRegUser color="white" fontSize={20} />
          </div>
          <ul
            tabIndex={0}
            className={`dropdown-content menu focus-visible:outline-none bg-white text-nav w-96 font-medium flex justify-center items-center p-4 shadow-2xl text-base border-none  ${
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
            {loading && (
              <div className="z-50 flex w-36 h-36 justify-center items-center">
                <span className="loading loading-spinner loading-lg text-neutral"></span>
              </div>
            )}
            {!register &&
            !logIn &&
            !logInCode &&
            !resetPass &&
            !code &&
            !codeSignUp &&
            !codeReset &&
            !isLoggedIn &&
            !loading ? (
              <>
                <li className="py-2 font-semibold">
                  Elija una opción para ingresar
                </li>
                <li
                  className={`${
                    condition ? "bg-white" : "bg-gray-100"
                  } border rounded w-80 h-10 focus:bg-blue-100`}
                >
                  <button
                    className="w-80 h-10 text-center flex justify-center focus:bg-blue-100"
                    onClick={handleRedirect}
                    value="loginCode"
                  >
                    Recibir codigo de acceso por e-mail
                  </button>
                </li>
                <li
                  className={`${
                    condition ? "bg-white" : "bg-gray-100"
                  } border rounded w-80 h-10 focus:bg-blue-100`}
                >
                  <button
                    className="w-80 h-10 text-center flex justify-center focus:bg-blue-100"
                    onClick={handleRedirect}
                    value="login"
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
              <Session handleLogOut={handleLogOut} userRole={userRole} />
            ) : null}
            {userError.length > 0 && <ServerError error={userError} />}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserDropdown;
