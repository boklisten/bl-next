import {
  Alert,
  ButtonGroup,
  Card,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Branch, CustomerItem, Item } from "@boklisten/bl-model";
import moment from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  CustomerItemAction,
  selectCustomerItemActions,
  setSelectedCustomerItemActions,
} from "../redux/selectedCustomerItemActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { setCart } from "../redux/cart";
import {
  generateCartItemsFromCustomerItemActions,
  getExtendTime,
} from "../utils/cartUtils";

const calculateMaxDeadline = (): string => {
  const now = moment();
  const day = now.format("DD");
  const month = now.format("MM");
  const year = now.format("YYYY");

  if (month === "12" && Number(day) > 19) {
    return `${year}-12-31`;
  }

  const lastYear = now.subtract(1, "year").format("YYYY");
  return `${lastYear}-12-31`;
};

const isDeadlineExpired = (deadline: string): boolean => {
  if (moment().isAfter(moment(deadline).endOf("day"))) {
    const maxDeadline = calculateMaxDeadline();
    if (maxDeadline !== undefined) {
      return (
        moment().subtract(1, "month").isAfter(moment(deadline)) ||
        moment().isAfter(moment(maxDeadline).endOf("day"))
      );
    }
    return true;
  }
  return false;
};
const canBuyout = (customerItem: CustomerItem) => {
  return (
    !isDeadlineExpired(customerItem.deadline.toString()) &&
    !moment().isSameOrBefore(
      moment(customerItem.creationTime).add(2, "weeks")
    ) &&
    !customerItem.returned &&
    !customerItem.match
  );
};

const getStatus = (customerItem: CustomerItem) => {
  if (customerItem.buyout) return orderTypes.buyout;

  if (customerItem.buyback) return orderTypes.buyback;

  if (customerItem.returned) return orderTypes.return;

  if (customerItem.cancel) return orderTypes.cancel;

  return "test";
};

const orderTypes = {
  buyout: "kjøpt ut",
  return: "returnert",
  cancel: "kansellert",
  buyback: "tilbakekjøp",
};

const CustomerItemOverview = ({
  customerItems,
  branchInfo,
  branchNames,
}: {
  customerItems: CustomerItem[];
  branchInfo: Branch;
  branchNames: Branch[];
}) => {
  const [showInactive, setShowInactive] = useState(false);
  const itemActions = useAppSelector(selectCustomerItemActions);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loadingCart, setLoadingCart] = useState(false);

  const ActionInfo = ({
    customerItemAction,
  }: {
    customerItemAction: CustomerItemAction;
  }) => {
    const info =
      customerItemAction.action === "buyout"
        ? `Kjøp ut for ${customerItemAction.customerItem.amountLeftToPay} kr`
        : `Forleng til ${moment(getExtendTime(branchInfo)).format(
            "DD/MM/YY"
          )} for 50kr`;
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2">{info}</Typography>
      </Box>
    );
  };

  const canExtend = (customerItem: CustomerItem) => {
    if (isDeadlineExpired(customerItem.deadline.toString())) {
      return false;
    }

    return (
      (customerItem.periodExtends?.length ?? 0) === 0 &&
      branchInfo.paymentInfo?.extendPeriods.some(
        (extendPeriod) =>
          extendPeriod.type === "semester" &&
          customerItem.deadline !== extendPeriod.date
      )
    );
  };

  const hasItemAction = (customerItemAction: CustomerItemAction) => {
    return itemActions.some(
      (itemAction) =>
        itemAction.customerItem.id === customerItemAction.customerItem.id &&
        itemAction.action === customerItemAction.action
    );
  };

  const updateItemActions = (customerItemAction: CustomerItemAction) => {
    const wantToSwitchAction = (customerItemAction: CustomerItemAction) => {
      return itemActions.some(
        (itemAction) =>
          itemAction.customerItem.id === customerItemAction.customerItem.id &&
          itemAction.action !== customerItemAction.action
      );
    };

    let updatedItemActions: CustomerItemAction[] = itemActions;

    const wantToRemoveAction = hasItemAction(customerItemAction);
    const wantToSwitch = wantToSwitchAction(customerItemAction);
    if (wantToRemoveAction || wantToSwitch) {
      let targetAction = customerItemAction.action;
      if (wantToSwitch) {
        targetAction = targetAction === "extend" ? "buyout" : "extend";
      }
      updatedItemActions = itemActions.filter(
        (itemAction) =>
          !(
            itemAction.customerItem.id === customerItemAction.customerItem.id &&
            itemAction.action === targetAction
          )
      );
    }

    if (!wantToRemoveAction) {
      updatedItemActions = [...updatedItemActions, customerItemAction];
    }

    dispatch(setSelectedCustomerItemActions(updatedItemActions));
  };

  return (
    <>
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
                      <TableCell
                        align="center"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <b>2. avdrag</b>
                        <Tooltip title="Dersom du leverer tilbake boken før fristen, slipper du å betale dette beløpet.">
                          <HelpOutlineIcon
                            fontSize="small"
                            sx={{ marginLeft: ".1rem" }}
                          />
                        </Tooltip>
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
              {isDeadlineExpired(customerItem.deadline.toString()) && (
                <Alert severity="error">
                  Denne boken har ikke blitt returnert innen fristen, du vil
                  motta informasjon om hva du skal gjøre.
                </Alert>
              )}
              {!isDeadlineExpired(customerItem.deadline.toString()) &&
                customerItem.handoutInfo?.handoutById !== branchInfo.id && (
                  <Alert severity="warning">
                    Denne boken er utdelt på en annen skole. Velg{" "}
                    {
                      (
                        branchNames.find(
                          (branch) =>
                            branch.id === customerItem.handoutInfo?.handoutById
                        ) as Branch
                      ).name
                    }{" "}
                    for å gjøre endringer.
                  </Alert>
                )}
              {customerItem.handoutInfo?.handoutById === branchInfo.id &&
                !isDeadlineExpired(customerItem.deadline.toString()) && (
                  <ButtonGroup
                    sx={{
                      display: "flex",
                      gap: ".2rem",
                      justifyContent: "center",
                      paddingY: ".7rem",
                    }}
                  >
                    {branchInfo.paymentInfo?.extendPeriods &&
                      branchInfo.paymentInfo.extendPeriods.length > 0 && (
                        <Tooltip
                          title={
                            "Du kan forlenge fristen for bøker 1 gang per bok. " +
                            (canExtend(customerItem)
                              ? ""
                              : "Du har allerede forlenget boken.")
                          }
                        >
                          <span>
                            <Button
                              onClick={() =>
                                updateItemActions({
                                  customerItem,
                                  action: "extend",
                                })
                              }
                              variant={
                                hasItemAction({
                                  customerItem,
                                  action: "extend",
                                })
                                  ? "contained"
                                  : "outlined"
                              }
                              color={
                                hasItemAction({
                                  customerItem,
                                  action: "extend",
                                })
                                  ? "success"
                                  : "primary"
                              }
                              disabled={!canExtend(customerItem)}
                            >
                              Forleng
                            </Button>
                          </span>
                        </Tooltip>
                      )}
                    <Tooltip
                      title={
                        canBuyout(customerItem)
                          ? ""
                          : "Du kan ikke kjøpe ut denne boken før det har gått 2 uker"
                      }
                    >
                      <Box>
                        <Button
                          disabled={!canBuyout(customerItem)}
                          onClick={() =>
                            updateItemActions({
                              customerItem,
                              action: "buyout",
                            })
                          }
                          variant={
                            hasItemAction({ customerItem, action: "buyout" })
                              ? "contained"
                              : "outlined"
                          }
                          color={
                            hasItemAction({ customerItem, action: "buyout" })
                              ? "success"
                              : "primary"
                          }
                        >
                          Kjøp ut
                        </Button>
                      </Box>
                    </Tooltip>
                  </ButtonGroup>
                )}
              {hasItemAction({ customerItem, action: "buyout" }) && (
                <ActionInfo
                  customerItemAction={{ customerItem, action: "buyout" }}
                />
              )}
              {hasItemAction({ customerItem, action: "extend" }) && (
                <ActionInfo
                  customerItemAction={{ customerItem, action: "extend" }}
                />
              )}
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
      {itemActions.length > 0 && (
        <LoadingButton
          loading={loadingCart}
          color="success"
          variant="contained"
          sx={{ position: "fixed", bottom: ".5rem", zIndex: 10 }}
          onClick={async () => {
            setLoadingCart(true);
            const cartItems = await generateCartItemsFromCustomerItemActions(
              itemActions,
              branchInfo
            );
            dispatch(setCart(cartItems));
            setLoadingCart(false);
            router.push("/cart");
          }}
        >
          Til handlekurv ({itemActions.length})
        </LoadingButton>
      )}
    </>
  );
};

export default CustomerItemOverview;
