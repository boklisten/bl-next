import { UserDetail } from "@boklisten/bl-model";
import { Alert } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { get } from "@/api/api";
import { getAccessTokenBody } from "@/api/token";
import { CheckoutSteps } from "@/components/checkout/CheckoutStepper";
import DeliveryStep from "@/components/checkout/DeliveryStep";
import PaymentStep from "@/components/checkout/PaymentStep";
import TermsAndConditionsStep from "@/components/checkout/TermsAndConditionsStep";

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
