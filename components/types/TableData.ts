interface LentDashboardData {
  asset: {
    name: string;
    imgUrl: string;
    projectName: string;
  };
  due: string;
  duration: number;
  projectAddress: string;
  collateral: number;
  lentPrice: number;
  lendingDuration: number;
  tokenId: number;
  collateralRedeemable: boolean;
}

interface BorrowedDashboardData {
  asset: {
    name: string;
    imgUrl: string;
    projectName: string;
  };
  lender: string;
  due: string;
  duration: number;
  projectAddress: string;
  collateral: number;
  borrowedPrice: number;
  lendingDuration: number;
  returnable: true;
  tokenId: number;
}

export type { LentDashboardData, BorrowedDashboardData };
