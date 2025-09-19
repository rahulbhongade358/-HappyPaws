import axios from "axios";
import React, { useState } from "react";
import addimg from "./../../assets/allimgs/add-image.png";
function Addpet() {
  const [addPet, setAddPet] = useState({
    name: "",
    age: "",
    gender: "",
    breed: "",
    weight: "",
    color: "",
    description: "",
    images: [],
    available: true,
  });
  const [newImage, setNewImage] = useState("");
  const addpet = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/pets`,
        addPet
      );
      console.log("Pet added:", response.data);
    } catch (error) {
      console.error("Error adding pet:", error.response?.data || error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 font-serif">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          🐾 Add a New Pet 🐾
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder=" Pet-Name "
            value={addPet.name}
            onChange={(e) => {
              setAddPet({ ...addPet, name: e.target.value });
            }}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            type="number"
            placeholder="Pet-Age"
            value={addPet.age}
            onChange={(e) => {
              setAddPet({ ...addPet, age: Number(e.target.value) });
            }}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            type="text"
            placeholder="Pet-Gender"
            value={addPet.gender}
            onChange={(e) => {
              setAddPet({ ...addPet, gender: e.target.value });
            }}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            type="text"
            placeholder="Pet-Breed"
            value={addPet.breed}
            onChange={(e) => {
              setAddPet({ ...addPet, breed: e.target.value });
            }}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            type="number"
            placeholder="Pet-Weight"
            value={addPet.weight}
            onChange={(e) => {
              setAddPet({ ...addPet, weight: Number(e.target.value) });
            }}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            type="text"
            placeholder="Pet-Color"
            value={addPet.color}
            onChange={(e) => {
              setAddPet({ ...addPet, color: e.target.value });
            }}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <textarea
            name="description"
            placeholder="Pet-Description"
            value={addPet.description}
            onChange={(e) => {
              setAddPet({ ...addPet, description: e.target.value });
            }}
            className="w-full border rounded-lg px-4 py-3 mt-6 focus:ring-2 focus:ring-pink-400 outline-none"
          ></textarea>
          <div className="mt-6">
            <h2 className="font-bold text-lg text-gray-700 mb-2">Pet Images</h2>
            <div className="flex gap-4 flex-wrap">
              {addPet.images.map((im, index) => (
                <div
                  key={index}
                  className="h-24 w-24 rounded-lg overflow-hidden border shadow"
                >
                  <img
                    src={im}
                    alt={`Pet ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className=" flex border rounded-lg px-1 py-3 w-full mt-3 focus:ring-2  focus:ring-pink-400 outline-none">
                <input
                  type="text"
                  placeholder="Pet Image"
                  className="border-none outline-none flex-1 px-2 py-1"
                  value={newImage}
                  onChange={(e) => {
                    setNewImage(e.target.value);
                  }}
                />
                <img
                  src={addimg}
                  alt="add-button"
                  className="h-10 w-10  object-contain cursor-pointer"
                  onClick={() => {
                    if (!newImage) {
                      return;
                    }
                    setAddPet({
                      ...addPet,
                      images: [...addPet.images, newImage],
                    });
                    setNewImage("");
                  }}
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Available"
              className="border rounded-lg mt-6 px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
              value={addPet.available}
              onChange={(e) =>
                setAddPet({ ...addPet, available: e.target.value })
              }
            />
            <button
              onClick={addpet}
              className="mt-8 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Add Pet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addpet;
