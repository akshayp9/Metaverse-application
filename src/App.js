import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "../src/store/wallet";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const ethereum = window.ethereum;

  if (ethereum) {
    ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    ethereum.on("chainChanged", function (chainId) {
      window.location.reload();
    });
  }

  return (
    <WalletProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
