import React, { Fragment, useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ethers } from "ethers";

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
import { NftDetails } from "../types/NftDetails";
import { EthContext } from "../context/EthContext";
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
export default function Lending() {
  const {
    provider,
    defaultAccount,
    setDefaultAccount,
    connectHandler,
    isReady,
    ThunTwoContract,
    TodTwoContract,
    getNFTImage,
  } = useContext(EthContext);
  const [rows, setRows] = useState<NFTDataWithDetails[]>([]);
  const [account, setAccount] = useState<string | null>(null);

  const router = useRouter();

  async function getNFTs() {
    let nfts: NftDetails[] = await TodTwoContract.viewUserLentProfile(
      defaultAccount
    );
    const nftDetails = await GetNFTDetails(nfts);
    const merged = mergeObject(nfts, nftDetails);
    setRows(merged);
  }

  const onAccountChangedHandler = (accounts: Array<string>) => {
    if (accounts.length > 0) {
      setDefaultAccount(accounts[0]);
    } else {
      setDefaultAccount(null);
    }
  };

  useEffect(() => {
    connectHandler();
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
  useEffect(() => {
    // check account connection
    if (isReady && router.isReady && !defaultAccount) {
      router.push("/");
    }
  }, [isReady, router, defaultAccount]);

  useEffect(() => {
    setAccount(defaultAccount);
  }, []);

  useEffect(() => {
    getNFTs();
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
                          {" "}
                          <Fragment>
                            <Image
                              src={row.fullImgUrl}
                              alt={row.name}
                              width={120}
                              height={120}
                            />
                          </Fragment>
                          <Box>{row.name}</Box>
                        </TableCell>
                        <TableCell>{row.projectName}</TableCell>
                        <TableCell>
                          {ethers.utils.formatEther(row.condition.borrowFee)}{" "}
                          ETH
                        </TableCell>
                        <TableCell>
                          <Box>
                            {row.condition.lendingDuration / 86400} Days
                          </Box>
                        </TableCell>
                        <TableCell>
                          {ethers.utils.formatEther(
                            row.condition.collateralFee
                          )}{" "}
                          ETH
                        </TableCell>
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
