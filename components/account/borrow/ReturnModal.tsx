import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { BorrowedDashboardData } from "../../types/TableData";
import { EthContext } from "../../../context/ethContext";
import Image from "next/image";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
  padding: "40px",
};

interface returnModalProps {
  showModal: boolean;
  handleCancel: () => void;
  data: BorrowedDashboardData | null;
}

export default function ReturnModal(props: returnModalProps) {
  const { TodTwoContract } = React.useContext(EthContext);

  const handleReturn = () => {
    TodTwoContract.returnNFT(props.data?.projectAddress, props.data?.tokenId);
  };

  return (
    <Modal open={props.showModal} onClose={props.handleCancel}>
      <Box sx={style}>
        <Typography variant="h3" sx={{ marginBottom: "15px" }}>
          {" "}
          Returning
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {" "}
            <Image
              src={`${props.data?.asset.imgUrl}`}
              alt={`${props.data?.asset.name}`}
              width={300}
              height={300}
            />
          </Grid>

          <Grid item xs={8}>
            <Grid container>
              <Grid
                item
                xs={4}
                sx={{ fontSize: "25px", fontWeight: "bold", height: "100%" }}
              >
                <Box>Name</Box>
                <Box>Project</Box>
                <Box>Owner</Box>
                <Box>Fees</Box>
                <Box>Collateral</Box>
              </Grid>
              <Grid item xs={8} sx={{ fontSize: "25px", height: "100%" }}>
                <Box> {props.data?.asset.name}</Box>
                <Box> {props.data?.asset.projectName}</Box>
                <Box>{props.data?.lender}</Box>
                <Box>{props.data?.borrowedPrice} ETH</Box>
                <Box>{props.data?.collateral} ETH</Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => handleReturn()}>Confirm</Button>
          <Button onClick={props.handleCancel}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
