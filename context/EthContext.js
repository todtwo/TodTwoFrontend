import { ethers } from "ethers";
import React, { useState, createContext, useEffect } from "react";

export const EthContext = createContext();

const EthContextProvider = ({ children }) => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const updateEthers = () => {
    let tmpProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tmpProvider);
    let tmpSigner = tmpProvider.getSigner();
    setSigner(tmpSigner)
  };
  const connectHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({method:"eth_requestAccounts"})
      .then((result) => {
          setDefaultAccount(result[0])
          console.log(typeof(result))
      })
    } else {
    }
  };
  return (
    <EthContext.Provider
      value={{
        defaultAccount,
        setDefaultAccount,
        contract,
        setContract,
        provider,
        setProvider,
        signer,
        setSigner,
        connectHandler
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthContextProvider;
