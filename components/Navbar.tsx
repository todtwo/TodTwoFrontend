import { Box, Button, Stack, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React, { MouseEventHandler, useContext, useState } from "react";
import { EthContext } from "../context/ethContext";

interface PropTypes {
  selectedTab?: boolean | string;
  
}

function Navbar({ selectedTab = false }: PropTypes) {
  const [selectedNav, setSelectedNav] = useState<boolean | string>(selectedTab);
  const {
    defaultAccount,
    setDefaultAccount,
    
  } = useContext(EthContext);
  const handleNavChange = (
    event: React.SyntheticEvent,
    newValue: boolean | string
  ) => {
    setSelectedNav(newValue);
  };

  const router = useRouter();

  const navigate = (href: string) => {
    return () => {
      router.push(`${href}`);
    };
  };

  const connectHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any) => {
          setDefaultAccount(result[0]);
        });
    } else {
    }
  };
  
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{
        fontSize: "3rem",
        paddingX: "15%",
        backgroundColor: "#495483",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Box sx={{ color: "#FFFDF1" }} onClick={navigate("/")}>
        TODTWO
      </Box>

      <Tabs
        value={selectedNav}
        onChange={handleNavChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab
          sx={{ paddingY: "2rem", fontSize: "1rem", color: "#FFFDF1" }}
          value="Lend"
          label="Lend"
          onClick={navigate("/lending")}
        />
        <Tab
          sx={{ fontSize: "1rem", color: "#FFFDF1" }}
          value="Borrow"
          label="Borrow"
          onClick={navigate("/borrow")}
        />
        <Tab
          sx={{ fontSize: "1rem", color: "#FFFDF1" }}
          value="About"
          label="About"
          onClick={navigate("/about")}
        />
        {defaultAccount ? (
          <Tab
            sx={{ fontSize: "1rem", color: "#FFFDF1" }}
            value="Account"
            label="Account"
            onClick={navigate("/account")}
          />
        ) : (
          <div
            style={{
              marginTop: "0.5rem",
              paddingLeft: "0.5rem",
              color: "#495483",
            }}
          >
            <Button
              onClick={connectHandler}
              sx={{ fontSize: "1rem", background: "#ffffff" }}
            >
              Connect
            </Button>
          </div>
        )}
      </Tabs>
    </Stack>
  );
}

export default Navbar;
