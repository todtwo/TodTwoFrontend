import React, { Fragment, useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

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
} from "@mui/material";

import Navbar from "../components/Navbar";
import { EthContext } from "../context/ethContext";
import { NftDetails } from "../types/NftDetails";
import {
  GetNFTDetails,
  mergeObject,
  NFTDataWithDetails,
} from "../utils/GetNFTDetails";
import { NftStatus } from "../types/NftStatus";

const columns = [
  "Asset",
  "Project",
  "Lent Price",
  "Duration",
  "Collateral",
  "Status",
];
const mock: NftDetails = {
  nftLPListIdx: "2",
  nftAddress: "0xFA6b6B5Eb53F951Bc4CfC607DbeC230DDE638eD5",
  nftIdx: "0",
  lender: "0xlender1",
  collateralFee: (9 * 10 ** 18).toString(),
  borrowFee: (7 * 10 ** 17).toString(),
  lendingDuration: 20,
  deadline: new Date(1700000000000),
  nftStatus: NftStatus.AVAILABLE,
};
export default function Lending() {
  const { defaultAccount, TodTwoContract } = useContext(EthContext);
  const [rows, setRows] = useState<NFTDataWithDetails[]>([]);

  const router = useRouter();

  async function getNFTs() {
    // let nfts: NftDetails[] = await TodTwoContract.viewUserLentProfile(
    //   defaultAccount
    // );
    const nfts: NftDetails[] = [mock];
    const nftDetails = await GetNFTDetails(nfts);
    const merged = mergeObject(nfts, nftDetails);
    setRows(merged);
  }

  useEffect(() => {
    getNFTs();
  }, []);

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
        <h3>Put your NFT assets up for a loan.</h3>
        <Box
          sx={{
            minHeight: "80%",
            color: "black",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          Your current Listing
          <Button
            onClick={() => {
              router.push(`/new-lending`);
            }}
          >
            List new NFT
          </Button>
          <Fade in={true} timeout={500}>
            <TableContainer component={Paper} sx={{ height: "60vh" }}>
              <Table
                sx={{ minWidth: 650, backgroundColor: "#F1F0EA" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((col, i) => (
                      <TableCell key={Math.round(Math.random() * 123213)}>
                        {" "}
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => {
                    return (
                      <TableRow
                        key={Math.round(Math.random() * 123213)}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Fragment>
                            <Image
                              src={row.fullImgUrl}
                              alt="idk"
                              width={80}
                              height={80}
                            />
                          </Fragment>
                          <Box>{row.name}</Box>
                        </TableCell>
                        <TableCell>{row.projectName}</TableCell>
                        <TableCell>{row.borrowFee}ETH</TableCell>
                        <TableCell>
                          <Box>{row.lendingDuration} Days</Box>
                        </TableCell>
                        <TableCell>{row.collateralFee}ETH</TableCell>
                        <TableCell>
                          {row.nftStatus === NftStatus.BEING_BORROWED
                            ? "Being Borrowed"
                            : "Available"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Fade>
        </Box>
      </Box>
    </>
  );
}
