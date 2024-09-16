import React, { useState } from 'react';
import './AddRecipe.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddRecipe = () => {
    const url = 'http://localhost:4000';

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    });

    const [ingredient, setIngredient] = useState({
        image: null,
        name: '',
        quantity: '',
        measure: ''
    });

    const [ingredients, setIngredients] = useState([]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onIngredientChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setIngredient(ingredient => ({ ...ingredient, [name]: value }));
    };

    const handleIngredientImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIngredient(ingredient => ({ ...ingredient, image: file }));
        }
    };

    const addIngredient = () => {
        const { image, name, quantity, measure } = ingredient;
        if (name && quantity && measure) {
            setIngredients([...ingredients, ingredient]);
            setIngredient({ image: null, name: '', quantity: '', measure: '' }); // Clear form
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        // Add ingredients to form data
        ingredients.forEach((ing, index) => {
            formData.append(`ingredient_image_${index}`, ing.image);
            formData.append(`ingredient_name_${index}`, ing.name);
            formData.append(`ingredient_quantity_${index}`, ing.quantity);
            formData.append(`ingredient_measure_${index}`, ing.measure);
        });

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Salad'
                });
                setImage(null);
                setIngredients([]);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Recipe Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='Recipe' />
                    </label>
                    <input
                        onChange={(e) => { setImage(e.target.files[0]); e.target.value = ''; }}
                        type="file"
                        accept='image/*'
                        id='image'
                        hidden
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Recipe Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name'
                        placeholder='Type here'
                    />
                </div>

                <div className="add-product-description flex-col">
                    <p>Recipe Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows='6'
                        placeholder='Write content here'
                        required
                    />
                </div>

                <div className='add-category-price'>
                    <div className="add-category flex-col">
                        <p>Recipe Category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salads</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Recipe Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name='price'
                            placeholder='$20'
                        />
                    </div>
                </div>

                <div className="add-img-upload flex-col">
                    <p>Upload Ingredient Image</p>
                    <label htmlFor="ingredient-image">
                        {ingredient.image && (
                            <img src={URL.createObjectURL(ingredient.image)} alt='Ingredient' width={120} />
                        )}
                    </label>
                    <input
                        onChange={handleIngredientImageUpload}
                        type="file"
                        accept='image/*'
                        id='ingredient-image'
                        hidden
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Ingredient Name</p>
                    <input
                        onChange={onIngredientChange}
                        value={ingredient.name}
                        type="text"
                        name='name'
                        placeholder='Ingredient name'
                    />
                </div>

                <div className="add-product-description flex-col">
                    <p>Ingredient Quantity</p>
                    <input
                        onChange={onIngredientChange}
                        value={ingredient.quantity}
                        type="number"
                        name="quantity"
                        placeholder='Quantity'
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
                            placeholder='Measure (cup, g, ml...)'
                        />
                    </div>
                </div>

                <button
                    type='button'
                    className='add-btn'
                    onClick={addIngredient}
                >
                    Add Ingredient
                </button>

                <h4>Ingredients List</h4>
                <ul>
                    {ingredients.map((ing, index) => (
                        <li key={index}>
                            {ing.image && (
                                <img src={URL.createObjectURL(ing.image)} alt={ing.name} width={50} height={50} />
                            )}
                            {ing.quantity} {ing.measure} of {ing.name}
                        </li>
                    ))}
                </ul>

                <button type='submit' className='add-btn'>Submit Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;
