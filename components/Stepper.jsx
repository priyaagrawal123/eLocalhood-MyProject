
import React from 'react';
import './Stepper.css'; // Import your CSS file for styling

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="stepper">
      <div className="steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
