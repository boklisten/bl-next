import { BranchItem } from "@boklisten/bl-model";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";

const BranchItemSelect = ({ branchItems }: { branchItems: BranchItem[] }) => {
  const getSubject = (branchItem: BranchItem) =>
    (branchItem.categories && branchItem.categories[0]) ?? "";
  const [selectedBranchItemIDs, setSelectedBranchItemIDs] = useState<String[]>(
    []
  );
  const selectBranchItem = (branchItem: BranchItem) => {
    if (selectedBranchItemIDs.includes(branchItem.id)) {
      setSelectedBranchItemIDs(
        selectedBranchItemIDs.filter(
          (selectedBranchItemID) => selectedBranchItemID !== branchItem.id
        )
      );
    } else {
      setSelectedBranchItemIDs([...selectedBranchItemIDs, branchItem.id]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {branchItems
        .filter((branchItem) => getSubject(branchItem).length > 0)
        .sort((a, b) => getSubject(a).localeCompare(getSubject(b)))
        .map((branchItem) => (
          <ListItem
            sx={{
              width: { xs: "100%", md: "50%" },
            }}
            key={branchItem.id}
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => selectBranchItem(branchItem)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedBranchItemIDs.includes(branchItem.id)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={getSubject(branchItem)} />
            </ListItemButton>
          </ListItem>
        ))}
      <Button>Gå til kassen</Button>
    </Box>
  );
};

export default BranchItemSelect;
