import TermsAndConditionsStep from "./TermsAndConditionsStep";
import { Alert } from "@mui/material";
import { CheckoutSteps } from "./CheckoutStepper";
import PaymentStep from "./PaymentStep";
import DeliveryStep from "./DeliveryStep";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserDetail } from "@boklisten/bl-model";
import { getAccessTokenBody } from "../../api/token";
import { get } from "../../api/api";

const CheckoutStep = ({
  step,
  setWait,
  wait,
}: {
  step: CheckoutSteps;
  setWait: Dispatch<SetStateAction<boolean>>;
  wait: boolean;
}) => {
  const [userDetails, setUserDetails] = useState<UserDetail>();

  useEffect(() => {
    const { details } = getAccessTokenBody();
    const userDetailUrl = `userdetails/${details}`;
    const fetchDetails = async () => {
      const data = await get(userDetailUrl);
      setUserDetails(data.data.data[0]);
    };
    fetchDetails();
  }, []);

  switch (step) {
    case "tos": {
      return <TermsAndConditionsStep setWait={setWait} />;
    }
    case "payment": {
      return <PaymentStep />;
    }
    case "delivery": {
      return (
        <DeliveryStep wait={wait} setWait={setWait} userDetails={userDetails} />
      );
    }
    default: {
      return (
        <Alert severity="error">
          Noe gikk galt! Vennligst prøv igjen senere.
        </Alert>
      );
    }
  }
};

export default CheckoutStep;
