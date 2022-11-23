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

function createData(data: NFTDataWithDetails): BorrowedDashboardData {
  return {
    asset: {
      name: data.name,
      imgUrl: data.fullImgUrl,
      projectName: data.projectName,
    },
    lender: data.lender,
    due: data.deadline.toDateString(),
    duration: 1,
    projectAddress: data.nftAddress,
    collateral: +data.collateralFee,
    borrowedPrice: +data.borrowFee,
    lendingDuration: +data.lendingDuration,
    returnable: true,
    tokenId: +data.nftIdx,
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
      <TableContainer component={Paper} sx={{ height: "60vh" }}>
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

                <TableCell>{row.borrowedPrice}</TableCell>
                <TableCell>{row.collateral}</TableCell>
                <TableCell>
                  {row.returnable ? (
                    <Button onClick={() => handleReturn(row)}>Return</Button>
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
