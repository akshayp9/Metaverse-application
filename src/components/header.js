import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useWallet } from "../store/wallet";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(10),
    width: "350px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "14ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const wallet = useWallet();
  const { isWeb3Enabled, address, balance } = useWallet();

  const handleConnect = React.useCallback(
    async (api) => {
      try {
        const ethereum = window.ethereum;
        if (ethereum === undefined) {
          await wallet.enableWeb3("walletconnect");
        } else {
          await wallet.enableWeb3(api);
        }
      } catch {}
    },
    [wallet]
  );

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000 !important",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ marginLeft: "80px", marginRight: "80px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", columnGap: "2rem" }}>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                {/* <img src={bitnauticLogo} alt="" width={50} /> */}
                Marketplace
              </Typography>

              <Typography sx={{ marginTop: "5px", fontSize: "15px" }}>
                Create
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "15px" }}>
                Explore
              </Typography>

              <Search
                sx={{
                  display: { xs: "none", sm: "block", lg: "block" },
                  borderRadius: "20px",

                  color: "#fff",
                  backgroundColor: "#676565a8",
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for NFTs"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </Box>

          <Button
            sx={{ borderRadius: "20px", color: "#fff", width: "210px" }}
            variant="contained"
            onClick={() => handleConnect("ethereum")}
            disabled={isWeb3Enabled}
          >
            <AccountBalanceWalletIcon sx={{ mr: 1, color: "#fff" }} />
            <Typography fontSize="inherit" color="white">
              {isWeb3Enabled && address !== undefined
                ? address.substring(0, 5) +
                  "..." +
                  address.substring(address.length - 5)
                : "  Connect Wallet"}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
