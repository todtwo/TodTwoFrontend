import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NFTData from "../../types/NftData";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";

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

function confirmLend() {
  //TODO : call get approval + contract
}

export default function LendModal(props: LendModalProps) {
  const [lendingPrice, setLendingPrice] = useState<number>();
  const [lendingDuration, setLendingDuration] = useState<number>();
  const [collateral, setCollateral] = useState<number>();

  return (
    <Modal open={props.showModal} onClose={props.handleCancel}>
      <Box sx={style}>
        <Typography variant="h3"> Loaning</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {" "}
            <img style={{ width: "90%" }} src={props.data?.fullImgUrl} />
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
          <Button>Confirm</Button>
          <Button onClick={props.handleCancel}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
