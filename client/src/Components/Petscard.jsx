import React from "react";
import { Link } from "react-router";
import Available from "./../assets/allimgs/available.png";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const Petscard = ({
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
  loadPets,
}) => {
  const deletePet = () => {
    const response = axios.delete(
      `${import.meta.env.VITE_API_URL}/pets/${_id}`
    );
    if (response) {
      toast.success("Pet deleted successfully");
      loadPets();
    }
  };
  return (
    <Link
      to={`/pet/${_id}`}
      key={_id}
      className="border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white w-[260px] overflow-hidden "
    >
      {images && images.length > 0 && (
        <div className="relative ">
          <span className="absolute top-2 left-2">
            {available ? (
              <img src={Available} alt="Available" className="w-10 h-10 " />
            ) : (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow">
                Not Available
              </span>
            )}
          </span>
          <div className="absolute top-2 right-2 cursor-pointer">
            <Trash2
              size={20}
              className="text-red-600 hover:text-red-800 bg-white rounded-md p-1 shadow"
              onClick={(e) => {
                e.preventDefault();
                deletePet();
              }}
            />
          </div>
          <img
            src={images[0]}
            alt={name}
            className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <h2 className="absolute bottom-0 left-0 text-xl font-bold font-serif bg-amber-500/80 text-white px-3 py-1 rounded-tr-lg">
            {name}
          </h2>
        </div>
      )}
      <div className="text-left p-4 font-serif">
        <p className="text-gray-700">
          {" "}
          <span className="font-bold"> Gender: </span> {gender}
        </p>
        <p className="mt-1 text-gray-600 line-clamp-2">
          {" "}
          <span className="font-bold">Description:</span> {description}
        </p>
      </div>
      <Toaster position="top-right w-44 font-serif" />
    </Link>
  );
};

export default Petscard;
