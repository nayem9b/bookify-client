import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/UserContext";
import useAdmin from "../Hooks/useAdmin";

const BookDetailsCard = ({ book, setItem, setPrice }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const {
    name,
    location,
    original_price,
    posted_time,
    picture,
    resale_price,
    years_of_use,
  } = book;

  const wishlist = {
    name: name,
    price: resale_price,
    email: user?.email,
  };
  const handleAddToWishlist = () => {
    fetch("https://bookify-serverside.onrender.com/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(wishlist),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Product added to wishlist");
      });
  };

  return (
    <div className="mx-16">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img className="h-96 w-80" src={picture} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{name}</h2>
          <p>
            {" "}
            <span>Resale Price:</span> {resale_price}
          </p>
          <p>
            {" "}
            <span>Original Price:</span> {original_price}
          </p>
          <p>
            {" "}
            <span>Years of use:</span> {years_of_use}
          </p>
          <p>
            {" "}
            <span>Location:</span> {location}
          </p>
          <p>
            {" "}
            <span>Posted Time:</span> {posted_time}
          </p>
          <div className="card-actions lg:justify-end">
            {!isAdmin && (
              <div className="grid grid-cols-2 gap-2 ">
                <button
                  className="group relative inline-block overflow-hidden border border-indigo-600 px-4 py-3 focus:outline-none focus:ring"
                  onClick={handleAddToWishlist}
                >
                  <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

                  <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                    Wishlist
                  </span>
                </button>
                <label
                  htmlFor="booking-modal"
                  className="btn text-black border-none bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-300"
                  onClick={() => {
                    setItem(name);
                    setPrice(resale_price);
                  }}
                >
                  Book now
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
