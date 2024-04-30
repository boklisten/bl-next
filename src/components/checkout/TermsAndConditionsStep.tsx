import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction, useEffect } from "react";

import DynamicLink from "@/components/DynamicLink";

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
        <DynamicLink href={"/info/policies/conditions"} target={"_blank"}>
          Les mer
        </DynamicLink>
      </Box>
    </>
  );
};
export default TermsAndConditionsStep;
