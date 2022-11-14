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
} from "@mui/material";

import { LentDashboardData } from "./TableData";

function createData(data: LentDashboardData) {
  return {
    asset: {
      name: data.name,
      imgUrl: data.imgUrl,
      projectName: data.projectName,
    },
    borrower: data.borrower,
    due: data.due,
    duration: data.duration,
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
const rows = [createData(mockData), createData(mockData), createData(mockData)];

const columns = [
  "Asset",
  "Borrower",
  "Due (Duration)",
  "Collateral",
  "Lent Price",
];

export default function LendTable() {
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
              key={i}
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
              <TableCell>{row.borrower}</TableCell>
              <TableCell>
                <Box>{row.due}</Box>
                <Box>{row.duration} day(s) left</Box>
              </TableCell>
              <TableCell>{row.collateral}</TableCell>
              <TableCell>{row.lentPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
