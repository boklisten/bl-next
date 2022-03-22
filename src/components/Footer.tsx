import ContactInfo from "./ContactInfo";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import CopyrightIcon from "@mui/icons-material/Copyright";
import moment from "moment";

export default function Footer() {
  return (
    <Card
      data-testid="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <ContactInfo />
      <Typography sx={{ display: "flex", gap: ".4rem" }}>
        Boklisten.no AS
        <CopyrightIcon />
        {moment().format("YYYY")}
      </Typography>
    </Card>
  );
}
