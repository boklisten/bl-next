import { UserDetail } from "@boklisten/bl-model";
import { Autocomplete, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useState } from "react";

import BlFetcher from "@/api/blFetcher";
import UserDetailSearchResult from "@/components/search/UserDetailSearchResult";
import BL_CONFIG from "@/utils/bl-config";

export default function UserDetailSearchField({
  onSelectedResult,
}: {
  onSelectedResult: (userDetail: UserDetail | null) => void;
}) {
  const [searchValue, setSearchValue] = useState<UserDetail | null>(null);
  const [searchResults, setSearchResults] = useState<UserDetail[]>([]);
  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
        Søk etter en kunde for å starte utdeling
      </Typography>
      <Autocomplete
        autoComplete
        value={searchValue}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        filterSelectedOptions
        getOptionLabel={(option) => option.name ?? option.email}
        getOptionKey={(option) => option.id}
        filterOptions={(x) => x}
        noOptionsText={null}
        onInputChange={async (event, newInputValue) => {
          if (event === null) return;
          if (newInputValue.length < 3) {
            onSelectedResult(null);
            setSearchValue(null);
            setSearchResults([]);
            return;
          }
          try {
            const result = await BlFetcher.get<UserDetail[]>(
              `${BL_CONFIG.collection.userDetail}?s=${newInputValue}`,
            );
            setSearchResults(result);
          } catch {
            setSearchResults([]);
          }
        }}
        options={searchResults}
        renderOption={({ key }, userDetail) => (
          <UserDetailSearchResult
            key={key}
            userDetail={userDetail}
            onClick={() => {
              setSearchValue(userDetail);
              setSearchResults([userDetail]);
              onSelectedResult(userDetail);
            }}
          />
        )}
        renderInput={(params) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error Using example from https://mui.com/material-ui/react-autocomplete/#system-FreeSolo.tsx
          <TextField
            {...params}
            label="Søk etter kunde"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Box>
  );
}
