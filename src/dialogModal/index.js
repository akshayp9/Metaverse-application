import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { config } from "../config";

const DetailsModal = ({ openStatus, onClose, data }) => {
  return (
    <>
      <Dialog
        sx={{
          
        }}
        open={openStatus}
        maxWidth="sm"
        fullWidth
        //   fullScreen={isTabletOrMobile && true}
        onClose={onClose}
      >
        <DialogTitle sx={{
          color:"#fff",
          backgroundColor:"#353535"
        }}>
          <Typography textAlign="center" fontSize={"1.5rem"}>Details</Typography>
        </DialogTitle>
        <DialogContent dividers
         sx={{
         color:"#fff",
         backgroundColor:"#353535"
        }}>
          <DialogContentText sx={{fontWeight:700}}>Name : {data.category}</DialogContentText>
          <DialogContentText sx={{fontWeight:700}}>Description : {data.Description}</DialogContentText>
          <DialogContentText sx={{fontWeight:700}}>Date : 12/06/2023</DialogContentText>
          <DialogContentText sx={{fontWeight:700}}>
            Contract Address : {config.nftContractAddress}
          </DialogContentText>
          <DialogContentText sx={{fontWeight:700}}>Token ID : {data.id}</DialogContentText>
          <DialogContentText sx={{fontWeight:700}}>Token Standard : ERC-721</DialogContentText>
          <DialogContentText sx={{fontWeight:700}}>Metadata : Centralized</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailsModal;
