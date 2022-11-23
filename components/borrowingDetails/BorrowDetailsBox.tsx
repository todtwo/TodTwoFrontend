import { Box, Button, Stack } from "@mui/material";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useContext } from "react";
import { EthContext } from "../../context/EthContext";
import { NftDetails } from "../../types/NftDetails";

interface propTypes {
  nftDetails: NftDetails;
  imgPath:string;
}
const BigNumber = ethers.BigNumber;

const NftStatusToStatusName = {
  0: "Available",
  1: "BEING_BORROWED",
  2: "DELETED",
};

const BorrowDetailsBox = ({ nftDetails,imgPath }: propTypes) => {
  const { AddressToProjectMap } = useContext(EthContext)
  return (
    <Box
      justifyContent={"center"}
      alignContent="center"
      alignItems={"center"}
      marginX={"12vw"}
      bgcolor={"secondary.dark"}
      borderRadius={"20px"}
      height="75vh"
    >
      <Stack
        direction={"row"}
        height={"70vh"}
        padding={"2rem"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Box
          position={"relative"}
          bgcolor={"#ffffff"}
          width={"20vw"}
          height={"20vw"}
        >
          <Image
            placeholder = "empty"
            fill
            sizes="(max-width: 20vw) 20vw,
              (max-width: 1200px) 50vw,
              33vw"
            src={imgPath}
            alt="NFT Photo"
          />
        </Box>
        <Box width={"60%"} height={"80%"}>
          <Stack
            direction={"row"}
            fontSize={23}
            justifyContent={"space-around"}
            height={"100%"}
          >
            <Stack height={"100%"} justifyContent={"space-around"}>
              <Box>Index</Box>
              <Box>Project:</Box>
              <Box>Owner:</Box>
              <Box>Terms:</Box>
              <Box>Collateral:</Box>
              <Box>Status:</Box>
            </Stack>
            <Stack height={"100%"} maxWidth={"300px"}justifyContent={"space-around"}>
              <Box>{nftDetails.nftIdx}</Box>
              <Box>{AddressToProjectMap[nftDetails.nftAddress]}</Box>
              <Box>{nftDetails.lender}</Box>
              <Box>{`${ethers.utils.formatEther(
                BigNumber.from(nftDetails.borrowFee)
              )}Eth/${nftDetails.lendingDuration/3600/24}Days`}</Box>
              <Box>{`${ethers.utils.formatEther(
                BigNumber.from(nftDetails.collateralFee)
              )}ETH`}</Box>
              <Box>{NftStatusToStatusName[nftDetails.nftStatus]}</Box>
            </Stack>
          </Stack>
          <Box paddingY={"1rem"} textAlign={"center"} height={"5vh"}>
            <Button color="success" variant="contained">
              Borrow
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default BorrowDetailsBox;
