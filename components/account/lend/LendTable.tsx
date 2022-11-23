import * as React from "react";
import { Fragment, useState, useEffect } from "react";

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
} from "@mui/material";

import CollateralModal from "./CollateralModal";
import { NFTDataWithDetails } from "../../../utils/GetNFTDetails";
import { NftStatus } from "../../../types/NftStatus";
import RedeemModal from "./RedeemNFTModal";
import { LentDashboardData } from "../../types/TableData";
import { BigNumber, ethers } from "ethers";

function createData(data: NFTDataWithDetails): LentDashboardData {
  var d = new Date(data.deadline * 1000);
  var now = new Date();
  var diffTime = Math.abs(Date.parse(`${d}`) - Date.parse(`${now}`));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    asset: {
      name: data.name,
      imgUrl: data.fullImgUrl,
      projectName: data.projectName,
    },
    nftStatus: data.status,
    duration: diffDays,
    due: d.toLocaleString(),
    collateral: +data.condition.collateralFee,
    lentPrice: +data.condition.borrowFee,
    collateralRedeemable: diffTime <= 0,
    lendingDuration: +data.condition.lendingDuration,
    projectAddress: data.nftAddress,
    tokenId: +data.tokenId,
  };
}

const columns = ["Asset", "Due (Duration)", "Lent Price", "Collateral", ""];

export default function LendTable(props: { data: NFTDataWithDetails[] }) {
  const [rows, setRows] = useState<LentDashboardData[]>([]);
  const [showRedeemNFTModal, setShowRedeemNFTModal] = useState(false);
  const [showRedeemCollateralModal, setShowCollateralModal] = useState(false);
  const [selected, setSelected] = useState<LentDashboardData | null>(null);

  useEffect(() => {
    setRows(
      props.data.map((e) => {
        return createData(e);
      })
    );
  }, [props.data]);

  return (
    <>
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
              {rows.map((row: any, _: any) => {
                const returnable = row.duration >= 0;
                return (
                  <TableRow
                    key={Math.round(Math.random() * 123213)}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Fragment>
                        <Image
                          src={row.asset.imgUrl}
                          alt={row.asset.name}
                          width={60}
                          height={60}
                        />
                      </Fragment>
                      <Box>{row.asset.name}</Box>
                      <Box sx={{ color: "darkgrey" }}>
                        {row.asset.projectName}
                      </Box>
                    </TableCell>
                    {row.nftStatus == NftStatus.BEING_BORROWED ? (
                      <TableCell>
                        <Box>{row.due}</Box>
                        <Box color={returnable ? "black" : "red"}>
                          {returnable
                            ? `~ ${row.duration} day(s) left`
                            : `~ ${-1 * row.duration} day(s) ago`}
                        </Box>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Box> {row.lendingDuration / 86400} Days</Box>
                      </TableCell>
                    )}
                    <TableCell>
                      {ethers.utils.formatEther(`${row.lentPrice}`)}ETH
                    </TableCell>
                    <TableCell>
                      {ethers.utils.formatEther(`${row.collateral}`)}ETH
                    </TableCell>

                    {row.nftStatus == NftStatus.BEING_BORROWED ? (
                      <TableCell>
                        {row.collateralRedeemable ? (
                          <Button
                            onClick={() => {
                              setSelected(row);
                              setShowCollateralModal(true);
                            }}
                            color="success"
                            variant="contained"
                          >
                            Redeem collateral
                          </Button>
                        ) : (
                          <Box>Being Borrowed</Box>
                        )}
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Button
                          onClick={() => {
                            setSelected(row);
                            setShowRedeemNFTModal(true);
                          }}
                          color="success"
                          variant="contained"
                        >
                          Redeem NFT
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {showRedeemCollateralModal && (
            <CollateralModal
              showModal={showRedeemCollateralModal}
              handleCancel={() => setShowCollateralModal(false)}
              data={selected}
            />
          )}
          {showRedeemNFTModal && (
            <RedeemModal
              showModal={showRedeemNFTModal}
              handleCancel={() => setShowRedeemNFTModal(false)}
              data={selected}
            />
          )}
        </TableContainer>
      </Fade>
    </>
  );
}
