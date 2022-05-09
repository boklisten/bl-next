import TermsAndConditionsStep from "./TermsAndConditionsStep";
import { Alert } from "@mui/material";
import { CheckoutSteps } from "./CheckoutStepper";
import PaymentStep from "./PaymentStep";

const CheckoutStep = ({ step }: { step: CheckoutSteps }) => {
  switch (step) {
    case "tos":
      return <TermsAndConditionsStep />;
    case "payment":
      return <PaymentStep />;
    default:
      return (
        <Alert severity="error">
          Noe gikk galt! Vennligst prøv igjen senere.
        </Alert>
      );
  }
};

export default CheckoutStep;
