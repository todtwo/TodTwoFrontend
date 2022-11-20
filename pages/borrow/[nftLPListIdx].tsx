import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import BorrowDetailsBox from "../../components/borrowingDetails/BorrowDetailsBox";
import Navbar from "../../components/Navbar";
import { EthContext } from "../../context/ethContext";
import { NftDetails } from "../../types/NftDetails";
import { NftStatus } from "../../types/NftStatus";

const BorrowDetails = () => {
  const router = useRouter();
  const { nftLPListIdx } = router.query;
  const { provider, defaultAccount, setDefaultAccount, connectHandler, isReady } =
    useContext(EthContext);
  const getNftDetails = (nftLPListIdx: string | string[] | undefined) => {
    const mock : NftDetails = {
      nftLPListIdx,
      nftAddress: "address1",
      nftIdx: "23",
      lender: "0xlender1",
      collateralFee: (9 * (10 ** 18)).toString(),
      borrowFee: (7 * (10 ** 17)).toString(),
      lendingDuration: 20,
      deadline: new Date(1700000000000),
      nftStatus: NftStatus.AVAILABLE,
    };
    return mock;
  };
  const nftDetails = getNftDetails(nftLPListIdx)

  const onAccountChangedHandler = (accounts: Array<string>) => {
    if (accounts.length > 0) {
      setDefaultAccount(accounts[0]);
    } else {
      setDefaultAccount(null);
      
    }
  };
  
  useEffect(() => {
    connectHandler()
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
  useEffect(() => {                                        // check account connection
    if (isReady && router.isReady && !defaultAccount) {
      router.push("/");
    }
  }, [isReady, router, defaultAccount]);
  
  if (!router.isReady) {
    return <Box>Loading</Box>
  }
  return (
    <Box bgcolor={"secondary.main"} height={"100vh"}>
      <Navbar />
      <Box sx={{ marginTop: "3rem" }}>
        <BorrowDetailsBox nftDetails={nftDetails}/>
      </Box>
    </Box>
  );
};

export default BorrowDetails;
