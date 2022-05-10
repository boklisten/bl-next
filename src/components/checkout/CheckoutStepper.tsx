import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import CheckoutStep from "./CheckoutStep";
import Box from "@mui/material/Box";

export type CheckoutSteps = "tos" | "payment" | "delivery" | undefined;

const stepLabels = {
  tos: "Betingelser",
  payment: "Betaling",
  delivery: "Velg levering",
};

const CheckoutStepper = ({ steps }: { steps: CheckoutSteps[] }) => {
  const [wait, setWait] = useState(false);
  const isPreviousStep = (step: CheckoutSteps) =>
    steps.indexOf(step) < activeStep;

  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper orientation="vertical" activeStep={activeStep} sx={{ ml: 1 }}>
      {steps.map((step) => {
        if (step === undefined) return;
        return (
          <Step
            key={step}
            onClick={() =>
              isPreviousStep(step) && setActiveStep(steps.indexOf(step))
            }
            sx={isPreviousStep(step) ? { cursor: "pointer" } : {}}
          >
            <StepLabel>{stepLabels[step]}</StepLabel>
            <StepContent>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CheckoutStep
                  setWait={setWait}
                  wait={wait}
                  step={steps[activeStep]}
                />
                {activeStep < steps.length - 1 && (
                  <Button
                    disabled={wait}
                    sx={{ width: "100px", marginTop: "1rem" }}
                    color="success"
                    variant="contained"
                    onClick={() => setActiveStep((previous) => previous + 1)}
                  >
                    Bekreft
                  </Button>
                )}
              </Box>
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default CheckoutStepper;
