/* eslint-disable react/prop-types */
// Drag item types

import { useDrag } from "react-dnd";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

// Draggable Recipe component
const RecipeItem = ({ plan }) => {
  const { url } = useContext(StoreContext);

  const ItemType = {
    RECIPE: "recipe",
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.RECIPE,
    item: { id: plan._id, name: plan.name, image: plan.imageDescription },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <img
        src={`${url}/images/${plan.imageDescription}`}
        alt={plan.name}
        // style={{ height: "150px", width: "150px", objectFit: "cover" }}
        className="h-36 w-36 object-cover object-center rounded-lg"
      />
      <h4 className="text-sm text-gray-700">{plan.name}</h4>
    </div>
  );
};

export default RecipeItem;
