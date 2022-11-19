interface LentDashboardData {
  name: string;
  imgUrl: string;
  projectName: string;
  borrower: string;
  due: string;
  duration: number;
  collateral: number;
  lentPrice: number;
}

interface BorrowedDashboardData {
  name: string;
  imgUrl: string;
  projectName: string;
  lender: string;
  due: string;
  duration: number;
  collateral: number;
  borrowedPrice: number;
  returnable: boolean;
}

export type { LentDashboardData, BorrowedDashboardData };
