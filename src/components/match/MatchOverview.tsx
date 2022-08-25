import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import React from "react";
import { Match } from "@boklisten/bl-model";
import Scanner from "./Scanner";

const MATCH_INFO = {
  receive: {
    intro:
      'Du skal motta bøkene dine fra en annen elev. Du finner detaljer hvem, hvor, når og hvilke bøker på denne siden. Når du møter eleven, må du scanne bøkene han gir til deg for å bekrefte overleveringen. Du gjør dette ved å trykke på "Scan bøker" nedenfor.',
    statusHeader: "Mottatt?",
    deliveryHeader: "Skal mottas av",
  },
  deliver: {
    intro:
      "Du skal levere bøkene dine til en annen elev. Du finner detaljer hvem, hvor, når og hvilke bøker på denne siden. Når du møter eleven, scanner hen bøkene dine, og du vil i tabellen under se at de er overlevert. Det er viktig at alle bøkene står om overlevert for at du ikke skal få gebyrfaktura for bøker du egentlig har levert.",
    statusHeader: "Avlevert?",
    deliveryHeader: "Skal leveres til",
  },
};

const MatchOverview = ({
  match,
  receive = false,
}: {
  match: Match;
  receive: boolean;
}) => {
  const matchInfo = receive ? MATCH_INFO.receive : MATCH_INFO.deliver;
  console.log(match);

  return (
    <>
      <Typography>{matchInfo.intro}</Typography>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
      >
        Disse bøkene
      </Typography>
      {match.items.map((item) => (
        <TableContainer key={item.customerItem} component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tittel</TableCell>
                <TableCell>{matchInfo.statusHeader}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{item.title}</TableCell>
                <TableCell>TODO</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
      >
        {matchInfo.deliveryHeader}
      </Typography>
      {(receive ? [match.sender] : match.recievers).map((otherPerson) => (
        <Box
          key={otherPerson.userId}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <PhoneIphoneIcon sx={{ marginRight: ".2rem" }} />
          <Box>
            <Typography>{otherPerson.name}</Typography>
            <Typography>{otherPerson.phone}</Typography>
          </Box>
        </Box>
      ))}
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
      >
        Dere møtes ved
      </Typography>
      <Typography>Ved siden av Boklistens stand klokken TODO</Typography>
      {receive && <Scanner />}
    </>
  );
};

export default MatchOverview;