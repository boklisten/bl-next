import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { fetcher } from "api/requests";
import { useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import BL_CONFIG from "utils/bl-config";
import { Branch } from "@boklisten/bl-model";
import { add, get } from "api/storage";

export const branchListUrl = `${BL_CONFIG.api.basePath}branches?og=name&active=true&sort=name`;

const BranchSelect = () => {
  const { data }: SWRResponse = useSWR(branchListUrl, fetcher);
  const branches = data as Branch[];

  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    try {
      setSelectedBranch(get("bl-current-branch-id"));
    } catch {
      // no stored branch
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const branch = event.target.value as string;
    setSelectedBranch(branch);
    add("bl-current-branch-id", branch);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          data-testid="branchSelectLabel"
          id="demo-simple-select-label"
          sx={{ color: "white" }}
        >
          {!selectedBranch ? "Velg skole" : "Valgt skole"}
        </InputLabel>
        <Select
          data-testid="branchSelect"
          sx={{ color: "white" }}
          value={selectedBranch}
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
