import { useWallet } from "../store/wallet";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/header";
import Viewer from "../components/shoes-assets";
import Avtar from "../image/Avatar.png";
// import Weapon from "../image/Weapon.png";
import Weapon2 from "../image/Weapon2.png";
import { AppMouse } from "../components/mouse-assets";
import {
  buyNFT,
  getLatestTokenId,
  getMintedTokenIds,
  getNftSold,
  getTokensForSale,
  mintNFT,
  nftForSale,
} from "../contract/contractService";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import DetailsModal from "../dialogModal";
import App, { AppBubble } from "../components/bubble-asset";
import AppCircle from "../components/circule-asset";

export default function Dashboard() {
  const { wallet, web3, address, isWeb3Enabled } = useWallet();

  const cardList = [
    {
      category: "Shoes",
      image: <Viewer />,
      Description:
        "NFTs are unique digital assets that are stored on a blockchain.",
      id: 0,
    },
    {
      category: "Mouse",
      image: <AppMouse />,
      Description:
        "In general, NFTs (Non-Fungible Tokens) are unique digital assets.",
      id: 1,
    },
    {
      category: "Bubble",
      image: <App />,
      Description: "If there is a specific Metaverse NFT collection. ",
      id: 2,
    },
    {
      category: "Circle",
      image: <AppCircle />,
      Description:
        "Nft's are typically stored on a blockchain and provide verifiable ownership and scarcity.",
      id: 3,
    },
  ];

  const [mintedTokenIds, setMintedTokenIds] = useState([]);

  const [tokenForSale, setTokenForSale] = useState([]);

  const [soldNfts, setSoldNfts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [buttonLoader, setButtonLoader] = useState(false);

  const [statusBoolean, setStatusBoolean] = useState(false);

  const [detailsDialogBoolean, setDetailsDialogBoolean] = useState(false);

  const [selectedCardData, setSelectedCardData] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    if (address) {
      test1();
      statusChecker();
    }
  }, [address, statusBoolean]);

  const test1 = async () => {
    if (address) {
      const latestTokenIdRes = await getLatestTokenId(web3);
      console.log("latestTokenIdRes", latestTokenIdRes);
    }
  };

  const statusChecker = async () => {
    if (address) {
      setLoading(true);
      const mintedTokenIdRes = await getMintedTokenIds(web3);
      console.log("mintedTokenIdRes", mintedTokenIdRes);
      setMintedTokenIds(mintedTokenIdRes);

      const tokensForSale = await getTokensForSale(web3);
      console.log("tokensForSale", tokensForSale);
      setTokenForSale(tokensForSale);

      const nftSold = await getNftSold(web3);
      console.log("nftSold", nftSold);
      setSoldNfts(nftSold);

      setLoading(false);
    }
  };

  const handleButtonClick1 = async (name, category, tokenId) => {
    if (!isWeb3Enabled) {
      toast.warning(`Please connect your Metamask Wallet`);
      return;
    }
    console.log("name", name);
    setButtonLoader(true);
    if (name === "Mint") {
      const mintNftResponse = await mintNFT(web3, address, tokenId);
      console.log("mintNftResponse", mintNftResponse);

      if (mintNftResponse.transactionHash) {
        toast.success("Nft Minted Successfully");
        setStatusBoolean((prev) => !prev);
        setButtonLoader(false);
      }
    } else if (name === "Put on Sale") {
      const safeNftResponse = await nftForSale(web3, address, tokenId);
      console.log("safeNftResponse", safeNftResponse);

      if (safeNftResponse.transactionHash) {
        toast.success("Nft placed on Sale Successfully");
        setStatusBoolean((prev) => !prev);
        setButtonLoader(false);
      }
    } else if (name === "Buy") {
      const buyNftResponse = await buyNFT(web3, address, tokenId);
      console.log("buyNftResponse", buyNftResponse);
      if (buyNftResponse.transactionHash) {
        toast.success("Nft Bought Successfully");
        setStatusBoolean((prev) => !prev);
        setButtonLoader(false);
      }
    } else if (name === "Sold") {
      console.log("sold");
    } else {
      console.log("error");
    }
  };

  const handleOpenDetailsDialog = (item) => {
    setSelectedCardData(item);
    setDetailsDialogBoolean(true);
  };

  const handleCLoseDetailsDialog = () => {
    setDetailsDialogBoolean(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                textAlign: "center",
                fontSize: "68px",
                lineHeight: "78px",
                fontWeight: "700",
                color: "#fff",
              }}
            >
              Create your Metaverse NFT marketplace for Play to Earn Games
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {" "}
              Build a Metaverse NFT marketplace collections
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button> */}
              {/* <Button variant="outlined">Create NFT</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {!loading ? (
              cardList.map((item, idx) => (
                <Grid key={item.id} item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {item.image}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.category}
                      </Typography>
                      <Typography>{item.Description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        disabled={buttonLoader || soldNfts.includes(item.id)}
                        name={
                          soldNfts.includes(item.id)
                            ? "Sold"
                            : tokenForSale.includes(item.id)
                            ? "Buy"
                            : mintedTokenIds.includes(item.id)
                            ? "Put on Sale"
                            : "Mint"
                        }
                        onClick={(e) =>
                          handleButtonClick1(
                            e.target.name,
                            item.category,
                            item.id
                          )
                        }
                      >
                        {soldNfts.includes(item.id)
                          ? "Sold"
                          : tokenForSale.includes(item.id)
                          ? "Buy"
                          : mintedTokenIds.includes(item.id)
                          ? "Put on Sale"
                          : "Mint"}
                      </Button>
                      <Button
                        onClick={() => handleOpenDetailsDialog(item)}
                        size="small"
                      >
                        Detail
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  rowGap: 2,
                }}
              >
                <CircularProgress />
                {/* <Typography variant="h5">
                  Please connect your Metamask
                </Typography> */}
              </Box>
            )}
          </Grid>
        </Container>
      </main>

      {detailsDialogBoolean && (
        <DetailsModal
          openStatus={detailsDialogBoolean}
          onClose={() => handleCLoseDetailsDialog()}
          data={selectedCardData}
          // postId={postId}
          // type={type}
        />
      )}
    </ThemeProvider>
  );
}
