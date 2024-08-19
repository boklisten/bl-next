import { UserDetail } from "@boklisten/bl-model";
import { Email, Person, Phone } from "@mui/icons-material";
import { ListItemButton, Stack, Typography } from "@mui/material";

export default function UserDetailSearchResult({
  userDetail,
  onClick,
}: {
  userDetail: UserDetail;
  onClick: () => void;
}) {
  return (
    <ListItemButton onClick={onClick}>
      <Stack gap={0.5}>
        <Stack gap={0.5} direction={"row"} alignItems={"center"}>
          <Person />
          <Typography>{userDetail.name}</Typography>
        </Stack>
        <Stack gap={0.5} direction={"row"} alignItems={"center"}>
          <Email />
          <Typography>{userDetail.email}</Typography>
        </Stack>
        <Stack gap={0.5} direction={"row"} alignItems={"center"}>
          <Phone />
          <Typography>{userDetail.phone}</Typography>
        </Stack>
      </Stack>
    </ListItemButton>
  );
}
