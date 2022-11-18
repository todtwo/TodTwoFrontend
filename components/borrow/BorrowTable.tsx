import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ethers } from "ethers";
import Image from "next/image";
enum NftStatus {
  AVAILABLE,
  BEING_BORROWED,
  DELETED,
}

interface propTypes {}


function createData(
  nftAddress: string,
  nftIdx: string,
  lender: string,
  collateralFee: number,
  borrowFee: number,
  lendingDuration: number,
  deadline: number,
  nftStatus: NftStatus
) {
  const AddressToProjectMap: any = {
    address1: "Project1",
    address2: "Project2",
    address3: "Project3",
  };
  const projectName: string = AddressToProjectMap[nftAddress];
  const terms: string = `${ethers.utils.formatEther(
    borrowFee
  )}Eth/${lendingDuration}Day`;
  const collateral: string = `${ethers.utils.formatEther(collateralFee)}ETH`;
  return { nftIdx, projectName, lender, terms, collateral };
}

const BorrowTable = ({}: propTypes) => {
  const [rows, setRows] = useState([
    createData(
      "address1",
      "223",
      "0xLender1",
      800000000000000,
      9999999999,
      3,
      1234,
      NftStatus.AVAILABLE
    ),
    createData(
      "address1",
      "224",
      "0xLender1",
      8000000000000,
      9999999999,
      3,
      1234,
      NftStatus.AVAILABLE
    ),
    createData(
        "address2",
        "223",
        "0xLender1",
        8000000000000,
        9999999999,
        3,
        1234,
        NftStatus.AVAILABLE
      ),
      createData(
        "address2",
        "224",
        "0xLender2",
        8000000000000,
        90000000000,
        3,
        1234,
        NftStatus.AVAILABLE
      ),
      createData(
        "address3",
        "223",
        "0xLender1",
        8000000000000,
        90000000000,
        3,
        1234,
        NftStatus.AVAILABLE
      ),
      createData(
        "address3",
        "224",
        "0xLender1",
        8000000000000,
        9999999999,
        3,
        1234,
        NftStatus.AVAILABLE
      ),
      createData(
        "address3",
        "225",
        "0xLender1",
        8000000000000,
        9999999999,
        3,
        1234,
        NftStatus.AVAILABLE
      ),
      createData(
        "address3",
        "226",
        "0xLender1",
        8000000000000,
        9999999999,
        3,
        1234,
        NftStatus.AVAILABLE
      ),
  ]);
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650, bgcolor: "secondary.dark", height: "100%", boxShadow:"4px 8px 8px rgba(0, 0, 0, 0.25)" }}>
        <TableHead sx={{fontSize:"24"}}>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Terms</TableCell>
            <TableCell>Collateral</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={`${row.projectName}#${row.nftIdx}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nftIdx}
              </TableCell>
              <TableCell>{row.projectName}</TableCell>
              <TableCell>{row.lender}</TableCell>
              <TableCell>{row.terms}</TableCell>
              <TableCell>{row.collateral}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BorrowTable;
