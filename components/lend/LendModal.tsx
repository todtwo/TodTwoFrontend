import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NFTData from "../../types/NftData";
import { duration, Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import { EthContext } from "../../context/EthContext";

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

interface LendModalProps {
  showModal: boolean;
  handleCancel: () => void;
  data: NFTData | null;
}

export default function LendModal(props: LendModalProps) {
  const [lendingPrice, setLendingPrice] = useState<number>();
  const [lendingDuration, setLendingDuration] = useState<number>();
  const [collateral, setCollateral] = useState<number>();
  const [showWarning, setShowWarning] = useState(false);

  const { TodTwoContract, AddressToContract } = useContext(EthContext);

  async function confirmLend() {
    if (collateral && lendingDuration && lendingPrice) {
      const contract = AddressToContract(props.data?.address);
      const checkApproval = await contract.getApproved(props.data?.tokenId);
      if (checkApproval !== TodTwoContract.address) {
        const x = await contract.approve(
          TodTwoContract.address,
          props.data?.tokenId
        );
        const receipt = await x.wait();
        console.log("REC", receipt);
      }

      const res = await TodTwoContract.lendNFT(
        props.data?.address,
        props.data?.tokenId,
        ethers.utils.parseEther(`${collateral}`),
        ethers.utils.parseEther(`${lendingPrice}`),
        lendingDuration * 86400
      );

      if (res) {
        props.handleCancel();
      }
    } else {
      setShowWarning(true);
    }
  }

  return (
    <Modal open={props.showModal} onClose={props.handleCancel}>
      <Box sx={style}>
        <Typography variant="h3"> Loaning</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {" "}
            <Image
              src={`${props.data?.fullImgUrl}`}
              width={500}
              height={500}
              alt="idkidk"
            />
          </Grid>

          <Grid item xs={6}>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{ fontSize: "25px", fontWeight: "bold", height: "100%" }}
              >
                <Box> Name</Box>
                <Box> Project</Box>
                <Box>Lending Price</Box>
                <Box>Lending Duration</Box>
                <Box>Collateral</Box>
              </Grid>
              <Grid item xs={6} sx={{ fontSize: "25px", height: "100%" }}>
                <Box> {props.data?.name}</Box>
                <Box> {props.data?.projectName}</Box>{" "}
                <Box>
                  <TextField
                    required
                    id="lending-price"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    onChange={(event) => setLendingPrice(+event?.target.value)}
                  />
                  ETH
                </Box>
                <Box>
                  {" "}
                  <TextField
                    required
                    id="lending-duration"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    onChange={(event) =>
                      setLendingDuration(+event?.target.value)
                    }
                  />
                  Days
                </Box>
                <Box>
                  {" "}
                  <TextField
                    required
                    id="collateral"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    onChange={(event) => setCollateral(+event?.target.value)}
                  />
                  ETH
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {showWarning && (
            <Box sx={{ color: "red" }}>
              Please fill all lending terms before proceding
            </Box>
          )}
          <Button
            onClick={() => {
              confirmLend();
            }}
          >
            Confirm
          </Button>
          <Button onClick={props.handleCancel}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
