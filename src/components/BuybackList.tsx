import {
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

interface SimpleItem {
  title: string;
  isbn: string;
}

const BuybackList = ({ items }: { items?: SimpleItem[] }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        data-testid="qna-title"
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
            {items &&
              items.map((item) => (
                <TableRow
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
        {[...Array.from({ length: 25 })].map((_element, index) => (
          <Skeleton key={index} animation="wave" sx={{ marginX: 1 }} />
        ))}
      </TableContainer>
    </Box>
  );
};

export default BuybackList;
