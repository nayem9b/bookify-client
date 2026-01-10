import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/UserContext";
import TableRow from "./Table/TableRow/TableRow";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
const MyProducts = () => {
  // const [products, setProducts] = useState([]);
  const [clickedProduct, setClickedProduct] = useState();
  const [click, setClick] = useState(1);
  const { user } = useContext(AuthContext);
  // useEffect(() => {
  //   fetch(`https://bookify-serverside.onrender.com/myproducts?email=${user.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, [user?.email]);
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await fetch(
        `https://bookify-serverside.onrender.com/myproducts?email=${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleAdvertise = (_id) => {
    fetch(`https://bookify-serverside.onrender.com/myproduct/${_id}`)
      .then((res) => res.json())
      .then((data) => setClickedProduct(data));
    toast.success("Product successfully advertised!");
    const {
      name,
      condition,
      mobileNumber,
      originalPrice,
      place,
      description,
      price,
      date,
      image,
      userImage,
      userName,
      isVerified,
    } = clickedProduct;

    const advertise = {
      name: name,
      mobileNumber: mobileNumber,
      place: place,
      price: price,
      description: description,
      originalPrice: originalPrice,
      condition: condition,
      email: user.email,
      date: date,
      userName: userName,
      image: image,
      userImage: userImage,
      isVerified: isVerified,
    };

    fetch(`https://bookify-serverside.onrender.com/myproduct/new`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(advertise),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://bookify-serverside.onrender.com/myproducts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Product successfully deleted");
        refetch();
      });
  };

  const handleMarkAsSold = (id) => {
    fetch(`https://bookify-serverside.onrender.com/advertised/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(id);
        toast.success("Product marked as sold");
      });
  };

  return (
    <div>
      <h2 className='text-3xl font-semibold text-sky-600'>
        Double click on 'Advertise' to confirm advertisement
      </h2>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Advertise</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>{product.name}</td>
                <td>
                  {" "}
                  {product.price} <span className='text-2xl'>৳</span>{" "}
                </td>
                <td>
                  <button
                    className='btn btn-error btn-xs'
                    onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleAdvertise(product._id);
                      setClick(0);
                    }}
                    className='btn btn-xs btn-danger'>
                    Advertise
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleMarkAsSold(product._id);
                      setClick(0);
                    }}
                    className='btn btn-xs btn-danger'>
                    Mark as sold
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
