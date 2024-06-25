import { DeliveryInfoBring, UserDetail } from "@boklisten/bl-model";
import {
  Alert,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import isPostalCode from "validator/lib/isPostalCode";

import { add } from "@/api/api";
import { fetchData } from "@/api/requests";
import {
  extractFirstName,
  extractLastName,
} from "@/components/user/UserDetailEditor";
import { selectOrderID, setDeliveryPrice } from "@/redux/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type PostalDeliveryFields = {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
};

const toReadableProduct = (productId: string) =>
  productId === "3584" ? "pakke i postkassen" : "pakke til hentested";

const DeliveryInfo = ({
  deliveryInfo,
}: {
  deliveryInfo: DeliveryInfoBring | undefined;
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pakketype</TableCell>
            <TableCell>Pris</TableCell>
            <TableCell>Estimert levering</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {deliveryInfo ? (
              <>
                <TableCell>
                  {toReadableProduct(deliveryInfo.product ?? "")}
                </TableCell>
                <TableCell>
                  {deliveryInfo.amount}
                  {"\u00A0"}kr
                </TableCell>
                <TableCell>
                  {moment(deliveryInfo.estimatedDelivery).format("DD/MM/YY")}
                </TableCell>
              </>
            ) : (
              [0, 1, 2].map((skeletonID) => (
                <TableCell key={`skeleton-${skeletonID}`}>
                  <Skeleton />
                </TableCell>
              ))
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const PostalDelivery = ({
  userDetails,
  setWait,
}: {
  userDetails: UserDetail;
  setWait: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const orderID = useAppSelector(selectOrderID);
  const defaultValues = {
    firstName: extractFirstName(userDetails.name),
    lastName: extractLastName(userDetails.name),
    address: userDetails.address,
    postalCode: userDetails.postCode,
  };
  const [postalCity, setPostalCity] = useState(userDetails.postCity);
  const [waitingForPostalCity, setWaitingForPostalCity] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoBring>();

  const updateDeliveryInfo = async (
    fullName: string,
    address: string,
    postalCode: string,
    postalCity: string,
    orderID: string,
  ) => {
    setWait(true);
    const deliveryInfo: DeliveryInfoBring | undefined = await add(
      "deliveries",
      {
        method: "bring",
        info: {
          from: "1364",
          to: postalCode,
          shipmentAddress: {
            name: fullName,
            address,
            postalCode,
            postalCity,
          },
          facilityAddress: {
            address: "Martin Lingesvei 25",
            postalCode: "1364",
            postalCity: "FORNEBU",
          },
        },
        order: orderID,
        amount: 0,
      },
    ).then((response) => response?.data.data[0].info);

    if (!deliveryInfo) return;
    setDeliveryInfo(deliveryInfo);
    dispatch(setDeliveryPrice(deliveryInfo.amount));

    const wait = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setWait(false);
    };
    wait();
  };

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<PostalDeliveryFields>({ mode: "onTouched", defaultValues });

  useEffect(() => {
    updateDeliveryInfo(
      getValues("firstName") + getValues("lastName"),
      getValues("address"),
      getValues("postalCode"),
      postalCity,
      orderID,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues, orderID, postalCity]);

  return (
    <Box component="form" sx={{ width: { sm: "100%", md: "50%" } }}>
      {Object.entries(errors).map(([type, message]) => (
        <Alert
          key={type}
          severity="error"
          data-testid="error-message"
          sx={{ marginY: 1 }}
        >
          {message.message}
        </Alert>
      ))}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} mt={1}>
          <Typography variant="body1">Leveringsadresse</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            data-testid="first-name-field"
            required
            autoComplete="given-name"
            fullWidth
            id="firstName"
            label="Fornavn"
            error={!!errors.firstName}
            {...register("firstName", {
              required: "Du må fylle inn fornavn",
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            data-testid="last-name-field"
            required
            fullWidth
            id="lastName"
            label="Etternavn"
            autoComplete="family-name"
            error={!!errors.lastName}
            {...register("lastName", {
              required: "Du må fylle inn etternavn",
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            data-testid="address-field"
            required
            fullWidth
            id="address"
            label="Adresse"
            autoComplete="street-address"
            error={!!errors.address}
            {...register("address", {
              required: "Du må fylle inn adresse",
            })}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <TextField
            data-testid="postal-code-field"
            required
            fullWidth
            id="postalCode"
            label="Postnummer"
            autoComplete="postal-code"
            error={!!errors.postalCode}
            {...register("postalCode", {
              // Need to have a separate onChange because of autofill not triggering validation
              onChange: async (event) => {
                if (!isPostalCode(event.target.value, "NO")) {
                  setPostalCity("");
                  return;
                }

                setWaitingForPostalCity(true);
                // eslint-disable-next-line unicorn/no-useless-undefined
                setDeliveryInfo(undefined);
                const response = await fetchData(
                  "/api/postal-code",
                  "POST",
                  event.target.value,
                );
                setWaitingForPostalCity(false);
                if (!response.postalCity) {
                  setPostalCity("");
                  return;
                }

                setPostalCity(response.postalCity);

                await updateDeliveryInfo(
                  getValues("firstName") + getValues("lastName"),
                  getValues("address"),
                  event.target.value,
                  postalCity,
                  orderID,
                );
              },
              required: "Du må fylle inn postnummer",
              validate: async (v) => {
                const illegalPostalCodeMessage =
                  "Du må oppgi et gyldig norsk postnummer";
                if (!isPostalCode(v, "NO")) {
                  return illegalPostalCodeMessage;
                }

                const response = await fetchData("/api/postal-code", "POST", v);

                if (!response.postalCity) {
                  return illegalPostalCodeMessage;
                }

                return true;
              },
            })}
          />
          <Typography
            sx={{ position: "absolute", mr: 3 }}
            variant="subtitle1"
            color="gray"
            data-testid="postal-city-preview"
          >
            {waitingForPostalCity && (
              <Skeleton variant="rectangular" width={50} height="1rem" />
            )}
            {postalCity}
          </Typography>
        </Grid>
      </Grid>
      <DeliveryInfo deliveryInfo={deliveryInfo} />
    </Box>
  );
};

export default PostalDelivery;
