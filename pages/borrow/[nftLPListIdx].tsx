import { Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import BorrowDetailsBox from "../../components/borrowingDetails/BorrowDetailsBox";
import Navbar from "../../components/Navbar";
import { EthContext } from "../../context/EthContext";
import { NftDetails } from "../../types/NftDetails";
import { NftStatus } from "../../types/NftStatus";
import { GetNFTDetails } from "../../utils/GetNFTDetails";
import { ethers } from "ethers";
import { GetSingleNFTImage } from "../../utils/GetSingleNFTImage";
const BigNumber = ethers.BigNumber;
const BorrowDetails = () => {
  const router = useRouter();
  const { nftLPListIdx } = router.query;
  const [imgPath, setImgPath] = useState("");
  const [nftDetails, setNftDetails] = useState<NftDetails>({
    nftLPListIdx,
    nftAddress: "0x40e3b499A062153158C90572f378132Bab6AB07B",
    nftIdx: "",
    lender: "0",
    collateralFee: "0",
    borrowFee: "0",
    lendingDuration: 1700000000000,
    deadline: 1700000000000,
    nftStatus: 3,
  });
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
    if(nftDetails.nftStatus !== 3){
      GetSingleNFTImage(nftDetails).then((path) => {
        setImgPath(path)
        console.log(path)
      })
    }
      
      
      
  }, [nftDetails])
  
  useEffect(() => {
    const fetchNFTDetails = async () => {
      if (nftLPListIdx && TodTwoContract) {
        try {
          const nftDetailsList = await TodTwoContract.getNFTDetails(
            parseInt(nftLPListIdx)
          );
          const tmpNftDetails: NftDetails = {
            nftLPListIdx,
            nftAddress: nftDetailsList["nftAddress"],
            nftIdx: nftDetailsList["nftTokenId"].toString(),
            lender: nftDetailsList["lender"].slice(0, 10),
            collateralFee: nftDetailsList["condition"]["collateralFee"],
            borrowFee: nftDetailsList["condition"]["borrowFee"],
            lendingDuration: nftDetailsList["condition"]["lendingDuration"],
            deadline: nftDetailsList["deadline"],
            nftStatus: nftDetailsList["status"],
          };
          // console.log(nftDetailsList);
          // console.log(tmpNftDetails);
          setNftDetails(tmpNftDetails);
        } catch (error) {
          console.log(error)
        }
      }
    };
    fetchNFTDetails();
  }, [router.isReady, isReady]);

  if (!router.isReady || !nftLPListIdx) {
    return <Box>Loading</Box>;
  }
  return (
    <Box bgcolor={"secondary.main"} height={"100vh"}>
      <Navbar />
      <Box sx={{ marginTop: "3rem" }}>
        <BorrowDetailsBox imgPath={imgPath} nftDetails={nftDetails} />
      </Box>
    </Box>
  );
};

export default BorrowDetails;
