import { NftStatus } from "./NftStatus";
import { WhitelistedNftAdresses } from "./WhitelistedNftAdresses";

interface NftDetails {
  nftLPListIdx: string | string[] | undefined;
  nftAddress: WhitelistedNftAdresses;
  nftIdx: string;
  lender: string;
  deadline: Date;
  nftStatus: NftStatus;
  nftTokenId: number;

  condition: {
    collateralFee: string;
    borrowFee: string;
    lendingDuration: number;
  };
}

export type { NftDetails };
