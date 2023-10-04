import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useEffect } from "react";

import { selectCartItems, setDeliveryPrice } from "redux/cart";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const BranchDelivery = ({
  setWait,
}: {
  setWait: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  useEffect(() => {
    dispatch(setDeliveryPrice(0));
    const wait = async () => {
      await new Promise((resolve) => setTimeout(resolve));
      setWait(false);
    };
    wait();
  }, [dispatch, setWait]);

  return (
    <>
      <Typography sx={{ marginTop: "1rem" }}>Hent bøkene selv på</Typography>
      <Typography variant="h6">{cartItems[0]?.branch.name}</Typography>
    </>
  );
};

export default BranchDelivery;
