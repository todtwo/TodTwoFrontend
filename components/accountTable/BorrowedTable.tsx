import * as React from "react";
import { Fragment } from "react";

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
} from "@mui/material";

import { BorrowedDashboardData } from "./TableData";

function createData(data: BorrowedDashboardData) {
  return {
    asset: {
      name: data.name,
      imgUrl: data.imgUrl,
      projectName: data.projectName,
    },
    lender: data.lender,
    due: `${data.due}`,
    duration: data.duration,
    collateral: data.collateral,
    borrowedPrice: data.borrowedPrice,
    returnable: data.returnable,
  };
}
const mockData: BorrowedDashboardData = {
  name: "NFT NAME",
  imgUrl:
    "/Users/hataipatsupanunt/cpcu/yr4_1/blockchain/TodTwoFrontend/public/test.jpg",
  projectName: "project Name",
  lender: "0x1233444",
  due: "2019-20-05",
  duration: 1,
  collateral: 2,
  borrowedPrice: 3,
  returnable: true,
};

const mockData2: BorrowedDashboardData = {
  name: "NFT NAME",
  imgUrl:
    "/Users/hataipatsupanunt/cpcu/yr4_1/blockchain/TodTwoFrontend/public/test.jpg",
  projectName: "project Name",
  lender: "0x1233444",
  due: "2019-20-05",
  duration: 1,
  collateral: 2,
  borrowedPrice: 3,
  returnable: false,
};

const rows = [
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData2),
];

const columns = [
  "Asset",
  "Lender",
  "Due (Duration)",
  "Collateral",
  "Borrowed Price",
  "",
];

export default function BorrowedTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, backgroundColor: "#F1F0EA" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i}> {col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.lender}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Fragment>
                  <Image
                    src={row.asset.imgUrl}
                    alt="idk"
                    width={50}
                    height={50}
                  />
                </Fragment>
                <Box>{row.asset.name}</Box>
                <Box sx={{ color: "darkgrey" }}>{row.asset.projectName}</Box>
              </TableCell>
              <TableCell>{row.lender}</TableCell>
              <TableCell>
                <Box>{row.due}</Box>
                <Box color={row.returnable ? "red" : "black"}>
                  {row.duration} day(s) left
                </Box>
              </TableCell>
              <TableCell>{row.collateral}</TableCell>
              <TableCell>{row.borrowedPrice}</TableCell>
              <TableCell>
                {row.returnable ? (
                  <Button>Return</Button>
                ) : (
                  <Box>Cannot be returned</Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
