import { Branch, Period } from "@boklisten/bl-model";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";

import { CartItem, updatePeriod } from "@/redux/cart";
import { useAppDispatch } from "@/redux/hooks";
import {
  getOrderItemTypeFromBranch,
  getPartlyPaymentPeriodDate,
  getRentPeriodDate,
} from "@/utils/cartUtils";

const getDeadline = (period: Period, branch: Branch) => {
  const deadline =
    getOrderItemTypeFromBranch(branch) === "rent"
      ? getRentPeriodDate(branch, period)
      : getPartlyPaymentPeriodDate(branch, period);
  return moment(deadline).format("DD/MM/YY");
};

const SelectDeadline = ({ cartItem }: { cartItem: CartItem }) => {
  const dispatch = useAppDispatch();
  return (
    <FormControl>
      <InputLabel id="select-deadline">Velg frist</InputLabel>
      <Select
        labelId="select-deadline"
        value={cartItem.orderItem.info?.periodType}
        label="Velg frist"
        onChange={(event) =>
          dispatch(
            updatePeriod({
              cartItem,
              updatedPeriod: event.target.value as Period,
            }),
          )
        }
      >
        <MenuItem value="semester">
          {getDeadline("semester", cartItem.branch)}
        </MenuItem>
        <MenuItem value="year">{getDeadline("year", cartItem.branch)}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectDeadline;
