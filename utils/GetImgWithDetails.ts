import axios from "axios";
import NFTData from "../types/NftData";
import { NftDetails } from "../types/NftDetails";
import { NftStatus } from "../types/NftStatus";

const GetImgWithDetails = async (
  nfts: NftDetails[],
  size: "small" | "medium" | "large"
) => {
  const url = `https://api-testnets.simplehash.com/api/v0/nfts/assets?nft_ids=${nfts.map(
    (nft) => {
      return `,ethereum-goerli.${nft.nftAddress}.${nft.nftIdx}`;
    }
  )}`;
  const res = await axios.get(url, {
    headers: {
      "X-API-KEY":
        "wattanatawee_sk_c6b59475-e27f-46b8-b506-57bb41e67f85_82tcdyh0wq6fyfm8",
    },
  });
  const imgPathList =  res.data.nfts.map((nft : any) : any => {
    if (size == "small") {
      return nft.previews.image_small_url;
    }else if(size=="medium"){
        return nft.previews.image_medium_url
    } else {
        nft.previews.image_large_url
    }
  });
  const detailsWithImg = nfts.reduce((result : any,nft,index)=>{
    result.push({...nft,imgPath:imgPathList[index]})
    return result
  },[])
  return detailsWithImg

};

export { GetImgWithDetails };