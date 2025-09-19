import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import searchpet from "./../../assets/allimgs/magnifier.png";
import Petscard from "../../Components/Petscard";
import notfound404 from "./../../assets/allimgs/404page.png";
import toast, { Toaster } from "react-hot-toast";
const Home = () => {
  const [Pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState("");
  const loadPets = async () => {
    const petsResponse = await axios.get(
      `${import.meta.env.VITE_API_URL}/pets`
    );
    setPets(petsResponse.data.data);
  };
  useEffect(() => {
    loadPets();
  }, []);

  const searchPet = async () => {
    toast.loading("Searching...", { id: "searching" });

    try {
      const searchResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/pets/search?q=${search}`
      );
      toast.dismiss();
      setPets(searchResponse.data.data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message, { id: error });
      setErrors(error.response.data.message);
      setPets([]);
    }
  };
  useEffect(() => {
    searchPet();
  }, [search]);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
        <div className="text-center py-6 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-md">
          <h1 className="text-3xl font-extrabold tracking-wide text-gray-800">
            Welcome to 🐾 <span className="text-pink-600">HAPPYPAWS</span> 🐶
          </h1>
          <p className="mt-2 text-gray-600">
            Find your perfect furry friend for adoption ❤️
          </p>
        </div>

        <div className=" flex items-center border rounded-full shadow-lg mt-6 w-fit px-3 py-2 mx-auto bg-white">
          <input
            type="text"
            placeholder="Search for pets..."
            className="focus:outline-none px-4 py-2 w-72 md:w-96 text-gray-700 "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <img
            src={searchpet}
            alt="Search"
            className="inline-block ml-2 h-8 cursor-pointer hover:scale-110 transition"
          />
        </div>
        <div className="flex justify-center">
          <Link to="/pet/add">
            <button className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Add Pet
            </button>
          </Link>
        </div>
        <div className="mt-6">
          {errors && Pets.length === 0 ? (
            <div className="flex justify-center">
              <img
                src={notfound404}
                alt="404 img"
                className="w-72 md:w-96 opacity-80"
              />
            </div>
          ) : null}
        </div>
        <div className="mt-10 px-2 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Pets.map((pet) => {
            const {
              name,
              age,
              gender,
              breed,
              weight,
              color,
              description,
              images,
              available,
              _id,
            } = pet;
            return (
              <Petscard
                key={_id}
                name={name}
                age={age}
                gender={gender}
                breed={breed}
                weight={weight}
                color={color}
                description={description}
                images={images}
                available={available}
                _id={_id}
                loadPets={loadPets}
              />
            );
          })}
        </div>
        <Toaster position="top-right w-44 font-serif" />
      </div>
    </>
  );
};

export default Home;
