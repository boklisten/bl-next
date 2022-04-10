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
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectBranch } from "../redux/selectedBranch";

const SubjectSelect = ({ branchItems }: { branchItems: BranchItem[] }) => {
  const selectedBranch = useAppSelector(selectBranch);
  const COMMON_SUBJECT = "Fellesfag";

  const getUniqueSubjects = (): string[] => {
    const allSubjects = [];

    for (const branchItem of branchItems) {
      const branchCategories = branchItem.categories ?? [];
      allSubjects.push(...branchCategories);
    }

    return [...new Set(allSubjects)]
      .filter((subject) => subject != COMMON_SUBJECT)
      .sort((a, b) => a.localeCompare(b));
  };

  const getCommonSubjects = (): string[] => {
    const commonSubjects = [];

    for (const branchItem of branchItems) {
      const branchCategories = branchItem.categories ?? [];
      if (branchCategories.includes(COMMON_SUBJECT)) {
        commonSubjects.push(...branchCategories);
      }
    }

    return commonSubjects.filter((subject) => subject != COMMON_SUBJECT);
  };

  const [selectedSubjects, setSelectedSubjects] = useState<String[]>([]);

  const removeSubject = (subject: string) => {
    setSelectedSubjects(
      selectedSubjects.filter((selectedSubject) => selectedSubject != subject)
    );
  };

  const selectSubject = (subject: string) => {
    setSelectedSubjects([...new Set([...selectedSubjects, subject])]);
  };

  const selectCommonSubjects = () => {
    setSelectedSubjects([
      ...new Set([...selectedSubjects, ...getCommonSubjects()]),
    ]);
  };

  const getSubjectLabel = (subject: string): string =>
    getCommonSubjects().includes(subject)
      ? `${subject} (${COMMON_SUBJECT})`
      : subject;

  useEffect(() => {
    setSelectedSubjects([]);
  }, [selectedBranch]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        {getCommonSubjects().length > 0 && (
          <Button onClick={selectCommonSubjects}>Legg til fellesfag</Button>
        )}

        {selectedSubjects.length > 0 && (
          <Button onClick={() => setSelectedSubjects([])}>Fjern alle</Button>
        )}
      </Box>
      {getUniqueSubjects().map((subject) => (
        <ListItem
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
          key={subject}
          disablePadding
        >
          <ListItemButton
            role={undefined}
            onClick={() =>
              selectedSubjects.includes(subject)
                ? removeSubject(subject)
                : selectSubject(subject)
            }
            dense
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedSubjects.includes(subject)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={getSubjectLabel(subject)} />
          </ListItemButton>
        </ListItem>
      ))}
      <Button>Gå til kassen</Button>
    </Box>
  );
};

export default SubjectSelect;
