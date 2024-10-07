import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { Link } from "react-router-dom";

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    console.log(food_list);
    console.log(category);

    return (
        <div className="food-display" id="food-display">
            <h2> Top Dishes near you </h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <div key={index}>
                                <Link to={`/menu/${item._id}`}>
                                    <FoodItem
                                        id={item._id}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                    />
                                </Link>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
