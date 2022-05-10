import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCartItems, setDeliveryPrice } from "../../redux/cart";
import { Dispatch, SetStateAction, useEffect } from "react";

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
