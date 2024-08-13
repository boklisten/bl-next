import { Container, Skeleton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function UserDetailEditorSkeleton({
  isSignUp,
}: {
  isSignUp?: boolean;
}) {
  return (
    <Container component="main" maxWidth="xs">
      <Stack alignItems={"center"} mt={4}>
        <Typography variant="h1">
          {isSignUp ? "Registrer deg" : "Brukerinnstillinger"}
        </Typography>
        <Box width="100%">
          <Skeleton width={"100%"} height={80} sx={{ mb: 10 }} />
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              width={"100%"}
              height={80}
              key={`s-${index}`}
              sx={{ my: -2 }}
            />
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
