import Users from "./components/Users";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers } from "./redux/userSlice";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  /* const dispatch = useDispatch();
  const data = useSelector((state) => state.users.users);

  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_API)
      .then((res) => res.json())
      .then((data) => dispatch(getUsers(data)))
      .catch((error) => console.log(error));
  }, []); */

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
      </Routes>
    </div>
  );
}

export default App;
