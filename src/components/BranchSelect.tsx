import { Branch } from "@boklisten/bl-model";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { SWRResponse } from "swr";

import { fetcher } from "@/api/requests";
import { add, get } from "@/api/storage";
import { setCart, setDeliveryMethod } from "@/redux/cart";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectBranch, setSelectedBranch } from "@/redux/selectedBranch";
import { setSelectedCustomerItemActions } from "@/redux/selectedCustomerItemActions";
import { setSelectedSubjects } from "@/redux/selectedSubjects";
import BL_CONFIG from "@/utils/bl-config";

export const branchListUrl = `${BL_CONFIG.api.basePath}branches?og=name&active=true&sort=name`;

const BranchSelect = ({ isNav }: { isNav?: boolean }) => {
  const { data }: SWRResponse = useSWR(branchListUrl, fetcher);
  const branches = data as Branch[];

  const selectedBranch = useAppSelector(selectBranch);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    try {
      const storedBranchId = get("bl-current-branch-id");
      dispatch(setSelectedBranch(storedBranchId));
    } catch {
      // no stored branch
    }
  }, [dispatch, branches]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setCart([]));
    dispatch(setSelectedSubjects([]));
    dispatch(setSelectedCustomerItemActions([]));
    // eslint-disable-next-line unicorn/no-useless-undefined
    dispatch(setDeliveryMethod(undefined));
    const branchId = event.target.value as string;
    dispatch(setSelectedBranch(branchId));
    add("bl-current-branch-id", branchId);

    if (router.pathname.includes("info/branch")) {
      router.push(`/info/branch/${branchId}`);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          data-testid="branchSelectLabel"
          id="demo-simple-select-label"
          sx={{ color: isNav ? "white" : "inherit" }}
        >
          {selectedBranch.id ? "Valgt skole" : "Velg skole"}
        </InputLabel>
        <Select
          data-testid="branchSelect"
          sx={{ color: isNav ? "white" : "inherit" }}
          value={selectedBranch.id}
          label="Valgt skole"
          onChange={handleChange}
        >
          {branches?.map((branch) => (
            <MenuItem
              data-testid="branchOption"
              value={branch.id}
              key={branch.id as string}
            >
              {branch.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BranchSelect;
