import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
function Petdetails() {
  const { id } = useParams();
  const [petDetails, setPetDetails] = useState({
    name: "",
    age: null,
    gender: "",
    breed: "",
    weight: null,
    color: "",
    description: "",
    images: [],
    available: false,
  });
  const petdetails = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/pets/${id}`
    );
    setPetDetails(response.data.data);
  };
  useEffect(() => {
    petdetails();
  }, [id]);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 py-10 px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          🐾 Pet Details 🐾
        </h1>
        <div className="max-w-[450px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {petDetails.images && petDetails.images.length > 0 && (
            <img
              src={petDetails.images[0]}
              alt={petDetails.name}
              className="w-full h-56 md:h-60 lg:h-72  rounded-t-xl"
            />
          )}
          <div className="p-6 font-serif">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {petDetails.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-700">
              <p>
                <span className="font-semibold">Breed:</span>:{" "}
                {petDetails.breed}
              </p>
              <p>
                <span className="font-semibold">Age:</span>: {petDetails.age}
              </p>
              <p>
                <span className="font-semibold">Gender:</span>:{" "}
                {petDetails.gender}
              </p>
              <p>
                <span className="font-semibold">Weight:</span>:{" "}
                {petDetails.weight} kg
              </p>
              <p>
                <span className="font-semibold">Color:</span>:{" "}
                {petDetails.color}
              </p>
            </div>
            <p className="text-gray-600 mb-6">
              <span className="font-semibold">Description:</span>
              {petDetails.description}
            </p>
            <p className="text-lg font-semibold">
              Status:{" "}
              <span
                className={`px-3 py-1 rounded-full text-white ${
                  petDetails.available ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {petDetails.available ? "Available" : "Not Available"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Petdetails;
