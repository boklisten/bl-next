import { Branch } from "@boklisten/bl-model";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import useSWR from "swr";

import BlFetcher from "@/api/blFetcher";
import BL_CONFIG from "@/utils/bl-config";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultiBranchPicker({
  onChange,
}: {
  onChange: (newBranchIds: string[]) => void;
}) {
  const [branchIDs, setBranchIDs] = useState<string[]>([]);

  const { data: branches } = useSWR(
    `${BL_CONFIG.collection.branch}?active=true&sort=name`,
    BlFetcher.get<Branch[]>,
  );

  const handleChange = (event: SelectChangeEvent<typeof branchIDs>) => {
    const {
      target: { value },
    } = event;
    const newBranchIds = typeof value === "string" ? value.split(",") : value;
    onChange(newBranchIds);
    setBranchIDs(newBranchIds);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Skoler
      </Typography>
      <FormControl sx={{ width: 318 }}>
        <InputLabel id="multi-branch-select-label">Velg skoler</InputLabel>
        <Select
          labelId="multi-branch-select-label"
          multiple
          value={branchIDs}
          onChange={handleChange}
          input={<OutlinedInput label="Velg skoler" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.slice(0, 3).map((value) => (
                <Chip
                  key={value}
                  label={branches?.find((branch) => branch.id === value)?.name}
                />
              ))}
              {selected.length > 3 && (
                <Chip label={`+${selected.length - 3} flere`} />
              )}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              width: "100%",
              mb: 1,
            }}
          >
            <Button
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                const newBranchIDs = branches?.map((branch) => branch.id) ?? [];
                onChange(newBranchIDs);
                setBranchIDs(newBranchIDs);
              }}
            >
              Velg alle
            </Button>
            <Button
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                onChange([]);
                setBranchIDs([]);
              }}
            >
              Fjern alle
            </Button>
          </Box>
          {branches?.map((branch) => (
            <MenuItem key={branch.id} value={branch.id}>
              <Checkbox checked={branchIDs.includes(branch.id)} />
              <ListItemText primary={branch.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
