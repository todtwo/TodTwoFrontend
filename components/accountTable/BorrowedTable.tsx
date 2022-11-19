import * as React from "react";
import { Fragment, useState } from "react";

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

import { BorrowedDashboardData } from "./TableData";
import ReturnModal from "./ReturnModal";

import { calcDate } from "../util";

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
    returnable: data.duration >= 0,
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<null | BorrowedDashboardData>(null);

  const handleReturn = () => {
    setSelected(mockData);
    setShowModal(true);
  };

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
                  <Box color={row.returnable ? "black" : "red"}>
                    {row.returnable
                      ? `${row.duration} day(s) left`
                      : `${-1 * row.duration} day(s) ago`}
                  </Box>
                </TableCell>
                <TableCell>{row.collateral}</TableCell>
                <TableCell>{row.borrowedPrice}</TableCell>
                <TableCell>
                  {row.returnable ? (
                    <Button onClick={handleReturn}>Return</Button>
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
