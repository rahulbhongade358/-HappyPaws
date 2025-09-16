import React, { useEffect, useState } from "react";
import axios from "axios";
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
      <div className="text-center text-3xl font-bold underline bg-gray-100">
        <h1>Welcome to 🐾HAPPYPAWS🐶</h1>
      </div>

      <div className=" text-center border rounded-4xl shadow-xl w-fit  m-auto mt-7 ">
        <input
          type="text"
          placeholder="Search for pets..."
          className=" focus:outline-none px-5 py-2 w-80 "
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img src={searchpet} alt="Search" className="inline-block m-1 h-9" />
      </div>
      <div>
        {errors ? (
          <img src={notfound404} alt="404 img" className="m-auto w-sm" />
        ) : null}
      </div>
      <div className="flex flex-wrap justify-evenly">
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
            />
          );
        })}
      </div>
      <Toaster position="top-right w-44" />
    </>
  );
};

export default Home;
