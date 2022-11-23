import { NftStatus } from "./NftStatus";
import { WhitelistedNftAdresses } from "./WhitelistedNftAdresses";

interface NftDetailsWithImg{
  nftLPListIdx: string | string[] | undefined;
  nftAddress: WhitelistedNftAdresses;
  nftIdx: string;
  lender: string;
  collateralFee: string;
  borrowFee: string;
  lendingDuration: number;
  deadline: number;
  nftStatus: NftStatus;
  imgPath: string
}

export type { NftDetailsWithImg };
