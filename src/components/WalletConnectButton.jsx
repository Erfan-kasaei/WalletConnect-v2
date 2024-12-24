// کامپوننت WalletConnectButton یک دکمه برای اتصال به کیف پول دیجیتال ارائه می‌دهد.
// از useState برای مدیریت وضعیت آدرس کیف پول استفاده شده است.
import React, { useState } from "react";
import { connectWallet } from "../utils/walletConnect"; // تابعی برای مدیریت اتصال به کیف پول

// تعریف کامپوننت WalletConnectButton
const WalletConnectButton = () => {
  // تعریف state برای ذخیره آدرس کیف پول
  const [account, setAccount] = useState(null);

  // تابعی برای مدیریت اتصال به کیف پول
  const handleConnect = async () => {
    try {
      // فراخوانی تابع connectWallet برای اتصال به کیف پول
      const connectedAccount = await connectWallet();
      setAccount(connectedAccount); // ذخیره آدرس کیف پول در state
    } catch (error) {
      // مدیریت خطا در صورت عدم موفقیت در اتصال
      console.error("Connection failed:", error);
    }
  };

  // خروجی کامپوننت
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-center w-full">
      {account ? ( // اگر کیف پول متصل شده باشد
        <p className="text-green-600 font-semibold">
          Connected: {account} {/* نمایش آدرس کیف پول */}
        </p>
      ) : ( // اگر کیف پول متصل نشده باشد
        <button
          onClick={handleConnect} // فراخوانی تابع اتصال هنگام کلیک
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet {/* متن دکمه */}
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton; // خروجی گرفتن از کامپوننت