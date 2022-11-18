import { Grid, Box, Paper, Stack } from "@mui/material";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import { EthContext } from "../context/ethContext";
import { Container } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterCheckBoxType } from "../types/filterCheckBoxType";
import FilterBox from "../components/borrow/FilterBox";
import BorrowTable from "../components/borrow/BorrowTable";
declare global {
  interface Window {
    ethereum?: any;
  }
}

const Borrow = () => {
  const { provider, defaultAccount, setDefaultAccount, connectHandler } =
    useContext(EthContext);
  const [filters, setFilters] = useState<filterCheckBoxType>({
    nft1checked: false,
    nft2checked: false,
    nft3checked: false,
  });
  const checkConnection = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: Array<string>) => {
          setDefaultAccount(result[0]);
        });
    } else {
      alert("install MetaMask");
    }
  };

  const onAccountChangedHandler = (accounts: Array<string>) => {
    if (accounts.length > 0) {
      setDefaultAccount(accounts[0]);
    } else {
      setDefaultAccount(null);
    }
  };

  useEffect(() => {
    checkConnection();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", onAccountChangedHandler);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          onAccountChangedHandler
        );
      }
    };
  });

  return (
    <>
      <Navbar selectedTab="Borrow" />

      <Stack
        spacing={2}
        paddingX={"15%"}
        paddingTop={"2rem"}
        bgcolor={"secondary"}
      >
        <Box fontSize={34}>Borrow</Box>
        <Box fontSize={23}>Offer to loan other users’ NFTs</Box>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
          <FilterBox filters={filters} setFilters={setFilters}></FilterBox>
          <BorrowTable></BorrowTable>

        </Stack>
      </Stack>
    </>
  );
};

export default Borrow;
