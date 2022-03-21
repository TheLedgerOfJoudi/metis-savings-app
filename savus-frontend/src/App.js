
import './App.css';
import DepositButton from './components/depositButton';
import WithdrawButton from './components/withdrawButton';
import { useEffect, useState } from "react";
import { Header } from './components/Header';
import { InfoBox } from './components/InfoBox';

function App() {
  const [expiration, setExpiration] = useState(0);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
    }
  });

  const changeExpiration = (value) => {
    setExpiration(value);
  }

  return (
    <div className="App">
      {hasMetaMask ? <div>
        <Header />
        <DepositButton changeExpiration={changeExpiration}/>
        <WithdrawButton />
        <InfoBox expiration={expiration}/>
      </div>
        : "Please install MetaMask"}
    </div>
  );
}

export default App;
