import React from "react";
import Available from "./../assets/allimgs/available.png";
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
}) => {
  return (
    <div
      key={_id}
      className="border p-2 m-3 rounded shadow-lg w-[250px] bg-white"
    >
      {images && images.length > 0 && (
        <div className="relative ">
          <span className="absolute top-0 right-0">
            {available ? (
              <img src={Available} alt="Available" className="w-10 h-10 " />
            ) : (
              "Not Available"
            )}
          </span>

          <img
            src={images[0]}
            alt={name}
            className="w-[350px] h-[200px] object-cover mx-auto mb-4 rounded"
          />
          <h2 className="absolute bottom-0 left-0 text-2xl font-serif bg-amber-500/50  text-white p-1 rounded-2xl ">
            {name}
          </h2>
        </div>
      )}
      <div className="text-left p-1 font-serif">
        <p>
          {" "}
          <span className="font-bold"> Gender: </span> {gender}
        </p>
        <p>
          {" "}
          <span className="font-bold">Description:</span> {description}
        </p>
      </div>
    </div>
  );
};

export default Petscard;
