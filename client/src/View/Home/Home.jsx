import React, { useEffect, useState } from "react";
import axios from "axios";
import Petscard from "../../Components/Petscard";
const Home = () => {
  const [Pets, setPets] = useState([]);
  const loadPets = async () => {
    const petsResponse = await axios.get(
      `${import.meta.env.VITE_API_URL}/pets`
    );
    setPets(petsResponse.data.data);
  };
  useEffect(() => {
    loadPets();
  }, []);
  return (
    <>
      <div className="text-center text-3xl font-bold underline bg-gray-100">
        <h1>Welcome to 🐾HAPPYPAWS🐶</h1>
      </div>
      <div flex className="flex flex-wrap justify-evenly">
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
    </>
  );
};

export default Home;
