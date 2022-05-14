import { LoadingButton } from "@mui/lab";

const FixedSuccessButton = ({
  label,
  loading = false,
  onClick,
}: {
  label: string;
  loading?: boolean;
  onClick: () => unknown;
}) => (
  <LoadingButton
    color="success"
    variant="contained"
    sx={{ position: "fixed", bottom: ".5rem", zIndex: 10 }}
    loading={loading}
    onClick={onClick}
  >
    {label}
  </LoadingButton>
);

export default FixedSuccessButton;
