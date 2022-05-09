import {
  ButtonGroup,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import CheckoutStep from "./CheckoutStep";
import Box from "@mui/material/Box";

export type CheckoutSteps = "tos" | "payment" | undefined;

const stepLabels = {
  tos: "Betingelser",
  payment: "Betaling",
};

const CheckoutStepper = ({ steps }: { steps: CheckoutSteps[] }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Stepper orientation="vertical" activeStep={activeStep}>
      {steps.map((step) => {
        if (step === undefined) return;
        return (
          <Step key={step}>
            <StepLabel>{stepLabels[step]}</StepLabel>
            <StepContent>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CheckoutStep step={steps[activeStep]} />

                <ButtonGroup sx={{ marginTop: "1rem" }}>
                  {activeStep > 0 && (
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep((previous) => previous - 1)}
                    >
                      Tilbake
                    </Button>
                  )}
                  {activeStep < steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep((previous) => previous + 1)}
                    >
                      Videre
                    </Button>
                  )}
                </ButtonGroup>
              </Box>
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default CheckoutStepper;
