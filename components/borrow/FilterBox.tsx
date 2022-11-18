import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid, Box, Paper, Stack } from "@mui/material";
import { filterCheckBoxType } from "../../types/filterCheckBoxType";

interface propTypes{
  filters:filterCheckBoxType,
  setFilters:React.Dispatch<React.SetStateAction<filterCheckBoxType>>
}
export default function FilterBox (
  {filters,setFilters}:propTypes
) {
    
    const {nft1checked, nft2checked, nft3checked} = filters
    const onFilterChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        [event.target.name]: event.target.checked,
      });
    };
    return (<Stack
      minHeight={"60vh"}
      height={"100%"}
      bgcolor={"secondary.dark"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      padding={2}
    >
      <Box fontSize={24}>Filters</Box>
      <FormGroup sx={{ margin: "0.5rem" }}>
        <FormControlLabel
          control={<Checkbox checked={nft1checked} onChange={onFilterChangedHandler}/>}
          label="NFT1"
          name="nft1checked"
        />
        <FormControlLabel
          control={<Checkbox checked={nft2checked} onChange={onFilterChangedHandler} />}
          label="NFT2"
          name="nft2checked"
        />
        <FormControlLabel
          control={<Checkbox checked={nft3checked} onChange={onFilterChangedHandler} />}
          label="NFT3"
          name="nft3checked"
        />
      </FormGroup>
    </Stack>)
}

