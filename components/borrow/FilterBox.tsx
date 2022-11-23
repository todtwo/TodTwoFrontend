import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid, Box, Paper, Stack } from "@mui/material";
import { filterCheckBoxType } from "../../types/filterCheckBoxType";

interface propTypes {
  filters: filterCheckBoxType;
  setFilters: React.Dispatch<React.SetStateAction<filterCheckBoxType>>;
}
export default function FilterBox({ filters, setFilters }: propTypes) {
  const { nft1checked, nft2checked, nft3checked } = filters;
  const onFilterChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <Box>
      <Stack
        minHeight={"65vh"}
        height={"100%"}
        bgcolor={"secondary.dark"}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
        padding={2}
      >
        <Box fontSize={22}>Filters</Box>
        <FormGroup sx={{ margin: "0.5rem" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={nft1checked}
                onChange={onFilterChangedHandler}
              />
            }
            label="ThunTwo"
            name="nft1checked"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={nft2checked}
                onChange={onFilterChangedHandler}
              />
            }
            label="FahTwo"
            name="nft2checked"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={nft3checked}
                onChange={onFilterChangedHandler}
              />
            }
            label="ClarkTwo"
            name="nft3checked"
          />
        </FormGroup>
      </Stack>
    </Box>
  );
}
