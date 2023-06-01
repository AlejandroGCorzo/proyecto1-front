import React, { useEffect, useState } from "react";
import Slide from "./Slide";
import CardsSlider from "./CardsSlider";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getImages = () => {
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then((res) => res.json())
        .then((data) =>
          setData(
            data.map((item) => {
              return {
                url: item.url,
                title: item.title,
              };
            })
          )
        )
        .catch((error) => console.log(error));
    };
    getImages();
  }, []);

  return (
    <div className=" w-full flex flex-col justify-center items-center gap-6 ">
      <div className="w-full max-h-max mt-[38%] sm:mt-[21%] md:max-lg:mt-[15.5%] lg:mt-0">
        <Slide data={data.slice(0, 6)} />
      </div>
      <div className="w-[95%] h-auto flex justify-center items-center flex-col">
        <div className="py-4 w-full 2xl:w-[80%] flex items-center justify-between text-nav font-semibold">
          <p className="text-lg md:text-2xl py-1">LANZAMIENTOS</p>
          <button className="border border-orange py-1 px-3 rounded-full text-sm md:text-base text-orange hover:text-white hover:bg-orange transition-all ease-in-out">
            ver todo
          </button>
        </div>
        <CardsSlider data={data.slice(0, 30)} />
      </div>
      <div className="w-[95%] h-auto flex justify-center items-center flex-col">
        <div className="py-4 w-full 2xl:w-[80%] flex items-center justify-between  text-nav font-semibold">
          <p className="text-lg md:text-2xl py-1">RECOMENDADOS</p>
          <button className="border border-orange py-1 px-3 rounded-full text-sm md:text-base text-orange hover:text-white hover:bg-orange transition-all ease-in-out">
            ver todo
          </button>
        </div>
        <CardsSlider data={data.slice(0, 30)} />
      </div>
      <div className="w-full lg:w-[85%] flex flex-row justify-center items-center p-10 mt-10 gap-3">
        <div className="border rounded-md shadow p-4 h-[70px] w-1/6 bg-white flex justify-center items-center">
          <img src="/fila.jpg" alt="fila icon" className="w-1/3" />
        </div>
        <div className="border rounded-md shadow p-4 h-[70px] w-1/6 bg-white flex justify-center items-center">
          <img src="/champion.webp" alt="champion icon" className="w-2/3" />
        </div>
        <div className="border rounded-md shadow p-4 h-[70px] w-1/6 bg-white flex justify-center items-center">
          <img src="/jordan.png" alt="jordan icon" className="w-1/2" />
        </div>
        <div className="border rounded-md shadow p-4 h-[70px] w-1/6 bg-white flex justify-center items-center">
          <img src="/adidas.jpeg" alt="adidas icon" className="w-1/2" />
        </div>
        <div className="border rounded-md shadow p-4 h-[70px] w-1/6 bg-white flex justify-center items-center">
          <img src="/nike.png" alt="nike icon" className="w-1/2" />
        </div>
        <div className="border rounded-md shadow p-4 h-[70px] w-1/6 bg-white flex justify-center items-center">
          <img src="/puma.webp" alt="puma icon" className="w-1/2" />
        </div>
      </div>
      <div className="w-[95%] h-auto flex justify-center items-center flex-col">
        <div className="py-4 w-full 2xl:w-[80%] flex items-center justify-between  text-nav font-semibold">
          <p className="text-lg md:text-2xl py-1">DESTACADOS</p>
          <button className="border border-orange py-1 px-3 rounded-full text-sm md:text-base text-orange hover:text-white hover:bg-orange transition-all ease-in-out">
            ver todo
          </button>
        </div>
        <CardsSlider data={data.slice(0, 30)} />
      </div>
    </div>
  );
};

export default Home;
