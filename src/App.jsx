import Users from "./components/Users";
import Header from "./components/Header/Header";
import  ProductDetail  from "./components/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "./redux/userSlice";
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
    <div className="flex flex-col items-center">
    <Header />
    <ProductDetail />
  </div>
  )
  }
export default App;
