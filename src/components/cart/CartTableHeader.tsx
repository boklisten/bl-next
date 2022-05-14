import { TableCell, TableHead, TableRow } from "@mui/material";

const CartTableHeader = ({
  hasCustomerItemsInCart,
  branchCoversCosts,
}: {
  hasCustomerItemsInCart: boolean;
  branchCoversCosts: boolean;
}) => (
  <TableHead>
    <TableRow>
      <TableCell>Tittel</TableCell>
      <TableCell>{hasCustomerItemsInCart ? "Handling" : "Betal nå"}</TableCell>
      <TableCell>
        {!branchCoversCosts && (hasCustomerItemsInCart ? "Pris" : "2. avdrag")}
      </TableCell>
      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
        {hasCustomerItemsInCart ? "Ny frist" : "Frist"}
      </TableCell>
      <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}></TableCell>
    </TableRow>
  </TableHead>
);

export default CartTableHeader;
