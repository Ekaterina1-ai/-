export interface User {
  id: string;
  name: string;
  phone: string;
  balance: number;
  referrals: number;
  refCode: string;
  registrationDate: string;
}

export interface Offer {
  id: string;
  title: string;
  desc: string;
  code: string;
}
