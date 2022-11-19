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
  Button,
  Fade,
} from "@mui/material";

import { LentDashboardData } from "./TableData";
import CollateralModal from "./CollateralModal";
import { calcDate } from "../util";

function createData(data: LentDashboardData) {
  return {
    asset: {
      name: data.name,
      imgUrl: data.imgUrl,
      projectName: data.projectName,
    },
    borrower: data.borrower,
    duration: data.duration,
    due: data.due,
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
const rows = [
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
  createData(mockData),
];

const columns = [
  "Asset",
  "Borrower",
  "Due (Duration)",
  "Collateral",
  "Lent Price",
];

export default function LendTable() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleReturn = () => {
    setShowModal(true);
  };
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Collect laterals</Button>
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
                          alt="idk"
                          width={50}
                          height={50}
                        />
                      </Fragment>
                      <Box>{row.asset.name}</Box>
                      <Box sx={{ color: "darkgrey" }}>
                        {row.asset.projectName}
                      </Box>
                    </TableCell>
                    <TableCell>{row.borrower}</TableCell>
                    <TableCell>
                      <Box>{row.due}</Box>
                      <Box color={returnable ? "black" : "red"}>
                        {returnable
                          ? `${row.duration} day(s) left`
                          : `${-1 * row.duration} day(s) ago`}
                      </Box>
                    </TableCell>
                    <TableCell>{row.collateral}</TableCell>
                    <TableCell>{row.lentPrice}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {showModal && (
            <CollateralModal
              totalCollaterals={2}
              showModal={showModal}
              handleCancel={() => setShowModal(false)}
            />
          )}
        </TableContainer>
      </Fade>
    </>
  );
}
