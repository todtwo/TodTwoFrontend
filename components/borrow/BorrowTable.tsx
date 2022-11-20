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
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { WhitelistedNftAdresses } from "../../types/WhitelistedNftAdresses";
enum NftStatus {
  AVAILABLE,
  BEING_BORROWED,
  DELETED,
}

interface propTypes {}

function createData(
  nftAddress: WhitelistedNftAdresses,
  nftIdx: string,
  lender: string,
  collateralFee: number,
  borrowFee: number,
  lendingDuration: number,
  deadline: number,
  nftStatus: NftStatus
) {
  const AddressToProjectMap = {
    address1: "Project1",
    address2: "Project2",
    address3: "Project3",
  };
  const projectName: string = AddressToProjectMap[nftAddress];
  const terms: string = `${ethers.utils.formatEther(
    borrowFee
  )}Eth/${lendingDuration}Day`;
  const collateral: string = `${ethers.utils.formatEther(collateralFee)}ETH`;
  const imgPath: string = "/vercel.svg"
  return { nftIdx, projectName, lender, terms, collateral };
}

const BorrowTable = ({}: propTypes) => {
  const router = useRouter();
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
    createData(
      "address3",
      "227",
      "0xLender1",
      8000000000000,
      9999999999,
      3,
      1234,
      NftStatus.AVAILABLE
    ),
    createData(
      "address3",
      "228",
      "0xLender1",
      8000000000000,
      9999999999,
      3,
      1234,
      NftStatus.AVAILABLE
    ),
    createData(
      "address3",
      "229",
      "0xLender1",
      8000000000000,
      9999999999,
      3,
      1234,
      NftStatus.AVAILABLE
    ),
  ]);
  return (
    <Box>
      <TableContainer sx={{ height: "65vh" }} component={Paper}>
        <Table
          stickyHeader
          sx={{
            
            bgcolor: "secondary.dark",
            height: "max-content",
            boxShadow: "4px 8px 8px rgba(0, 0, 0, 0.25)",
          }}
        >
          <TableHead>
            <TableRow sx={{ fontSize: 30 }}>
              <TableCell align="center" sx={{ bgcolor: "secondary.dark" }}>
                Index
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: "secondary.dark" }}>
                Project
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: "secondary.dark" }}>
                Owner
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: "secondary.dark" }}>
                Terms
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: "secondary.dark" }}>
                Collateral
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={`${row.projectName}#${row.nftIdx}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  router.push(`/borrow/123`);
                }}
              >
                <TableCell align="center">{row.nftIdx}</TableCell>
                <TableCell align="center">{row.projectName}</TableCell>
                <TableCell align="center">{row.lender}</TableCell>
                <TableCell align="center">{row.terms}</TableCell>
                <TableCell align="center">{row.collateral}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BorrowTable;
