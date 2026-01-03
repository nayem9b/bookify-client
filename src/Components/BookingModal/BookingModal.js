import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/UserContext";
const BookingModal = ({ item, price }) => {
  const { user } = useContext(AuthContext);
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const phoneNumber = form.phone.value;
    const place = form.place.value;

    const booking = {
      email: user.email,
      phoneNumber: phoneNumber,
      place: place,
      productName: item,
      price: price,
    };

    console.log(booking);
    fetch("https://bookify-serverside.onrender.com/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    toast.success(`${item} booked successfully`);
    form.reset();
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{item}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <input
              type="text"
              disabled
              value={user?.email}
              className="input w-full input-bordered "
            />

            <input
              name="name"
              value={item}
              disabled
              className="input w-full input-bordered"
            />
            <input
              name="price"
              value={price}
              disabled
              className="input w-full input-bordered"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered"
              required
            />
            <input
              name="place"
              type="text"
              placeholder="Meeting Location"
              className="input w-full input-bordered"
              required
            />
            <br />
            <input
              className="btn bg-indigo-700 hover:bg-indigo-800 w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
