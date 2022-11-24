import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { BorrowedDashboardData } from "../../types/TableData";
import Image from "next/image";
import { EthContext } from "../../../context/EthContext";
import { BigNumber } from "ethers";
import { ethers } from "ethers";

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
  const { TodTwoContract, AddressToContract } = React.useContext(EthContext);

  const handleReturn = async () => {
    try {
      const contract = AddressToContract[props.data?.projectAddress as string];
      const checkApproval = await contract.getApproved(props.data?.tokenId);
      if (checkApproval !== TodTwoContract.address) {
        const x = await contract.approve(
          TodTwoContract.address,
          props.data?.tokenId
        );
        const receipt = await x.wait();
      }

      const res = await TodTwoContract.returnNFT(
        props.data?.projectAddress,
        BigNumber.from(props.data?.tokenId)
      );

      if (res) {
        props.handleCancel();
      }
    } catch (error) {
      console.log(error);
    }
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
                <Box>Fees</Box>
                <Box>Collateral</Box>
              </Grid>
              <Grid item xs={8} sx={{ fontSize: "25px", height: "100%" }}>
                <Box> {props.data?.asset.name}</Box>
                <Box> {props.data?.asset.projectName}</Box>
                <Box>
                  {" "}
                  {ethers.utils.formatEther(`${props.data?.borrowedPrice}`)}ETH
                </Box>
                <Box>
                  {ethers.utils.formatEther(`${props.data?.collateral}`)}ETH
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => handleReturn()}
            color="success"
            variant="contained"
          >
            Confirm
          </Button>
          <Button onClick={props.handleCancel} variant="contained">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
