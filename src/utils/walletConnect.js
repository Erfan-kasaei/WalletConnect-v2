import { SignClient } from "@walletconnect/sign-client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const namespaces = {
  eip155: {
    methods: [
      "eth_requestAccounts",
      "eth_sendTransaction",
      "personal_sign",
      "eth_signTypedData",
    ],
    chains: ["eip155:1", "eip155:5"],
    events: ["chainChanged", "accountsChanged"],
    accounts: [
      "eip155:1:0xfe9A29fbD39658CAF5CC24925bc8e62459087b88",
      "eip155:56:0xfe9A29fbD39658CAF5CC24925bc8e62459087b88",
      "eip155:5:0xfe9A29fbD39658CAF5CC24925bc8e62459087b88",
      "eip155:97:0xfe9A29fbD39658CAF5CC24925bc8e62459087b88",
    ],
  },
};

export const connectWallet = async () => {
  try {
    const projectId = "your-project-id";
    if (!projectId) {
      throw new Error("Project ID is not defined");
    }

    const client = await SignClient.init({
      projectId,
      relayUrl: "wss://relay.walletconnect.com",
    });

    const { uri } = await client.connect({
      requiredNamespaces: namespaces,
    });

    if (uri) {
      console.log("WalletConnect URI:", uri);
      QRCodeModal.open(uri);
    }
  } catch (error) {
    console.error("Error connecting to WalletConnect:", error);
  }
};
