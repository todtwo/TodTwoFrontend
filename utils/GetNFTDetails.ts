import axios from "axios";
import NFTData from "../types/NftData";
import { NftDetails } from "../types/NftDetails";
import { NftStatus } from "../types/NftStatus";

const GetNFTDetails = async (nfts: NftDetails[]) => {
  const url = `https://api-testnets.simplehash.com/api/v0/nfts/assets?nft_ids=${nfts.map(
    (nft) => {
      return `ethereum-goerli.${nft.nftAddress}.${nft.nftTokenId},`;
    }
  )}`;
  const resp = await axios.get(url, {
    headers: {
      "X-API-KEY":
        "wattanatawee_sk_c6b59475-e27f-46b8-b506-57bb41e67f85_82tcdyh0wq6fyfm8",
    },
  });
  return resp.data.nfts.map((e: NFTData) => {
    return convertToNFTData(e);
  });
};

const GetNFTDetailsV2 = async (nfts: any[]) => {
  const url = `https://api-testnets.simplehash.com/api/v0/nfts/assets?nft_ids=${nfts.map(
    (nft) => {
      return `${nft.nftId},`;
    }
  )}`;
  const resp = await axios.get(url, {
    headers: {
      "X-API-KEY":
        "wattanatawee_sk_c6b59475-e27f-46b8-b506-57bb41e67f85_82tcdyh0wq6fyfm8",
    },
  });
  return resp.data.nfts.map((e: NFTData) => {
    return convertToNFTData(e);
  });
};

interface NFTDataWithDetails {
  previewImgUrl: string;
  name: string;
  projectName: string;
  fullImgUrl: string;
  description: string;
  tokenId: number;
  address: string;

  condition: {
    collateralFee: string;
    borrowFee: string;
    lendingDuration: number;
  };
  nftLPListIdx: string | string[] | undefined;
  nftAddress: string;
  nftIdx: string;
  lender: string;
  // collateralFee: string;
  // borrowFee: string;
  // lendingDuration: number;
  deadline: number;
  nftStatus: NftStatus;
}

function mergeObject(a: any[], b: NFTData[]): NFTDataWithDetails[] {
  return a.map((e: any) => {
    var x: NFTData[] = b.filter((n: NFTData) => {
      return n.tokenId.toString() === e.nftTokenId.toString();
    });
    return { ...e, ...x[0] };
  });
}

function convertToNFTData(b: any): NFTData {
  var x: NFTData = {
    previewImgUrl: b.previews.image_small_url,
    projectName: b.collection.name,
    name: b.name,
    fullImgUrl: b.previews.image_large_url,
    description: b.description,
    tokenId: b.token_id,
    address: b.contract_address,
  };
  return x;
}

export { GetNFTDetails, convertToNFTData, mergeObject, GetNFTDetailsV2 };
export type { NFTDataWithDetails };
