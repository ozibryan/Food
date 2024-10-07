/* eslint-disable react/prop-types */
const Ingridents = ({ imgOne, imageTwo, textOne, textTwo }) => {
  return (
    <div className="ing-oil">
      <div className="ing-items">
        <img src={imgOne} alt="ing image one" />
        <p className="items-detailed">{textOne}</p>
      </div>
      <div className="ing-items">
        <img src={imageTwo} alt="ing image two" />
        <p className="items-detailed">{textTwo}</p>
      </div>
    </div>
  );
};

export default Ingridents;
