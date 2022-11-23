import React, { Fragment, useEffect, useState, useContext } from "react";
import Image from "next/image";
import axios from "axios";

import { Box, Button, Fade, Grid } from "@mui/material";

import Navbar from "../components/Navbar";
import FilterBox from "../components/common/FilterBox";
import { filterCheckBoxType } from "../types/filterCheckBoxType";
import NFTData from "../types/NftData";
import LendModal from "../components/lend/LendModal";
import { EthContext } from "../context/EthContext";
import { useRouter } from "next/router";
import { GetNFTDetailsV2, mergeObject } from "../utils/GetNFTDetails";

const nfts = [
  { contract: "0x13502Ea6F6D14f00025a3AdDe02BFf050be24532", tokenId: 0 },
  { contract: "0x13502Ea6F6D14f00025a3AdDe02BFf050be24532", tokenId: 1 },
  { contract: "0x13502Ea6F6D14f00025a3AdDe02BFf050be24532", tokenId: 2 },
  { contract: "0xFA6b6B5Eb53F951Bc4CfC607DbeC230DDE638eD5", tokenId: 0 },
  { contract: "0xFA6b6B5Eb53F951Bc4CfC607DbeC230DDE638eD5", tokenId: 1 },
  { contract: "0xFA6b6B5Eb53F951Bc4CfC607DbeC230DDE638eD5", tokenId: 2 },
  { contract: "0x40e3b499A062153158C90572f378132Bab6AB07B", tokenId: 0 },
  { contract: "0x40e3b499A062153158C90572f378132Bab6AB07B", tokenId: 1 },
  { contract: "0x40e3b499A062153158C90572f378132Bab6AB07B", tokenId: 2 },
];

function GetNFTsByContract(contract: String, tokenId: number) {
  return axios.get(
    `https://api-testnets.simplehash.com/api/v0/nfts/owners/ethereum-goerli/${contract}/${tokenId}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
}

export default function NewLending() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>();
  const [filters, setFilters] = useState<filterCheckBoxType>({
    nft1checked: false,
    nft2checked: false,
    nft3checked: false,
  });
  const [data, setData] = useState<NFTData[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null);
  const {
    provider,
    defaultAccount,
    setDefaultAccount,
    getContract,
    connectHandler,
    isReady,
  } = useContext(EthContext);
  const router = useRouter();
  const onAccountChangedHandler = (accounts: Array<string>) => {
    if (accounts.length > 0) {
      setDefaultAccount(accounts[0]);
    } else {
      setDefaultAccount(null);
    }
  };

  useEffect(() => {
    //console.log(process.env.NEXT_PUBLIC_API_KEY)
    //console.log(process.env.NODE_ENV)
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
    if (defaultAccount) {
      getAllOwnedNFTs(defaultAccount);
    }
  }, [defaultAccount]);

  function onClickNFT(i: number) {
    setSelectedNFT(data[i]);
    setShowModal(true);
  }

  function getAllOwnedNFTs(owner: String) {
    Promise.all(
      nfts.map((c) => {
        return GetNFTsByContract(c.contract, c.tokenId);
      })
    ).then(async (results) => {
      var x = results
        .filter((b) => {
          return (
            b.data?.owners[0].owner_address.toUpperCase() ===
            owner.toUpperCase()
          );
        })
        .map((r) => {
          return {
            nftId: r.data.owners[0].nft_id,
            nftTokenId: r.data.owners[0].nft_id.slice(-1),
          };
        });

      var details = await GetNFTDetailsV2(x);

      var y = mergeObject(
        x,
        details.filter(
          (item: any, index: any, array: any) =>
            index ===
            array.findIndex((foundItem: any) =>
              isPropValuesEqual(foundItem, item, ["nftId"])
            )
        )
      );
      setData(y);
    });
  }

  const isPropValuesEqual = (subject: any, target: any, propNames: any) =>
    propNames.every((propName: any) => subject[propName] === target[propName]);

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
          paddingX: "15%",
          paddingTop: "2rem",
        }}
      >
        <h2>Lend</h2>
        <h3>Select your NFT to loan</h3>
        <Box
          sx={{
            minHeight: "80%",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          Owned NFTs
        </Box>
        <Grid container>
          <Grid item xs={4}>
            <FilterBox filters={filters} setFilters={setFilters} />
          </Grid>{" "}
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                p: 1,
                m: 1,
                borderRadius: 1,
              }}
            >
              {data.map((d, i) => {
                return (
                  <Box
                    key={i}
                    sx={{ textAlign: "center", marginRight: "10px" }}
                    onClick={() => onClickNFT(i)}
                  >
                    <Image
                      src={d.fullImgUrl}
                      width={200}
                      height={200}
                      alt={d.name}
                    />
                    <Box> {d.name}</Box>
                    <Box> {d.projectName}</Box>
                  </Box>
                );
              })}
            </Box>
          </Grid>{" "}
        </Grid>
        {showModal && (
          <LendModal
            data={selectedNFT}
            showModal={showModal}
            handleCancel={() => setShowModal(false)}
          />
        )}
      </Box>
    </>
  );
}
