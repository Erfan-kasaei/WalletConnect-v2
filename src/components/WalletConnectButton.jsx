import React, { useState } from "react";
import { connectWallet } from "../utils/walletConnect";

const WalletConnectButton = () => {
  const [account, setAccount] = useState(null);

  const handleConnect = async () => {
    try {
      const connectedAccount = await connectWallet();
      setAccount(connectedAccount);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-center w-full">
      {account ? (
        <p className="text-green-600 font-semibold">Connected: {account}</p>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;
