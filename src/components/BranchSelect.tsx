"use client";
import { Branch } from "@boklisten/bl-model";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR, { SWRResponse } from "swr";

import { fetcher } from "@/api/requests";
import { add, get } from "@/api/storage";
import BL_CONFIG from "@/utils/bl-config";
import { useGlobalState } from "@/utils/useGlobalState";

export const branchListUrl = `${BL_CONFIG.api.basePath}branches?og=name&active=true&sort=name`;

const BranchSelect = ({ isNav }: { isNav?: boolean }) => {
  const { data }: SWRResponse = useSWR(branchListUrl, fetcher);
  const branches = data as Branch[];

  const { selectedBranchId, setSelectedBranchId } = useGlobalState();

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    try {
      const storedBranchId = get("bl-current-branch-id");
      setSelectedBranchId(storedBranchId);
    } catch {
      // no stored branch
    }
  }, [branches, setSelectedBranchId]);

  const handleChange = (event: SelectChangeEvent) => {
    const branchId = event.target.value as string;
    setSelectedBranchId(branchId);
    add("bl-current-branch-id", branchId);

    if (pathName?.includes("info/branch")) {
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
          {selectedBranchId ? "Valgt skole" : "Velg skole"}
        </InputLabel>
        <Select
          data-testid="branchSelect"
          sx={{ color: isNav ? "white" : "inherit" }}
          value={selectedBranchId ?? ""}
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
