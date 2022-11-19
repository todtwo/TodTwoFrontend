import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BorrowedDashboardData } from "./TableData";
import { Grid } from "@mui/material";

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

interface CollateralModalProps {
  showModal: boolean;
  handleCancel: () => void;
  totalCollaterals: number;
}

export default function CollateralModal(props: CollateralModalProps) {
  return (
    <Modal open={props.showModal} onClose={props.handleCancel}>
      <Box sx={style}>
        <Typography variant="h3"> Collect Collaterals</Typography>
        <p style={{ display: "inline" }}>
          Total collaterals available to collect :
        </p>
        <p style={{ fontSize: "30px", fontWeight: "bold", display: "inline" }}>
          {" "}
          {props.totalCollaterals}
        </p>
        <p style={{ display: "inline" }}> ETH</p>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button>Confirm</Button>
          <Button onClick={props.handleCancel}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
