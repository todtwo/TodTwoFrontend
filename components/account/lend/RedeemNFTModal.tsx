import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LentDashboardData } from "../../types/TableData";
import { Grid } from "@mui/material";
import Image from "next/image";
import { EthContext } from "../../../context/EthContext";
import { BigNumber, ethers } from "ethers";
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

interface ModalProps {
  showModal: boolean;
  handleCancel: () => void;
  data: LentDashboardData | null;
}

export default function RedeemModal(props: ModalProps) {
  const { TodTwoContract } = React.useContext(EthContext);

  async function handleConfirm() {
    try {
      const res = await TodTwoContract.redeemNFT(
        props.data?.projectAddress,
        BigNumber.from(props.data?.tokenId)
      );
      if (res) {
        props.handleCancel();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal open={props.showModal} onClose={props.handleCancel}>
      <Box sx={style}>
        <Typography variant="h3" sx={{ marginBottom: "15px" }}>
          {" "}
          Redeeming
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {" "}
            <Image
              src={`${props.data?.asset.imgUrl}`}
              alt={`${props.data?.asset.name}`}
              width={200}
              height={200}
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
                <Box>Lending Price</Box>
                <Box>Lending Duration</Box>
                <Box>Collateral</Box>
              </Grid>
              <Grid item xs={8} sx={{ fontSize: "25px", height: "100%" }}>
                <Box> {props.data?.asset.name}</Box>
                <Box> {props.data?.asset.projectName}</Box>
                <Box>
                  {ethers.utils.formatEther(`${props.data?.lentPrice}`)} ETH
                </Box>
                <Box> {`${props.data!.lendingDuration / 86400}`} Days</Box>
                <Box>
                  {ethers.utils.formatEther(`${props.data?.collateral}`)} ETH
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => handleConfirm()}>Confirm</Button>
          <Button onClick={props.handleCancel}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
