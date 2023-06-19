import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import Web3 from "web3";

const WALLET_CONNECTED_ITEM = "";

const WalletContext = createContext({});

export const WalletProvider = ({ children }) => {
  const [web3, setWeb3] = useState({});
  const [address, setAddress] = useState();
  const [chainId, setChainId] = useState();
  const [balance, setBalance] = useState();

  const isWeb3Enabled = useMemo(() => {
    if (web3.eth) {
      return true;
    }
    return false;
  }, [web3]);

  const enableWeb3 = useCallback(
    async (providerAPI) => {
      try {
        if (!isWeb3Enabled) {
          if (window[providerAPI]) {
            await window[providerAPI].request({
              method: "eth_requestAccounts",
            });
            setWeb3(new Web3(window[providerAPI]));
            const chainId = await window[providerAPI].request({
              method: "eth_chainId",
            });
            setChainId(Web3.utils.hexToNumber(chainId));
            localStorage.setItem(WALLET_CONNECTED_ITEM, providerAPI);
          } else {
            throw new Error("Could not find the selected provider.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isWeb3Enabled]
  );

  useEffect(() => {
    (async () => {
      if (isWeb3Enabled) {
        const [account] = await web3.eth.getAccounts();
        setAddress(account);
        // console.log("account", account);
        const getBalanceres = await web3.eth.getBalance(account);
        const ethBalance = web3.utils.toWei(getBalanceres, "ether");
        // console.log("ethBalance", ethBalance);
        setBalance(ethBalance);
      }
    })();
  }, [isWeb3Enabled, web3.eth]);

  useEffect(() => {
    const walletProvider = localStorage.getItem(WALLET_CONNECTED_ITEM);
    if (walletProvider) {
      setTimeout(() => {
        enableWeb3(walletProvider);
      }, 1000);
    }
  }, [enableWeb3]);

  return (
    <WalletContext.Provider
      value={{
        isWeb3Enabled,
        web3,
        enableWeb3,
        address,
        chainId,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

/**
 * @typedef {Function} EnableWeb3
 * @param {string} providerAPI - The provider injected window api
 * @returns {void}
 */

/**
 * @typedef {Object} WalletProps
 * @property {boolean} isWeb3Enabled - True if wallet is connected already
 * @property {Web3} web3 - The Web3 object
 * @property {EnableWeb3} enableWeb3 - Used to enable web3 (connect the wallet)
 * @property {string} address - User's address
 */

/**
 * useWallet hook
 * @returns {WalletProps}
 */
export const useWallet = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within an WalletContext Provider");
  }

  return context;
};
