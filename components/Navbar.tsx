import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React, { MouseEventHandler, useState } from "react";

interface PropTypes {
  selectedTab?: boolean | string;
}

function Navbar({ selectedTab = false }: PropTypes) {
  const [selectedNav, setSelectedNav] = useState<boolean | string>(selectedTab);

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

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{
        fontSize: "2rem",
        paddingX: "15%",
        backgroundColor: "#495483",
      }}
    >
      <Box onClick={navigate("/")}>TODTWO</Box>

      <Tabs
        value={selectedNav}
        onChange={handleNavChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          sx={{ paddingY: "2rem", color: "white" }}
          value="Lend"
          label="Lend"
          onClick={navigate("/lending")}
        />
        <Tab
          value="Borrow"
          label="Borrow"
          onClick={navigate("/borrow")}
          sx={{ color: "white" }}
        />
        <Tab
          value="About"
          label="About"
          onClick={navigate("/about")}
          sx={{ color: "white" }}
        />
        <Tab
          value="Account"
          label="Account"
          onClick={navigate("/account")}
          sx={{ color: "white" }}
        />
      </Tabs>
    </Stack>
  );
}

export default Navbar;
