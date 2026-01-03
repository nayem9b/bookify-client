import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";

const AddAProduct = () => {
  const [postImage, setPostImage] = useState("");
  const [condition, setCondition] = useState();
  const [place, setPlace] = useState();
  const [usersInfo, setUsersInfo] = useState([]);
  const [category, setCategory] = useState("");
  console.log(category);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user.email);
  useEffect(() => {
    fetch(
      `https://bookify-serverside.onrender.com/users/singleuser/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setUsersInfo(data));
  }, [user.email]);

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const mobileNumber = form.mobileNumber.value;
    const originalPrice = form.originalPrice.value;
    const description = form.description.value;

    // Image upload section here
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_BB_KEY}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const addedProduct = {
            name: name,
            price: price,
            mobileNumber: mobileNumber,
            originalPrice: originalPrice,
            description: description,
            condition: condition,
            place: place,
            email: user.email,
            userName: user.displayName,
            image: imgData.data.url,
            userImage: usersInfo.image,
            isVerified: false,
            category: category,
            date: new Date(Date.now()).toISOString(),
          };

          fetch("https://bookify-serverside.onrender.com/addedProducts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addedProduct),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success("Product added");
              form.reset();
              navigate("/dashboard/myproducts");
            });
        }
        // console.log(imgData);
        // console.log(imgData.data.url);
        // setPostImage(imgData.data.url);
      });
  };
  return (
    <div className="relative">
      <section className="bg-gray-100">
        <h1 className="px-8 text-3xl">Add a product</h1>
        <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form
                action=""
                onSubmit={handleSubmitProduct}
                className="space-y-4"
              >
                <div>
                  <h1>
                    Name of the book
                    <span className="text-red-600 text-lg">*</span>
                  </h1>
                  <label className="sr-only" for="name">
                    Name
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    name="name"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block mb-2 ">
                    Select Image:
                    <span className="text-red-600 text-lg">*</span>
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    required
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
                <div>
                  <h1>
                    Price
                    <span className="text-red-600 text-lg">*</span>
                  </h1>
                  <label className="sr-only" for="name">
                    Price
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    //   placeholder={user.displayName}
                    type="text"
                    name="price"
                    required
                  />
                </div>
                <div>
                  <h1>
                    Condition Type
                    <span className="text-red-600 text-lg">*</span>
                  </h1>

                  <fieldset className="flex flex-wrap gap-3">
                    <div>
                      <input
                        type="radio"
                        name="ColorOption"
                        value="Excillent"
                        id="ColorBlack"
                        className="peer hidden"
                        onClick={(e) => setCondition(e.target.value)}
                      />

                      <label
                        for="ColorBlack"
                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                      >
                        <p className="text-sm font-medium">Excillent</p>
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="ColorOption"
                        value="Good"
                        id="ColorRed"
                        className="peer hidden"
                        onClick={(e) => setCondition(e.target.value)}
                      />

                      <label
                        for="ColorRed"
                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                      >
                        <p className="text-sm font-medium">Good</p>
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="ColorOption"
                        value="Fair"
                        id="ColorBlue"
                        className="peer hidden"
                        onClick={(e) => setCondition(e.target.value)}
                      />

                      <label
                        for="ColorBlue"
                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                      >
                        <p className="text-sm font-medium">Fair</p>
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="ColorOption"
                        value="Torn"
                        id="ColorGold"
                        className="peer hidden"
                        onClick={(e) => setCondition(e.target.value)}
                      />

                      <label
                        for="ColorGold"
                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                      >
                        <p className="text-sm font-medium">Torn</p>
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <h1>
                    Category
                    <span className="text-red-600 text-lg">*</span>
                  </h1>

                  <fieldset className="flex flex-wrap gap-3">
                    <div>
                      <input
                        type="radio"
                        name="action_and_adventure"
                        value="action_and_adventure"
                        id="action_and_adventure"
                        className="peer hidden"
                        onClick={(e) => setCategory(e.target.value)}
                      />

                      <label
                        for="action_and_adventure"
                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                      >
                        <p className="text-sm font-medium">
                          Action and Adventure
                        </p>
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="classics"
                        value="classics"
                        id="classics1"
                        className="peer hidden"
                        onClick={(e) => setCategory(e.target.value)}
                      />

                      <label
                        for="classics1"
                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                      >
                        <p className="text-sm font-medium">Classics</p>
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="memoir"
                        value="memoir"
                        id="memoir"
                        className="peer hidden"
                        onClick={(e) => setCategory(e.target.value)}
                      />

                      <label
                        for="memoir"
                        className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 py-2 px-3 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                      >
                        <p className="text-sm font-medium">Memoir</p>
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <h1>
                    Mobile Number{" "}
                    <span className="text-red-600 text-lg">*</span>
                  </h1>
                  <label className="sr-only" for="name">
                    Mobile Number
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    name="mobileNumber"
                    required
                  />
                </div>
                <h1>
                  Location <span className="text-red-600 text-lg">*</span>
                </h1>
                <fieldset className="grid grid-cols-3 gap-4">
                  <div>
                    <input
                      type="radio"
                      name="DeliveryOption"
                      value="Dhaka"
                      id="DeliveryStandard"
                      className="peer hidden"
                      onClick={(e) => setPlace(e.target.value)}
                    />

                    <label
                      for="DeliveryStandard"
                      className="block cursor-pointer rounded-lg border border-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    >
                      <p className="text-gray-700">Dhaka</p>
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="DeliveryOption"
                      value="Chittagong"
                      id="DeliveryPriority"
                      className="peer hidden"
                      onClick={(e) => setPlace(e.target.value)}
                    />

                    <label
                      for="DeliveryPriority"
                      className="block cursor-pointer rounded-lg border border-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    >
                      <p className="text-gray-700">Chittagong</p>
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="DeliveryOption"
                      value="Khulna"
                      id="Khulna"
                      className="peer hidden"
                      onClick={(e) => setPlace(e.target.value)}
                    />

                    <label
                      for="Khulna"
                      className="block cursor-pointer rounded-lg border border-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    >
                      <p className="text-gray-700">Khulna</p>
                    </label>
                  </div>
                </fieldset>
                <div>
                  <h1>Original Bought Price</h1>
                  <label className="sr-only" for="name">
                    Original Bought Price
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    name="originalPrice"
                    type="text"
                    required
                  />
                </div>

                <div>
                  <h1>
                    Description <span className="text-red-600 text-lg">*</span>
                  </h1>
                  <label className="sr-only" for="message">
                    Message
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Description of the product"
                    rows="8"
                    name="description"
                    required
                    id="message"
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
                  >
                    <span className="font-medium"> Publish your product </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddAProduct;
