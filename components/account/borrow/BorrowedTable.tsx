import * as React from "react";
import { Fragment, useEffect, useState } from "react";

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
  Fade,
  Button,
} from "@mui/material";

import ReturnModal from "./ReturnModal";
import { NFTDataWithDetails } from "../../../utils/GetNFTDetails";
import { BorrowedDashboardData } from "../../types/TableData";
import { ethers } from "ethers";

function createData(data: NFTDataWithDetails): BorrowedDashboardData {
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
    lender: data.lender,
    due: d.toLocaleDateString(),
    duration: diffDays,
    projectAddress: data.nftAddress,
    collateral: +data.condition.collateralFee,
    borrowedPrice: +data.condition.borrowFee,
    lendingDuration: +data.condition.lendingDuration,
    returnable: diffTime >= 0,
    tokenId: +data.tokenId,
  };
}

const columns = [
  "Asset",
  "Lender",
  "Due (Duration)",
  "Borrowed Price",
  "Collateral",
  "",
];

export default function BorrowedTable(props: { data: NFTDataWithDetails[] }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<null | BorrowedDashboardData>(null);
  const [rows, setRows] = useState<BorrowedDashboardData[]>([]);

  const handleReturn = (row: BorrowedDashboardData) => {
    setSelected(row);
    setShowModal(true);
  };

  useEffect(() => {
    setRows(
      props.data.map((e) => {
        return createData(e);
      })
    );
  }, [props.data]);

  return (
    <Fade in={true} timeout={500}>
      <TableContainer
        component={Paper}
        sx={{ height: "60vh", marginTop: "10px" }}
      >
        <Table
          sx={{
            minWidth: 650,
            backgroundColor: "#F1F0EA",
            height: "max-content",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {columns.map((col, i) => (
                <TableCell key={i}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, i: any) => (
              <TableRow
                key={row.lender}
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
                  <Box sx={{ color: "darkgrey" }}>{row.asset.projectName}</Box>
                </TableCell>
                <TableCell>{row.lender}</TableCell>
                <TableCell>
                  <Box>{row.due}</Box>
                  <Box color={row.returnable ? "black" : "red"}>
                    {row.returnable
                      ? `~ ${row.duration} day(s) left`
                      : `~ ${-1 * row.duration} day(s) ago`}
                  </Box>
                </TableCell>

                <TableCell>
                  {" "}
                  {ethers.utils.formatEther(`${row.borrowedPrice}`)}ETH
                </TableCell>
                <TableCell>
                  {" "}
                  {ethers.utils.formatEther(`${row.collateral}`)}ETH
                </TableCell>
                <TableCell>
                  {row.returnable ? (
                    <Button
                      onClick={() => handleReturn(row)}
                      color="success"
                      variant="contained"
                    >
                      Return
                    </Button>
                  ) : (
                    <Box sx={{ color: "red" }}>Cannot be returned</Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showModal && (
          <ReturnModal
            data={selected}
            showModal={showModal}
            handleCancel={() => setShowModal(false)}
          />
        )}
      </TableContainer>
    </Fade>
  );
}
