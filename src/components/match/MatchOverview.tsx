import {
  Alert,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import React, { ReactNode, useCallback, useState } from "react";
import { Match } from "@boklisten/bl-model";
import Scanner from "./Scanner";
import moment from "moment";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ErrorIcon from "@mui/icons-material/Error";
import ScheduleIcon from "@mui/icons-material/Schedule";

interface MatchInfo {
  intro: string;
  statusHeader: string;
  deliveryHeader: string;
}

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

const MatchItemTable = ({
  match,
  matchInfo,
}: {
  match: Match;
  matchInfo: MatchInfo;
}) => {
  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tittel</TableCell>
            <TableCell>{matchInfo.statusHeader}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {match.items.map((item) => (
            <TableRow key={item.customerItem}>
              <TableCell>{item.title}</TableCell>
              <Tooltip
                title={
                  // @ts-ignore
                  item.blid
                    ? "Denne boken er registrert som mottatt"
                    : "Dette boken har ikke blitt registrert som mottatt"
                }
              >
                <TableCell>
                  {/*@ts-ignore*/}
                  {item.blid ? (
                    <CheckBoxIcon sx={{ color: "green" }} />
                  ) : (
                    <ErrorIcon sx={{ color: "orange" }} />
                  )}
                </TableCell>
              </Tooltip>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const OtherPersonContact = ({
  match,
  receive,
}: {
  match: Match;
  receive: boolean;
}) => {
  return (
    <>
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
    </>
  );
};

const MatchHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      variant="h6"
      sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
    >
      {children}
    </Typography>
  );
};

const MeetingInfo = ({ match }: { match: Match }) => {
  // @ts-ignore
  const meetingTime = moment(match.meetingPoint[0].time);
  // @ts-ignore
  const meetingLocation = match.meetingPoint[0].location.description;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography>{meetingLocation}</Typography>
      <Box sx={{ display: "flex", marginTop: ".2rem", alignItems: "center" }}>
        <ScheduleIcon sx={{ marginRight: ".2rem" }} />
        <Typography
          fontWeight="bold"
          variant={"subtitle1"}
        >{`mandag ${meetingTime.format(
          "DD/MM/YYYY"
        )} klokken ${meetingTime.format("HH:mm")}`}</Typography>
      </Box>
    </Box>
  );
};

const MatchOverview = ({
  match,
  receive = false,
}: {
  match: Match;
  receive: boolean;
}) => {
  const matchInfo: MatchInfo = receive
    ? MATCH_INFO.receive
    : MATCH_INFO.deliver;

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <>
      <Typography>{matchInfo.intro}</Typography>
      {/*@ts-ignore*/}
      {match.items.every((item) => item.blid) && (
        <Alert sx={{ marginTop: "1rem" }}>
          Du har mottatt alle bøkene dine. Lykke til med skolestart!
        </Alert>
      )}

      <MatchHeader>Disse bøkene</MatchHeader>
      <MatchItemTable match={match} matchInfo={matchInfo} />

      <MatchHeader>{matchInfo.deliveryHeader}</MatchHeader>
      <OtherPersonContact match={match} receive={receive} />

      <MatchHeader>Dere møtes ved</MatchHeader>
      <MeetingInfo match={match} />

      <MatchHeader>Når du skal motta bøkene</MatchHeader>
      {receive && <Scanner match={match} forceUpdate={forceUpdate} />}
    </>
  );
};

export default MatchOverview;
