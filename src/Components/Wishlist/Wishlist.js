import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wish, setWish] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        `https://bookify-serverside.onrender.com/wishlist?email=${user.email}`
      )
      .then((data) => setWish(data.data));
  }, [user?.email]);

  return (
    <div>
      <h2 className="text-3xl">My Wishlist</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {wish.map((wish, i) => (
              <tr key={wish._id}>
                <th>{i + 1}</th>
                <td>{wish.name}</td>
                <td>
                  {" "}
                  {wish.price} <span className="text-2xl">৳</span>{" "}
                </td>
                <td>
                  <Link to="/payment">
                    <button className="btn btn-xs btn-danger">Purchase</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
