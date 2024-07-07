import React, { useState, useEffect } from 'react';
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('User');
  const [balance, setBalance] = useState(null);
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const [tg, setTg] = useState(null);

  useEffect(() => {
    const tgApp = window.Telegram?.WebApp;
    if (tgApp) {
      setTg(tgApp);
      tgApp.ready();
      
      // Fetch the user's Telegram data
      const user = tgApp.initDataUnsafe?.user;
      if (user) {
        setUsername(user.username || user.first_name || 'User');
      }
    }
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (userFriendlyAddress) {
        try {
          const response = await axios.get(`https://toncenter.com/api/v2/getAddressBalance`, {
            params: { address: userFriendlyAddress },
            headers: { 'X-API-Key': 'bb34ae05eef9acb2e365c0933ac436580d793c1c238c12dac61324d7eea3f352' }
          });
          setBalance(response.data.result);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [userFriendlyAddress]);

  const handleMainButton = () => {
    if (tg) {
      tg.MainButton.setText('CONNECTED!');
      tg.MainButton.show();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BOOST</h1>
        <h2>Welcome, {username} to BOOST</h2>
        <h3>Connect Wallet:</h3>
        <TonConnectButton />
        {balance !== null && (
          <p>Your TON Balance: {parseInt(balance) / 1e9} TON</p>
        )}
        <button onClick={handleMainButton} className="telegram-button">
          Show Telegram Button
        </button>
      </header>
    </div>
  );
}

export default App;