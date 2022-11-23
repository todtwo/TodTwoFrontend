import { NftStatus } from "./NftStatus";
import { WhitelistedNftAdresses } from "./WhitelistedNftAdresses";

interface NftDetails {
  nftLPListIdx: string | string[] | undefined;
  nftAddress: WhitelistedNftAdresses;
  nftIdx: string;
  lender: string;
  collateralFee: string;
  borrowFee: string;
  lendingDuration: number;
  deadline: Date;
  nftStatus: NftStatus;
}

export type { NftDetails };
