import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const BackButton = ({
  hasCustomerItemsInCart,
}: {
  hasCustomerItemsInCart: boolean;
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        router.push(hasCustomerItemsInCart ? "/users/me/items" : "/order")
      }
      sx={{ width: "200px" }}
    >
      {hasCustomerItemsInCart ? "Tilbake til mine bøker" : "Endre fag"}
    </Button>
  );
};

export default BackButton;
