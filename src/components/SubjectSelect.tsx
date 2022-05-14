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
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectBranch } from "../redux/selectedBranch";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { selectSubjects, setSelectedSubjects } from "../redux/selectedSubjects";
import { generateCartItemsFromSubjects } from "../utils/cartUtils";
import { setCart } from "../redux/cart";
import FixedSuccessButton from "./FixedSuccessButton";

const SubjectCheckbox = ({ subject }: { subject: string }) => {
  const dispatch = useAppDispatch();
  const selectedSubjects = useAppSelector(selectSubjects);
  const removeSubject = (subject: string) => {
    dispatch(
      setSelectedSubjects(
        selectedSubjects.filter((selectedSubject) => selectedSubject != subject)
      )
    );
  };

  const selectSubject = (subject: string) => {
    dispatch(setSelectedSubjects([...new Set([...selectedSubjects, subject])]));
  };

  return (
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
        <ListItemText primary={subject} />
      </ListItemButton>
    </ListItem>
  );
};

const SubjectSelect = ({ branchItems }: { branchItems: BranchItem[] }) => {
  const [loadingCart, setLoadingCart] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedBranch = useAppSelector(selectBranch);
  const selectedSubjects = useAppSelector(selectSubjects);
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

  const getOptionalSubjects = (): string[] => {
    const commonSubjects = getCommonSubjects();
    return getUniqueSubjects().filter(
      (subject) => !commonSubjects.includes(subject)
    );
  };

  const selectCommonSubjects = () => {
    dispatch(
      setSelectedSubjects([
        ...new Set([...selectedSubjects, ...getCommonSubjects()]),
      ])
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: "3rem",
      }}
    >
      {selectedSubjects.length > 0 && (
        <Button onClick={() => dispatch(setSelectedSubjects([]))} color="error">
          Fjern valgte
        </Button>
      )}
      {getCommonSubjects().length > 0 && (
        <Typography variant="h6">Fellesfag</Typography>
      )}
      {getCommonSubjects().length > 0 && (
        <Button onClick={selectCommonSubjects}>Legg til fellesfag</Button>
      )}
      {getCommonSubjects().map((subject) => (
        <SubjectCheckbox key={subject} subject={subject} />
      ))}
      {getCommonSubjects().length > 0 && (
        <Typography variant="h6">Valgfag</Typography>
      )}
      {getOptionalSubjects().map((subject) => (
        <SubjectCheckbox key={subject} subject={subject} />
      ))}
      {selectedSubjects.length > 0 && (
        <FixedSuccessButton
          label={"Til handlekurv"}
          onClick={async () => {
            setLoadingCart(true);
            const cartItems = await generateCartItemsFromSubjects(
              selectedSubjects,
              selectedBranch.id
            );
            dispatch(setCart(cartItems));
            setLoadingCart(false);
            router.push("/cart");
          }}
          loading={loadingCart}
        />
      )}
    </Box>
  );
};

export default SubjectSelect;
