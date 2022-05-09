import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

const TermsAndConditionsStep = () => {
  return (
    <>
      <Typography variant="h4">
        Boklistens betingelser for utlån og salg av bøker på avdrag
      </Typography>
      <Typography variant="body1">
        Ved å gå videre godtar du Boklistens betingelser for utlån og salg av
        bøker på avdrag.
      </Typography>
      <Link href="/info/policies/conditions" passHref>
        <Button sx={{ width: "100px", mt: ".5rem" }} variant="outlined">
          Les mer
        </Button>
      </Link>
    </>
  );
};
export default TermsAndConditionsStep;
