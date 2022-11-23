import React, { useContext, useMemo, useState } from "react";
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
import { NftStatus } from "../../types/NftStatus";
import { EthContext } from "../../context/EthContext";
import { NftDetails } from "../../types/NftDetails";

interface propTypes {
  nftDetailsList:Array<NftDetails>
}

const BorrowTable = ({nftDetailsList}: propTypes) => {
  const router = useRouter();
  const { AddressToProjectMap } = useContext(EthContext);

  const createData = (nftDetails:NftDetails
  ) => {
    const projectName: string = AddressToProjectMap[nftDetails.nftAddress];
    const terms: string = `${ethers.utils.formatEther(
      nftDetails.borrowFee
    )}Eth/${nftDetails.lendingDuration/3600/24}Days`;
    const collateral: string = `${ethers.utils.formatEther(nftDetails.collateralFee)}ETH`;
    const imgPath: string = "/vercel.svg";
    return { nftIdx:nftDetails.nftIdx, projectName, lender:nftDetails.lender, terms, collateral, nftLPListIdx:nftDetails.nftLPListIdx };
  };
  const rows = useMemo(()=>nftDetailsList.map((nftDetails) => createData(nftDetails)),[nftDetailsList]);

  return (
    <Box>
      <TableContainer
        sx={{ height: "65vh", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        component={Paper}
      >
        <Table
          stickyHeader
          sx={{
            bgcolor: "secondary.dark",
            height: "max-content",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                fontSize: 30,
                boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
              }}
            >
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
                  router.push(`/borrow/${row.nftLPListIdx}`);
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
