import React from "react";
import {Stepper} from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const steps = ['Partycode', 'Je naam', 'Shoot'];

const myStepper = ({step}) => {
    return (
        <Stepper activeStep={step} alternativeLabel>
            {steps.map(label => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
};

export default myStepper;