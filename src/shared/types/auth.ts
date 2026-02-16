export type SocialProvider =
  | 'google'
  | 'linkedin'
  | 'microsoft'
  | 'xero'
  | 'amazon'
  | 'office365'
  | 'freshbooks'
  | 'twitter'
  | 'intuit';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
  companyName: string;
  selectedFeatures: string[];
  createdAt: string;
  provider?: SocialProvider | 'email';
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  companyName: string;
  couponCode?: string;
}
