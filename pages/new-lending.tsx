import React, { Fragment, useEffect, useState, useContext } from "react";
import Image from "next/image";
import axios from "axios";

import { Box, Button, Fade, Grid } from "@mui/material";

import Navbar from "../components/Navbar";
import FilterBox from "../components/common/FilterBox";
import { filterCheckBoxType } from "../types/filterCheckBoxType";
import { EthContext } from "../context/ethContext";

const whiteListed = [
  "0x13502Ea6F6D14f00025a3AdDe02BFf050be24532",
  "0xFA6b6B5Eb53F951Bc4CfC607DbeC230DDE638eD5",
  "0x40e3b499A062153158C90572f378132Bab6AB07B",
];

interface NFTData {
  previewImgUrl: string;
  name: string;
  projectName: string;
  fullImgUrl: string;
  description: string;
}

function GetNFTsByContract(contract: String) {
  return axios.get(
    `https://api-testnets.simplehash.com/api/v0/nfts/ethereum-goerli/${contract}`,
    {
      headers: {
        "X-API-KEY":
          "wattanatawee_sk_c6b59475-e27f-46b8-b506-57bb41e67f85_82tcdyh0wq6fyfm8",
      },
    }
  );
}

export default function NewLending() {
  const [account, setAccount] = useState<string>("0x123422343");
  const [filters, setFilters] = useState<filterCheckBoxType>({
    nft1checked: false,
    nft2checked: false,
    nft3checked: false,
  });
  const [data, setData] = useState<NFTData[]>([]);
  const {
    provider,
    defaultAccount,
    setDefaultAccount,
    connectHandle,
    contract,
  } = useContext(EthContext);

  useEffect(() => {
    setAccount(defaultAccount);
  }, [defaultAccount]);

  useEffect(() => {
    if (account) {
      getAllOwnedNFTs(account);
    }
  }, [account]);

  function getAllOwnedNFTs(owner: String) {
    Promise.all(
      whiteListed.map((contract) => {
        return GetNFTsByContract(contract);
      })
    ).then((results) => {
      setData(
        results
          .map((r) => {
            return r.data.nfts;
          })
          .reduce((a, b) => a.concat(b))
          .reduce((a, b) => {
            if (
              b.owners[0].owner_address.toUpperCase() === owner.toUpperCase()
            ) {
              var x: NFTData = {
                previewImgUrl: b.previews.image_small_url,
                projectName: b.collection.name,
                name: b.name,
                fullImgUrl: b.previews.image_large_url,
                description: b.description,
              };
              a.push(x);
            }
            return a;
          }, [])
      );
    });
  }

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
        }}
      >
        <h2>Lend</h2>
        <h3>Select your NFT to loean</h3>
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
                  <Box key={i} sx={{ textAlign: "center" }}>
                    <Image
                      src={d.previewImgUrl}
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
      </Box>
    </>
  );
}
