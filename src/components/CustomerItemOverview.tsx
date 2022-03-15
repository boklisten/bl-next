import {
  Card,
  Collapse,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CustomerItem, Item } from "@boklisten/bl-model";
import moment from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const CustomerItemOverview = ({
  customerItems,
}: {
  customerItems: CustomerItem[];
}) => {
  const [showInactive, setShowInactive] = useState(false);

  const getStatus = (customerItem: CustomerItem) => {
    if (customerItem.buyout) return orderTypes.buyout;

    if (customerItem.buyback) return orderTypes.buyback;

    if (customerItem.returned) return orderTypes.return;

    if (customerItem.cancel) return orderTypes.cancel;

    console.log(customerItem);
    return "test";
  };

  const orderTypes = {
    buyout: "kjøpt ut",
    return: "returnert",
    cancel: "kansellert",
    buyback: "tilbakekjøp",
  };
  console.log(customerItems);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
      >
        Mine bøker
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {customerItems
          .filter(
            (customerItem) => !customerItem.returned && !customerItem.buyout
          )
          .map((customerItem) => (
            <Card key={customerItem.id} sx={{ width: "400px" }}>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", marginBottom: "1rem" }}
              >
                {(customerItem.item as Item).title}
              </Typography>
              <TableContainer component={Box}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <b>Utdelt</b>
                      </TableCell>
                      <TableCell align="center">
                        {moment(customerItem.handoutInfo?.time ?? "").format(
                          "DD/MM/YYYY"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <b>Igjen å betale</b>
                      </TableCell>
                      <TableCell align="center">
                        {customerItem.amountLeftToPay} kr
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <b>Frist</b>
                      </TableCell>
                      <TableCell align="center">
                        {moment(customerItem.deadline).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {/** Vise bøker som har utgått frist her???*/}
                <Button>Forleng</Button>
                <Button>Kjøp ut</Button>
              </Box>
            </Card>
          ))}
      </Box>
      <Button
        variant="outlined"
        sx={{ marginY: "2rem" }}
        onClick={() => setShowInactive(!showInactive)}
      >
        {showInactive ? "Skjul inaktive bøker" : "Vis inaktive bøker"}
      </Button>
      <Collapse in={showInactive}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {customerItems
            .filter(
              (customerItem) =>
                customerItem.returned ||
                customerItem.buyout ||
                customerItem.buyback ||
                customerItem.cancel
            )
            .map((customerItem) => (
              <Card key={customerItem.id} sx={{ width: "400px" }}>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", marginBottom: "1rem" }}
                >
                  {(customerItem.item as Item).title}
                </Typography>
                <TableContainer component={Box}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <b>Utdelt</b>
                        </TableCell>
                        <TableCell align="center">
                          {moment(customerItem.handoutInfo?.time ?? "").format(
                            "DD/MM/YYYY"
                          )}
                        </TableCell>
                      </TableRow>
                      {customerItem.returned && (
                        <TableRow>
                          <TableCell align="center">
                            <b>Levert</b>
                          </TableCell>
                          <TableCell align="center">
                            {moment(customerItem.returnInfo?.time).format(
                              "DD/MM/YYYY"
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell align="center">
                          <b>Status</b>
                        </TableCell>
                        <TableCell align="center">
                          {getStatus(customerItem)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            ))}
        </Box>
      </Collapse>
    </Container>
  );
};

export default CustomerItemOverview;
