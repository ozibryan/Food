import React, { useState } from 'react';

const RecipeInstructions = () => {
    // State to hold the steps
    const [steps, setSteps] = useState([{ description: '' }]);

    // Function to handle input change for a step
    const handleStepChange = (index, event) => {
        const newSteps = [...steps];
        newSteps[index].description = event.target.value;
        setSteps(newSteps);
    };

    // Function to add a new step
    const addStep = () => {
        setSteps([...steps, { description: '' }]);
    };

    // Function to remove a step
    const removeStep = (index) => {
        const newSteps = steps.filter((_, stepIndex) => stepIndex !== index);
        setSteps(newSteps);
    };

    // Function to save the steps (for example, on form submission)
    const handleSubmit = () => {
        // You would send the steps data to a backend or process it further here
        console.log('Preparation steps:', steps);
    };

    return (
        <div className="instruction-steps">
            <h2>Preparation Steps</h2>

            {steps.map((step, index) => (
                <div key={index} className="step">
                    <label>Step {index + 1}</label>
                    <textarea
                        value={step.description}
                        onChange={(event) => handleStepChange(index, event)}
                        placeholder={`Describe step ${index + 1}`}
                    />
                    {steps.length > 1 && (
                        <button type="button" onClick={() => removeStep(index)}>
                            Remove Step
                        </button>
                    )}
                </div>
            ))}

            <button type="button" onClick={addStep}>
                Add Another Step
            </button>

            <button type="button" onClick={handleSubmit}>
                Save Steps
            </button>
        </div>
    );
};

export default RecipeInstructions;
