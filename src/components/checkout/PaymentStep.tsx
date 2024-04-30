import DibsPayment from "@/components/checkout/DibsPayment";
import PaymentSummary from "@/components/checkout/PaymentSummary";

const PaymentStep = () => {
  return (
    <>
      <PaymentSummary />
      <DibsPayment />
    </>
  );
};

export default PaymentStep;
