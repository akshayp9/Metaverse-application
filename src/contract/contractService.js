import erc721abi from "../abi/erc721.json";
import { config } from "../config";

// const Web3 = require('web3');
// // Connect to an Ethereum node (such as Infura)
// const web3 = new Web3('<YOUR_INFURA_API_ENDPOINT>');
// // Specify the wallet address for which you want to check the balance
// const walletAddress = '0x...'; // Replace with the actual wallet address
// // Get the balance of the wallet
// web3.eth.getBalance(walletAddress, (error, balance) => {
//   if (error) {
//     console.error('Error:', error);
//   } else {
//     // Convert the balance from wei to ETH
//     const ethBalance = web3.utils.fromWei(balance, 'ether');
//     console.log('ETH Balance:', ethBalance);
//   }
// });

export const getLatestTokenId = async (web3) => {
  try {
    const getLatestTokenIdContract = new web3.eth.Contract(
      erc721abi,
      config.nftContractAddress
    );
    const getLatestTokenIdContractRes = await getLatestTokenIdContract.methods
      ._tokenIdCounter()
      .call();
    const latestTokenIdContractRes = Number(getLatestTokenIdContractRes);
    return latestTokenIdContractRes;
  } catch (err) {
    console.log("errr", err);
    return err;
  }
};

export const getMintedTokenIds = async (web3) => {
  try {
    const getMintedTokenIdContract = new web3.eth.Contract(
      erc721abi,
      config.nftContractAddress
    );
    const getMintedTokenIdContractRes = await getMintedTokenIdContract.methods
      .getMintedTokenIds()
      .call();

    const mintedtokenIds = getMintedTokenIdContractRes.map((tokenId) =>
      Number(tokenId)
    );
    return mintedtokenIds;
  } catch (err) {
    console.log("errr", err);
    return err;
  }
};

export const getTokensForSale = async (web3) => {
  try {
    const getTokensForSaleContract = new web3.eth.Contract(
      erc721abi,
      config.nftContractAddress
    );
    const getTokensForSaleContractRes = await getTokensForSaleContract.methods
      .getTokensForSale()
      .call();

    const tokenForSale = getTokensForSaleContractRes.map((tokenId) =>
      Number(tokenId)
    );

    return tokenForSale;
  } catch (err) {
    console.log("errr", err);
    return err;
  }
};

export const getNftSold = async (web3) => {
  try {
    const getNftSoldContract = new web3.eth.Contract(
      erc721abi,
      config.nftContractAddress
    );
    const getNftSoldContractRes = await getNftSoldContract.methods
      .getSoldToken()
      .call();

    const nftSold = getNftSoldContractRes.map((tokenId) => Number(tokenId));
    return nftSold;
  } catch (err) {
    console.log("errr", err);
    return err;
  }
};

export const mintNFT = async (web3, address, tokenId) => {
  try {
    const mintNftContract = new web3.eth.Contract(
      erc721abi,
      config.nftContractAddress
    );
    console.log("mintNftContract", mintNftContract);
    const mintNftContractRes = await mintNftContract.methods
      .safeMint(address, config.metaDataUri)
      .send({
        from: address, // walletAddress
      });
    console.log("mintNftContractRes", mintNftContractRes);

    return mintNftContractRes;
  } catch (err) {
    console.log("errr", err);
    return err;
  }
};

export const nftForSale = async (web3, address, tokenId) => {
  try {
    const saleNftContract = new web3.eth.Contract(
      erc721abi,
      config.nftContractAddress
    );

    const saleNftContractRes = await saleNftContract.methods
      .setNFTSetForSell(tokenId, 1)
      .send({
        from: address, // walletAddress
      });

    console.log("saleNftContractRes", saleNftContractRes);

    return saleNftContractRes;
  } catch (err) {
    console.log("errr", err);
    return err;
  }
};

export const buyNFT = async (web3, address, tokenId) => {
  console.log("tokenId", tokenId);
  try {
    const buyNftContract = new web3.eth.Contract(
      erc721abi,
      config.nftContractAddress
    );

    const tokenPrice = await buyNftContract.methods
      ._tokenPrices(tokenId)
      .call();
    // console.log("tokenPrice", tokenPrice);

    const tokenPriceConverted = Number(tokenPrice);

    // console.log("tokenPriceConverted", tokenPriceConverted);

    const buyNftContractres = await buyNftContract.methods
      .buyNFTSet(tokenId)
      .send({
        from: address,
        value: tokenPriceConverted, // walletAddress
      });
    return buyNftContractres;
  } catch (err) {
    console.log("errr", err);
    return err;
  }
};
