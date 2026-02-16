export type CompanyStatus = 'owned' | 'invited' | 'requested';

export interface Company {
  id: string;
  name: string;
  status: CompanyStatus;
  description?: string;
  logo?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  entityType?: string;
  dba?: string;
  formationDate?: string;
  industryType?: string;
  ein?: string;
  isParent?: boolean;
  createdAt?: string;
}
