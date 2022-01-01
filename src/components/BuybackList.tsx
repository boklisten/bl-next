import {
  Alert,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AxiosError } from "axios";

interface SimpleItem {
  title: string;
  isbn: string;
}

const BuybackList = ({
  items,
  error,
}: {
  items?: SimpleItem[];
  error: AxiosError;
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
      >
        Innkjøpsliste
      </Typography>
      <Typography sx={{ marginX: 2 }}>
        Dette er listen over bøkene vi kjøper inn. Vær oppmerksom på at denne
        listen kan endre seg fortløpende. Vi tar forbehold for eventuelle feil i
        innkjøpslisten!
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="tabell over innkjøpsliste">
          <TableHead>
            <TableRow>
              <TableCell>Tittel</TableCell>
              <TableCell>ISBN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!error &&
              items &&
              items.map((item) => (
                <TableRow
                  data-testid="table-row"
                  key={item.isbn}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell>{item.isbn}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!error &&
          !items &&
          [...Array.from({ length: 25 })].map((_element, index) => (
            <Skeleton
              key={index}
              height="40px"
              animation="wave"
              sx={{ marginX: 1 }}
            />
          ))}
        {error &&
          (error?.response?.status === 404 ? (
            <Alert severity="info" data-testid="missing-error">
              Ingen bøker i listen. Kom tilbake senere for å se en oppdatert
              liste.
            </Alert>
          ) : (
            <Alert severity="error" data-testid="api-error">
              Noe gikk galt! Vennligst prøv igjen senere.
            </Alert>
          ))}
      </TableContainer>
    </Box>
  );
};

export default BuybackList;
