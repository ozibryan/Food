/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import IconDropDown from "../../components/IconDropDown/IconDropDown";
import axios from "axios";

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  const addPlan = () => {
    axios
      .post("http://localhost:4000/api/plans", {
        name: name,
        imageDescription: image,
        recipeReference: id,
      })
      .then((res) => {
        console.log(res);
        alert("plan added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full mx-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          className="w-full rounded-t-lg"
          src={url + "/images/" + image}
          alt={name}
        />

        <div>
          <IconDropDown assets={assets} addPlan={addPlan}/>
        </div>

        {/* {!cartItems[id] ? (
                    <img
                        className="w-9 absolute bottom-4 right-4 cursor-pointer rounded-full bg-white p-1"
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add to Cart"
                    />
                ) : (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-full">
                        <img
                            className="w-7 cursor-pointer"
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove from Cart"
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            className="w-7 cursor-pointer"
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add to Cart"
                        />
                    </div>
                )} */}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-medium">{name}</p>
          <img className="w-16" src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <p className="text-red-500 text-xl font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
