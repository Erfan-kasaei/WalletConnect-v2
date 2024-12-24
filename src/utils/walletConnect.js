// وارد کردن کتابخانه‌های WalletConnect و QRCodeModal
import { SignClient } from "@walletconnect/sign-client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// تعریف فضای نام‌ها (namespaces) برای WalletConnect
// این تنظیمات شامل متدها، شبکه‌ها، رویدادها و حساب‌های پشتیبانی شده است
const namespaces = {
  eip155: {
    methods: [
      "eth_requestAccounts", // درخواست لیست حساب‌ها
      "eth_sendTransaction", // ارسال تراکنش‌ها
      "personal_sign", // امضای شخصی پیام‌ها
      "eth_signTypedData", // امضای داده‌های نوع‌بندی شده
    ],
    chains: ["eip155:1", "eip155:5"], // شناسه‌های شبکه‌ها (Ethereum Mainnet و Goerli Testnet)
    events: ["chainChanged", "accountsChanged"], // رویدادهای تغییر شبکه و تغییر حساب
    accounts: [
      "eip155:1:0xfe9A29fbD39658CAF5CC24925bc8e62459087b88", // حساب مرتبط با شبکه اصلی اتریوم
      "eip155:56:0xfe9A29fbD39658CAF5CC24925bc8e62459087b88", // حساب مرتبط با Binance Smart Chain
      "eip155:5:0xfe9A29fbD39658CAF5CC24925bc8e62459087b88", // حساب مرتبط با Goerli Testnet
      "eip155:97:0xfe9A29fbD39658CAF5CC24925bc8e62459087b88", // حساب مرتبط با Binance Testnet
    ],
  },
};

// تابع برای اتصال به کیف پول از طریق WalletConnect
export const connectWallet = async () => {
  try {
    // شناسه پروژه (Project ID) که از WalletConnect دریافت می‌شود
    const projectId = "your-project-id"; // حتماً شناسه پروژه خود را اینجا قرار دهید

    // بررسی اینکه آیا شناسه پروژه تعریف شده است
    if (!projectId) {
      throw new Error("Project ID is not defined");
    }

    // ایجاد یک کلاینت WalletConnect با استفاده از SignClient
    const client = await SignClient.init({
      projectId, // شناسه پروژه
      relayUrl: "wss://relay.walletconnect.com", // آدرس WebSocket برای ارتباط با Relay
    });

    // برقراری اتصال و دریافت URI برای QR Code
    const { uri } = await client.connect({
      requiredNamespaces: namespaces, // فضاهای نام مورد نیاز
    });

    // اگر URI دریافت شد، آن را در کنسول نمایش داده و QR Code را باز کنید
    if (uri) {
      console.log("WalletConnect URI:", uri);
      QRCodeModal.open(uri); // نمایش QR Code برای اتصال به کیف پول
    }
  } catch (error) {
    // مدیریت خطاها در صورت بروز مشکل در اتصال
    console.error("Error connecting to WalletConnect:", error);
  }
};
