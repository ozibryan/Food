/* eslint-disable react/prop-types */
import { useDrop } from "react-dnd";
import { FaTruckDroplet } from "react-icons/fa6";

const MealSlot = ({ onDrop, mealType }) => {
  const ItemType = {
    RECIPE: "recipe",
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemType.RECIPE,
    drop: (item) => onDrop(item, mealType),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        minHeight: "100px",
        backgroundColor: isOver ? "lightgreen" : "white",
      }}
      className="w-full border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center"
    >
      <p><FaTruckDroplet className="h-8 w-8 text-gray-300" /></p>
    </div>
  );
};

export default MealSlot;
