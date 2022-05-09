import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { fetcher } from "api/requests";
import { useEffect } from "react";
import useSWR, { SWRResponse } from "swr";
import BL_CONFIG from "utils/bl-config";
import { Branch } from "@boklisten/bl-model";
import { add, get } from "api/storage";
import { selectBranch, setSelectedBranch } from "redux/selectedBranch";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { useRouter } from "next/router";
import { setCart } from "../redux/cart";
import { setSelectedSubjects } from "../redux/selectedSubjects";
import { setSelectedCustomerItemActions } from "../redux/selectedCustomerItemActions";

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
          {!selectedBranch.id ? "Velg skole" : "Valgt skole"}
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
