import { Grid, Box, Paper, Stack, Slide, Grow } from "@mui/material";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import { EthContext } from "../context/EthContext";
import { Container } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { filterCheckBoxType } from "../types/filterCheckBoxType";
import FilterBox from "../components/borrow/FilterBox";
import BorrowTable from "../components/borrow/BorrowTable";
import { useRouter } from "next/router";
import { NftDetails } from "../types/NftDetails";
import { GetImgWithDetails } from "../utils/GetImgWithDetails";
declare global {
  interface Window {
    ethereum?: any;
  }
}

const Borrow = () => {
  const {
    provider,
    defaultAccount,
    setDefaultAccount,
    connectHandler,
    updateEthers,
    isReady,
    TodTwoContract,
  } = useContext(EthContext);
  const [filters, setFilters] = useState<filterCheckBoxType>({
    nft1checked: true,
    nft2checked: true,
    nft3checked: true,
  });
  const [nftDetailsList, setNftDetailsList] = useState([]);
  const router = useRouter();
  const [detailsWithImgList, setDetailsWithImgList] = useState([])
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
    const fetchNftsDetails = async () => {
      if (TodTwoContract) {
        const tmpNftDetailsList = await TodTwoContract.getAllAvailableNFTs();
        const tmpNftDetailsObjectList = tmpNftDetailsList.reduce(
          (result, tmpDetailElement, index: number) => {
            if (tmpDetailElement["status"] == 0) {
              const tmpNftDetailsObject: NftDetails = {
                nftLPListIdx: index.toString(),
                nftAddress: tmpDetailElement["nftAddress"],
                nftIdx: tmpDetailElement["nftTokenId"].toString(),
                lender: tmpDetailElement["lender"].slice(0, 10),
                collateralFee: tmpDetailElement["condition"]["collateralFee"],
                borrowFee: tmpDetailElement["condition"]["borrowFee"],
                lendingDuration:
                  tmpDetailElement["condition"]["lendingDuration"],
                deadline: tmpDetailElement["deadline"],
                nftStatus: tmpDetailElement["status"],
              };
              result.push(tmpNftDetailsObject);
            }

            return result;
          },
          []
        );
        setNftDetailsList(tmpNftDetailsObjectList);
      } 
    };
    fetchNftsDetails();
  }, [isReady]);

  useEffect(() => {
    GetImgWithDetails(nftDetailsList,"small").then((data)=>{
      setDetailsWithImgList(data)
      console.log(data)
    })
    
    
  }, [nftDetailsList])
  
  return (
    <Box height="100vh" bgcolor={"secondary.main"}>
      <Navbar selectedTab="Borrow" />

      <Stack
        spacing={2}
        paddingX={"15%"}
        paddingTop={"2rem"}
        bgcolor={"secondary"}
        height="100%"
      >
        <Slide direction="down" in={true} timeout={200}>
          <Box fontSize={34}>Borrow</Box>
        </Slide>
        <Slide direction="down" in={true} timeout={200}>
          <Box fontSize={23}>Offer to loan other users’ NFTs</Box>
        </Slide>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
          <Grow in={true}>
            <Box>
              <FilterBox filters={filters} setFilters={setFilters}></FilterBox>
            </Box>
          </Grow>
          <Grow in={true}>
            <Box width={"90%"}>
              <BorrowTable nftDetailsList={detailsWithImgList} filters={filters} />
            </Box>
          </Grow>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Borrow;
