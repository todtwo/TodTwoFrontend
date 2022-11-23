import axios from "axios";
import { NftDetails } from "../types/NftDetails";

async function GetSingleNFTImage(nft: NftDetails) {
  try {
    
    const response = await axios.get(
      `https://api-testnets.simplehash.com/api/v0/nfts/assets?nft_ids=ethereum-goerli.${nft.nftAddress}.${nft.nftIdx}`,
      {
        headers: {
          "x-api-key":
          process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    // console.log(response.data.nfts)
    if(response.data.nfts.length > 0){
        const imgPath = response.data.nfts[0]["previews"]["image_large_url"]
        return imgPath
    }
    else "not found"
  } catch (error) {
    console.log(error)
  }
}

export { GetSingleNFTImage };
