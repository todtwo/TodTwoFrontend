import { ethers } from "ethers";
import React, { useState, createContext, useEffect } from "react";
import NFT_abi from "../abi/Thuntwo_abi.json"
import TodTwo_abi from "../abi/TodTwo_abi.json"
export const EthContext = createContext();

const EthContextProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [ThunTwoContract, setThunTwoContract] = useState(null);
  const [FahTwoContract, setFahTwoContract] = useState(null);
  const [ClarkTwoContract, setClarkTwoContract] = useState(null);
  const [TodTwoContract, setTodTwoContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const ThunTwoAddress = "0x40e3b499A062153158C90572f378132Bab6AB07B"
  const FahTwoAddress = "0x13502Ea6F6D14f00025a3AdDe02BFf050be24532"
  const ClarkTwoAddress = "0xFA6b6B5Eb53F951Bc4CfC607DbeC230DDE638eD5"
  const TodTwoAddress = "0x81b69493Da8c5F6aE84e9c574044c4a241688FCa"

  const updateEthers = () => {
    //console.log(typeof(NFT_abi))
    //console.log(NFT_abi)
    let tmpProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tmpProvider);
    let tmpSigner = tmpProvider.getSigner();
    setSigner(tmpSigner);
    let tmpThunTwo = new ethers.Contract(ThunTwoAddress,NFT_abi,tmpSigner)
    setThunTwoContract(tmpThunTwo) 
    setFahTwoContract(new ethers.Contract(FahTwoAddress,NFT_abi,tmpSigner)) 
    setClarkTwoContract(new ethers.Contract(ClarkTwoAddress,NFT_abi,tmpSigner)) 
    setTodTwoContract(new ethers.Contract(TodTwoAddress,TodTwo_abi,tmpSigner)) 
  };

  const clearEthers = () => {
    setProvider(null);
    setSigner(null);
    setThunTwoContract(null) 
    setFahTwoContract(null) 
    setClarkTwoContract(null) 
    setTodTwoContract(null)
  }

  const connectHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          //console.log(result)
          if (result.length !== 0) {
            setDefaultAccount(result[0]);
            updateEthers()
            
          } else {
            setDefaultAccount(null);
            clearEthers()
          }
          setIsReady(true);
        });
    } else {
      alert("install MetaMask");
    }
  };

  const AddressToProjectMap = {
    [ThunTwoAddress]: "ThunTwo",
    [FahTwoAddress]: "FahTwo",
    [ClarkTwoAddress]: "ClarkTwo",
  };

  const AddressToContract = {
    [ThunTwoAddress]: ThunTwoContract,
    [FahTwoAddress]: FahTwoContract,
    [ClarkTwoAddress]: ClarkTwoContract,
  }

  const getNFTImage = async (contractAddress,index) => {
    const contract = AddressToContract[contractAddress]
    if (contract) {
      try {
        const uri = await ThunTwoContract.tokenURI(index);
        console.log(uri);
        const response = await axios.get(
          `https://ipfs.io/ipfs/${uri.replace("ipfs://", "")}`
        );
        const imgIpfsPath = response.data.image.replace("ipfs://", "")
        const imgHttpsPath = `https://ipfs.io/ipfs/${imgIpfsPath}`
        return imgHttpsPath
      } catch (error) {
        console.log(error)
      }
    }else{
      console.log("contract undefined")
    }
  }
  return (
    <EthContext.Provider
      value={{
        defaultAccount,
        setDefaultAccount,
        ThunTwoContract,
        setThunTwoContract,
        FahTwoContract,
        setFahTwoContract,
        ClarkTwoContract,
        setClarkTwoContract,
        TodTwoContract,
        setTodTwoContract,
        provider,
        setProvider,
        signer,
        setSigner,
        connectHandler,
        updateEthers,
        isReady,
        setIsReady,
        AddressToProjectMap,
        AddressToContract,
        getNFTImage
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export default EthContextProvider;
