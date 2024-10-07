/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./AddRecipe.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddRecipe = () => {
    const url = "http://localhost:4000";

    const [recipeImage, setRecipeImage] = useState(null);

    const [ingredients, setIngredients] = useState([]);

    const [ingredient, setIngredient] = useState({
        image: null,
        quantity: "",
        measure: "",
        weight: "",
        name: "",
        substitute: "", // Single text field for substitutes
    });

    const [instructions, setInstructions] = useState([]);
    const [instruction, setInstruction] = useState({
        step: '',
        instruction: ''
    });


    const [isEditing, setIsEditing] = useState(false); // To track whether we're in edit mode
    const [editIndex, setEditIndex] = useState(null); // To track the index of the item being edited

    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad",
        cuisine: "Thai",
        preptime: 0,
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onIngredientChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setIngredient((ingredient) => ({ ...ingredient, [name]: value }));
    };

    // Function to start editing an ingredient
    const editIngredient = (index) => {
        setIngredient(ingredients[index]); // Pre-fill input fields with the selected ingredient
        setIsEditing(true); // Enter edit mode
        setEditIndex(index); // Set the index of the ingredient being edited
    };

    // Function to remove an ingredient
    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
        if (isEditing && editIndex === index) {
            setIsEditing(false); // Cancel edit mode if the item being edited is deleted
            setEditIndex(null);
            setIngredient({
                image: null,
                name: "",
                quantity: "",
                measure: "",
                weight: " ",
                substitute: "",
            });
        }
    };

    const handleIngredientImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Revoke the previous object URL to avoid memory leaks
            if (ingredient.image) {
                URL.revokeObjectURL(ingredient.image.preview);
            }
            // Create a new object URL for preview
            file.preview = URL.createObjectURL(file);
            setIngredient((ingredient) => ({ ...ingredient, image: file }));
        }
    };

    //
    <img
        src={recipeImage ? URL.createObjectURL(recipeImage) : assets.upload_area}
        alt=""
    />;
    //

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            // Revoke object URLs when the component unmounts to free memory
            ingredients.forEach((ing) => {
                if (ing.image && ing.image.preview) {
                    URL.revokeObjectURL(ing.image.preview);
                }
            });
        };
    }, [ingredients]);

    // Function to add or edit an ingredient

    const addOrEditIngredient = () => {
        const { image, name, quantity, measure, weight, substitute } = ingredient;
        if (image && name && quantity && measure) {
            if (isEditing) {
                // Update the existing ingredient at the editIndex
                const updatedIngredients = [...ingredients];
                updatedIngredients[editIndex] = ingredient;
                setIngredients(updatedIngredients);
                setIsEditing(false);
                setEditIndex(null);
            } else {
                // Add a new ingredient
                setIngredients([...ingredients, ingredient]);
            }
            // Clear the form after submission
            setIngredient({
                image: null,
                name: "",
                quantity: "",
                measure: "",
                weight: "",
                substitute: "",
            });
        }
    };

    console.log(data);
    console.log(recipeImage);
    console.log(ingredients);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log("got here");

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("cuisine", data.cuisine);
        formData.append("preptime", data.preptime);
        formData.append("recipeImage", recipeImage); // For the main recipe image

        // Append ingredients as an array (which the backend expects)
        ingredients.forEach((ingredient, index) => {
            console.log("hello", ingredient, index);
            formData.append(`ingredients[${index}][name]`, ingredient.name);
            formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
            formData.append(`ingredients[${index}][measure]`, ingredient.measure);
            if (ingredient.weight) {
                formData.append(`ingredients[${index}][weight]`, ingredient.weight);
            }
            if (ingredient.substitute) {
                formData.append(
                    `ingredients[${index}][substitute]`,
                    ingredient.substitute
                );
            }
            if (ingredient.image) {
                formData.append(`ingredientImages`, ingredient.image);
                // formData.append(`ingredients[${index}][image]`, ingredient.image); 
            }
        });

        // Optionally append instructions if you are adding them
        instructions.forEach((instruction, index) => {
            formData.append(`instruction[${index}][step]`, instruction.step);
            formData.append(
                `instruction[${index}][instruction]`,
                instruction.instruction
            );
        });

        try {
            const response = await axios.post(`${url}/api/recipe/add`, formData, {
                headers: {
                    "Content-Type": "mulitpart/form-data",
                },
            });

            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                    cuisine: "Thai",
                    preptime: 0,
                });

                setRecipeImage(null);
                setIngredients([]);

                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const onInstructionChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInstruction(instruction => ({ ...instruction, [name]: value }));
    };

    const addOrEditInstruction = () => {
        const { step, instruction: instructionText } = instruction;
        if (step && instructionText) {
            setInstructions([...instructions, instruction]);
            setInstruction({ step: '', instruction: '' });
        }
    };



    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                {/*
                <div className="add-img-upload flex-col">
                    <p>Upload Recipe Image .. 1</p>

               ................
                    <label htmlFor="recipeImage">
                        <img src={recipeImage ? URL.createObjectURL(recipeImage) : assets.upload_area} alt='Recipe' />
                    </label>

                    <input
                        onChange={(e) => { setRecipeImage(e.target.files[0]); e.target.value = ''; }}
                        type="file"
                        accept='image/*'
                        name='recipeImage'
                        id='recipeImage'
                        hidden
                        required
                    />
                </div>  */}

                <div className="add-img-upload flex-col">
                    <p>Upload Recipe Image</p>

                    <label htmlFor="recipeImage">
                        <img
                            src={
                                recipeImage
                                    ? URL.createObjectURL(recipeImage)
                                    : assets.upload_area
                            }
                            alt=""
                        />
                    </label>

                    <input
                        onChange={(e) => {
                            setRecipeImage(e.target.files[0]);
                            e.target.value = "";
                        }}
                        type="file"
                        accept="Image/*"
                        id="recipeImage"
                        hidden
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Recipe Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                    />
                </div>

                <div className="add-product-description flex-col">
                    <p>Recipe Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required
                    />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Recipe Category</p>
                        <select onChange={onChangeHandler} name="cuisine">
                            <option value="Asian">Asian</option>
                            <option value="Thai">Thai</option>
                            <option value="French">French</option>
                            <option value="Mediterranean">Mediterranean</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                    </div>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Cusine </p>
                        <select onChange={onChangeHandler} name="cusine">
                            <option value="Asian">Asian</option>
                            <option value="Thai">Thai</option>
                            <option value="French">French</option>
                            <option value="Mediterasian">Mediterasian</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Prep Time (Mins) </p>
                        <input
                            onChange={onChangeHandler}
                            value={data.preptime}
                            type="number"
                            min="0"
                            name='preptime'
                            placeholder='10'
                        />
                    </div>

                </div>
                <div className="add-img-upload flex-col">
                    <p>Upload Ingredient Image</p>

                    <label htmlFor="image">
                        {ingredient.image ? (
                            <img
                                src={URL.createObjectURL(ingredient.image)}
                                alt="Ingredient"
                                width={100}
                                height={100}
                            />
                        ) : (
                            <img
                                src={assets.upload_area}
                                alt="Upload area"
                                width={100}
                                height={100}
                            />
                        )}
                    </label>

                    <input
                        onChange={handleIngredientImageUpload}
                        type="file"
                        accept="image/*"
                        id="image"
                        hidden
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Ingredient Name</p>
                    <input
                        onChange={onIngredientChange}
                        value={ingredient.name}
                        type="text"
                        name="name"
                        placeholder="Ingredient name"
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Ingredient Quantity</p>
                    <input
                        onChange={onIngredientChange}
                        value={ingredient.quantity}
                        type="text"
                        name="quantity"
                        placeholder="Quantity"
                    />
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Ingredient Measure</p>
                        <input
                            onChange={onIngredientChange}
                            value={ingredient.measure}
                            type="text"
                            name="measure"
                            placeholder="cup, g, ml..."
                        />
                    </div>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Weight </p>
                        <input
                            onChange={onIngredientChange}
                            value={ingredient.weight}
                            type="text"
                            name="weight"
                            placeholder="approx weight..."
                        />
                    </div>
                </div>

                <div className="add-product-name flex-col">
                    <p>Ingredient Substitute (if any)</p>
                    <input
                        onChange={onIngredientChange}
                        value={ingredient.substitute}
                        type="text"
                        name="substitute"
                        placeholder="Substitute (optional)"
                    />
                </div>

                {/* ...  Insert instructions here  */}

                {/* Button to add or update the ingredient */}
                <button
                    type="button"
                    className="add-upd-btn"
                    onClick={addOrEditIngredient}
                >
                    {isEditing ? "Update Ingredient " : "Add Ingredient"}
                </button>

                {/* Render the list of ingredients */}
                <div className="index-list">
                    <ul>
                        {ingredients.map((ing, index) => (
                            <li key={index}>
                                {ing.image && (
                                    <img
                                        src={ing.image.preview}
                                        alt={ing.name}
                                        width={50}
                                        height={50}
                                    />
                                )}
                                {ing.quantity} {ing.measure} of {ing.name} {ing.substitute}{" "}
                                {ing.weight}
                                <div className="add-del-button">
                                    <button
                                        className="add-upd-btn"
                                        type="button"
                                        onClick={() => editIngredient(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="add-upd-btn"
                                        type="button"
                                        onClick={() => removeIngredient(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit" className="add-btn">
                    ADD
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;