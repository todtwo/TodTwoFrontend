import { ethers } from "ethers";
import React, { useState, createContext, useEffect } from "react";

export const EthContext = createContext();

const EthContextProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [ThunTwocontract, setThunTwoContract] = useState(null);
  const [FahTwoContract, setFahTwoContract] = useState(null);
  const [ClarkTwoContract, setClarkTwoContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const updateEthers = () => {
    let tmpProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tmpProvider);
    let tmpSigner = tmpProvider.getSigner();
    setSigner(tmpSigner);
  };

  const connectHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setDefaultAccount(result[0]);
          setIsReady(true);
        });
    } else {
      alert("install MetaMask");
    }
  };

  return (
    <EthContext.Provider
      value={{
        defaultAccount,
        setDefaultAccount,
        ThunTwocontract,
        setThunTwoContract,
        FahTwoContract,
        setFahTwoContract,
        ClarkTwoContract,
        setClarkTwoContract,
        provider,
        setProvider,
        signer,
        setSigner,
        connectHandler,
        updateEthers,
        isReady,
        setIsReady,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthContextProvider;
