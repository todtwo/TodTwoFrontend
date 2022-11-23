import axios from "axios";

function GetNFTsByContract(contract: String) {
  axios
    .get(
      `https://api-testnets.simplehash.com/api/v0/nfts/ethereum-goerli/${contract}`,
      {
        headers: {
          "X-API-KEY":
            "wattanatawee_sk_c6b59475-e27f-46b8-b506-57bb41e67f85_82tcdyh0wq6fyfm8",
        },
      }
    )
    .then((resp) => {
      console.log(resp.data);
    });
}

export { GetNFTsByContract };
