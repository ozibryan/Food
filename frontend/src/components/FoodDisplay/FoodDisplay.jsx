import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { Link } from "react-router-dom";
import axios from "axios";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/recipe/list")
      .then((res) => {
        setRecipeList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);


  useEffect(()=>{
    setRecipeList(food_list)
  },[])


  return (
    <div className="food-display" id="food-display">
      <h2> Top Dishes near you </h2>
      <div className="food-display-list">
        {recipeList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div key={index}>
                <Link to={`/menu/${item._id}`}>
                  <FoodItem
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price || "200"}
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
