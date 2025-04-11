import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import RecipeItem from "./RecipeItem";
import MealSlot from "./MealSlot";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./plan.css";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { Pdf } from "./Pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Plans = () => {
  const { url } = useContext(StoreContext);
  const [plans, setPlans] = useState([]);
  const [schedule, setSchedule] = useState({
    monday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    tuesday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    wednesday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    thursday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    friday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    saturday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    sunday: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  });
  const [collapsedDays, setCollapsedDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  // Fetching all recipes
  const plansApi = () => {
    axios
      .get("http://localhost:4000/api/plans")
      .then((res) => {
        setPlans(res.data);
        console.log("hello", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mealPlansApi = () => {
    axios
      .get("http://localhost:4000/api/meal-plan")
      .then((res) => {
        const fetchedMealPlans = res.data;
        const updatedSchedule = { ...schedule };

        fetchedMealPlans.forEach((plan) => {
          updatedSchedule[plan.day] = {
            breakfast: plan.meals.breakfast || [],
            lunch: plan.meals.lunch || [],
            dinner: plan.meals.dinner || [],
            snacks: plan.meals.snacks || [],
          };
        });

        setSchedule(updatedSchedule);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    plansApi();
    mealPlansApi();
  }, []);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleDrop = (item, day, mealType) => {
    // Check if the mealType already has an item
    if (schedule[day][mealType].length >= 1) {
      alert("You cannot add more than one item to this meal slot.");
      return;
    }

    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [mealType]: [...prevSchedule[day][mealType], item],
      },
    }));

    axios
      .post("http://localhost:4000/api/meal-plan", {
        day,
        mealType,
        recipeId: item.id,
      })
      .then((res) => {
        console.log("Meal plan updated:", res.data);
      })
      .catch((err) => {
        console.error("Error saving meal plan:", err);
      });
  };

  const toggleDay = (day) => {
    setCollapsedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: plans.length > 6 ? 6 : plans.length,
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

  const handleDelete = (item) => {
    console.log(item);
    axios
      .delete(`http://localhost:4000/api/plans/${item._id || item.id}`)
      .then((res) => {
        console.log(res);
        mealPlansApi();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCart = (day) => {
    if (schedule[day]) {
      const dayItems = [];

      Object.values(schedule[day]).forEach((meal) => {
        dayItems.push(...meal);
      });

      axios
        .post(`http://localhost:4000/api/shopping/add`, {
          userId: 1,
          items: dayItems,
        })
        .then((res) => {
          console.log(res);
          alert("Add to cart");
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(day, dayItems, schedule);
    } else {
      console.log(`${day} is not a valid day`);
    }
  };

  const handleAllCart = () => {
    const allItems = [];
    console.log(allItems, schedule);

    Object.values(schedule).forEach((day) => {
      Object.values(day).forEach((meal) => {
        allItems.push(...meal);
      });
    });

    axios
      .post(`http://localhost:4000/api/shopping/add`, {
        userId: 1,
        items: allItems,
      })
      .then((res) => {
        console.log(res);
        alert("Add to cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllIngredients = (schedule) => {
    const allIngredients = [];

    Object.values(schedule).forEach((day) => {
      Object.values(day).forEach((meal) => {
        meal.forEach((recipe) => {
          if (recipe.recipeReference && recipe.recipeReference.ingredients) {
            allIngredients.push(...recipe.recipeReference.ingredients);
          }
        });
      });
    });

    return allIngredients;
  };

  const allIngredientsArray = getAllIngredients(schedule);
  console.log(allIngredientsArray);

  console.log("heki", schedule);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="flex justify-between ">
          <h1 className="text-2xl">Plans</h1>
          <div className="flex gap-2">
            <button
              onClick={handleAllCart}
              className="rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Add all to cart
            </button>
            <PDFDownloadLink
              document={<Pdf schedule={schedule} url={url} allIngredientsArray={allIngredientsArray}/>}
              fileName="MealSchedule.pdf"
              className="rounded-md bg-orange-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
            </PDFDownloadLink>
          </div>
        </div>
        <Slider {...sliderSettings} className="mt-4" draggable={false}>
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="p-2"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <RecipeItem plan={plan} />
            </div>
          ))}
        </Slider>

        <div>
          {daysOfWeek.map((day) => (
            <div key={day}>
              <div
                className="border-t border-gray-200 py-1 px-2 my-2 flex flex-row-reverse justify-between items-center"
                onClick={() => toggleDay(day)}
              >
                <button
                  onClick={() => handleCart(day)}
                  className="rounded-md bg-orange-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  Add to cart
                </button>

                <h2 className="cursor-pointer text-gray-500 flex items-center justify-between gap-2">
                  {collapsedDays[day] ? (
                    <>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                      <IoIosArrowDropdownCircle className="mr-2" />
                    </>
                  ) : (
                    <>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                      <IoIosArrowDroprightCircle className="mr-2" />
                    </>
                  )}
                </h2>
              </div>

              <div className="flex gap-2 bg-red-500 justify-between"></div>

              {!collapsedDays[day] && (
                <div>
                  <div className="flex">
                    {["breakfast", "lunch", "dinner", "snacks"].map(
                      (mealType) => (
                        <h4 className="text-lg font-semibold w-96 ml-2">
                          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                        </h4>
                      )
                    )}
                  </div>
                  {/* Drop slots */}
                  <div className="flex gap-2">
                    {["breakfast", "lunch", "dinner", "snacks"].map(
                      (mealType) => (
                        <MealSlot
                          key={mealType}
                          mealType={mealType}
                          onDrop={(item) => handleDrop(item, day, mealType)}
                        />
                      )
                    )}
                  </div>

                  {/* List of meals */}
                  <div className="flex gap-2">
                    {["breakfast", "lunch", "dinner", "snacks"].map(
                      (mealType) => (
                        <div key={mealType} className="w-full">
                          {/* <h4 className="text-lg font-semibold">
                            {mealType.charAt(0).toUpperCase() +
                              mealType.slice(1)}
                          </h4> */}
                          {schedule[day][mealType].map((item, index) => (
                            <div key={index} className="my-2">
                              <div className="flex">
                                <img
                                  src={`${url}/images/${
                                    item.imageDescription || item.image
                                  }`}
                                  alt={item.name}
                                  className="h-28 w-28 object-cover rounded-lg"
                                />
                                <div
                                  onClick={() => handleDelete(item)}
                                  className="cursor-pointer"
                                >
                                  <TiDelete className="h-6 w-6 text-red-500" />
                                </div>
                              </div>
                              <p className="text-xs text-gray-700">
                                {item.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Plans;
