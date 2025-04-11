/* eslint-disable react/prop-types */
const Ingridents = ({
  setSelectedIngredients,
  selectedIngredients,
  data,
  url,
  servingCount
}) => {
  const handleIngredients = (ingredients) => {
    setSelectedIngredients([...selectedIngredients, { ingredients }]);
  };

  console.log("hello", selectedIngredients);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
      }}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="ing-items"
          onClick={() => handleIngredients(item)}
          style={{ textAlign: "left" }}
        >
          <img
            src={url + "/images/" + item.image}
            alt={`ing image ${index + 1}`}
          />
          <p className="items-detailed">
            {item.quantity*servingCount} {item.measure} of {item.name} {item.substitute}{" "}
            {item.weight}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Ingridents;
