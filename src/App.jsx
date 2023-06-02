import Users from "./components/Users";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "./redux/userSlice";
import ProductDetail from "./components/ProductDetail";



function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.users);
  const product = {
    name: 'Nombre del producto',
    description: 'Descripción del producto',
    price: '$19.99',
    image: 'ruta-de-la-imagen.jpg'
  };
  useEffect(() => {
    fetch(import.meta.env.VITE_REACT_APP_API)
      .then((res) => res.json())
      .then((data) => dispatch(getUsers(data)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex w-screen">
    {/* // <div class="flex justify-start items-center flex-col text-center"> */}
      {/* <Header /> */}
      {/* <Users data={data} /> */}
     
      <ProductDetail product={product} />
      
    </div>
  );
}

export default App;
