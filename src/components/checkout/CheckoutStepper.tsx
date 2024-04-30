import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";

import CheckoutStep from "@/components/checkout/CheckoutStep";

export type CheckoutSteps = "tos" | "payment" | "delivery" | undefined;

const stepLabels = {
  tos: "Betingelser",
  payment: "Betaling",
  delivery: "Velg levering",
};

const CheckoutStepper = ({ steps }: { steps: CheckoutSteps[] }) => {
  const [wait, setWait] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const isPreviousStep = (step: CheckoutSteps) =>
    steps.indexOf(step) < activeStep;

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
