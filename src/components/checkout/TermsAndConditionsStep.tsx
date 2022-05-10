import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction, useEffect } from "react";
import Box from "@mui/material/Box";
import NextLink from "next/link";

const TermsAndConditionsStep = ({
  setWait,
}: {
  setWait: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setWait(false);
  }, [setWait]);
  return (
    <>
      <Typography variant="h4">
        Boklistens betingelser for utlån og salg av bøker på avdrag
      </Typography>
      <Typography variant="body1">
        Ved å gå videre godtar du Boklistens betingelser for utlån og salg av
        bøker på avdrag.
      </Typography>
      <Box sx={{ width: "100px", mt: ".5rem" }}>
        <NextLink href="/info/policies/conditions" passHref>
          <a href="/" target="_blank">
            <Button>Les mer</Button>
          </a>
        </NextLink>
      </Box>
    </>
  );
};
export default TermsAndConditionsStep;
