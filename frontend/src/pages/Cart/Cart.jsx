import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Cart = () => {
  const { url } = useContext(StoreContext);

  const [cart, setCart] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cart.length > 6 ? 6 : cart.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const cartFunction = () => {
    axios
      .get("http://localhost:4000/api/shopping/1")
      .then((res) => {
        setCart(res.data.cart.items);
        setAllIngredients(
          res.data.cart.items.flatMap((item) =>
            item.recipeReference.ingredients.map((ingredient) => ({
              ingredient,
              quantity: item.quantity,
            }))
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    cartFunction();
  }, []);

  const toggleCheckbox = (ingredient, quantity) => {
    if (checkedItems.some((item) => item.name === ingredient.name)) {
      // Uncheck: Move from checkedItems to allIngredients
      setCheckedItems((prev) =>
        prev.filter((item) => item.name !== ingredient.name)
      );
      setAllIngredients((prev) => [...prev, ingredient]);
    } else {
      // Check: Move from allIngredients to checkedItems
      setCheckedItems((prev) => [...prev, {ingredient, quantity}]);
      setAllIngredients((prev) =>
        prev.filter((item) => item.ingredient.name !== ingredient.name)
      );
    }
  };

  console.log(checkedItems);

  return (
    <div className="cart">
      <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Shopping List
      </h1>
      <Slider {...sliderSettings} className="mt-4" draggable={false}>
        {cart.map((plan) => (
          <div
            key={plan._id}
            className="p-2"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div>
              <img
                src={`${url}/images/${plan.imageDescription}`}
                alt={plan.name}
                className="h-36 w-36 object-cover object-center rounded-lg"
              />

              <h4 className="text-sm text-gray-700">{plan.name}</h4>
            </div>
          </div>
        ))}
      </Slider>

      {/* All Ingredients Section */}
      <div className="bg-gray-100 p-3 rounded-md w-1/2">
        <h1 className="my-3 ml-1">{allIngredients.length} items</h1>
        {allIngredients.map((ingredient, i) => (
          <div key={i}>
            <div className="flex justify-between items-center my-2 bg-white p-2 rounded-md">
              <div className="flex gap-3 items-center">
                <img
                  src={`${url}/images/${ingredient.ingredient.image}`}
                  alt={ingredient.ingredient.name}
                  className="h-12 w-12 object-cover rounded-md"
                />
                <h1>{ingredient.ingredient.name}</h1>
                <h3>
                  {ingredient.ingredient.quantity * ingredient.quantity}{" "}
                  {ingredient.ingredient.measure}
                </h3>
              </div>
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                checked={false}
                onChange={() => toggleCheckbox(ingredient.ingredient, ingredient.quantity)}
              />
            </div>
          </div>
        ))}

        {/* Checked Items Section */}
        <h1 className="my-3 ml-1">Checked Items</h1>
        {checkedItems.map((ingredient, i) => (
          <div key={i} className="my-2 bg-white p-2 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img
                  src={`${url}/images/${ingredient.ingredient.image}`}
                  alt={ingredient.ingredient.name}
                  className="h-12 w-12 object-cover rounded-md"
                />
                <h1 className="line-through">{ingredient.ingredient.name}</h1>
                <h3 className="line-through">
                  {ingredient.ingredient.quantity * ingredient.quantity} {ingredient.ingredient.measure}
                </h3>
              </div>
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                checked={true}
                onChange={() => toggleCheckbox(ingredient.ingredient)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
