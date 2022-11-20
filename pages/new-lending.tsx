import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Fade,
  Grid,
} from "@mui/material";

import Navbar from "../components/Navbar";
import { LentDashboardData } from "../components/types/TableData";
import { GetNFTsByContract } from "../utils/GetNFTsByContract";
import FilterBox from "../components/common/FilterBox";
import { filterCheckBoxType } from "../types/filterCheckBoxType";

function createData(data: LentDashboardData) {
  return {
    asset: {
      name: data.name,
      imgUrl: data.imgUrl,
      projectName: data.projectName,
    },
    borrower: data.borrower,
    duration: data.duration,
    due: data.due,
    collateral: data.collateral,
    lentPrice: data.lentPrice,
  };
}

const mockData: LentDashboardData = {
  name: "NFT NAME",
  imgUrl:
    "/Users/hataipatsupanunt/cpcu/yr4_1/blockchain/TodTwoFrontend/public/test.jpg",
  projectName: "project Name",
  borrower: "0x1233444",
  due: "2019-20-05",
  duration: 1,
  collateral: 2,
  lentPrice: 3,
};
const rows = [
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
];

const columns = [
  "Asset",
  "Lender",
  "Due (Duration)",
  "Collateral",
  "Lent Price",
];

export default function NewLending() {
  const [account, setAccount] = useState<string>("0x123422343");
  const [filters, setFilters] = useState<filterCheckBoxType>({
    nft1checked: false,
    nft2checked: false,
    nft3checked: false,
  });

  useEffect(() => {
    if (account)
      var x = GetNFTsByContract("0x13502Ea6F6D14f00025a3AdDe02BFf050be24532");
    console.log(x);
  }, [account]);

  return (
    <>
      <main>
        <Navbar />
      </main>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "FFFDF1",
          padding: "20px",
          color: "black",
        }}
      >
        <h2>Lend</h2>
        <h3>Select your NFT to loean</h3>
        <Box
          sx={{
            minHeight: "80%",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          Owned NFTs
        </Box>
        <Grid container>
          <Grid item xs={4}>
            <FilterBox filters={filters} setFilters={setFilters} />
          </Grid>{" "}
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                m: 1,
                // bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Box>NFT1</Box>
              <Box>NFT1</Box>
              <Box>NFT1</Box>
            </Box>
          </Grid>{" "}
        </Grid>
      </Box>
    </>
  );
}
