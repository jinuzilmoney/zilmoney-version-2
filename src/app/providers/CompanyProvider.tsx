"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Company } from "@/src/shared/types/company";

interface CompanyContextType {
  currentCompany: Company | null;
  companies: Company[];
  invitedCompanies: Company[];
  switchCompany: (companyId: string) => void;
  addCompany: (company: Omit<Company, "id" | "createdAt">) => Company;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  removeInvitedAccess: (id: string) => void;
  getMyCompanies: () => Company[];
  getAllCompanies: () => Company[];
  hasSelectedCompany: boolean;
  clearSelectedCompany: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

const INITIAL_COMPANIES: Company[] = [
  {
    id: "1",
    name: "Jas Mon",
    status: "owned",
    description: "Company Account",
    isParent: true,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "C2",
    status: "owned",
    description: "Company Account",
    createdAt: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "3",
    name: "C3",
    status: "owned",
    description: "Company Account",
    createdAt: "2024-03-01T00:00:00.000Z",
  },
  {
    id: "4",
    name: "C4",
    status: "owned",
    description: "Company Account",
    createdAt: "2024-04-01T00:00:00.000Z",
  },
  {
    id: "5",
    name: "C5",
    status: "owned",
    description: "Company Account",
    createdAt: "2024-05-01T00:00:00.000Z",
  },
  {
    id: "6",
    name: "TEST 1",
    status: "owned",
    description: "Company Account",
    createdAt: "2024-06-01T00:00:00.000Z",
  },
];

const INITIAL_INVITED: Company[] = [
  {
    id: "inv-1",
    name: "VISA",
    status: "invited",
    description: "Invited Company",
    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "inv-2",
    name: "REz",
    status: "invited",
    description: "Invited Company",
    createdAt: "2024-02-15T00:00:00.000Z",
  },
];

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [invitedCompanies, setInvitedCompanies] =
    useState<Company[]>(INITIAL_INVITED);
  const [isLoaded, setIsLoaded] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const savedCurrentId = localStorage.getItem("zilmoney-current-company-id");
    const savedCompanies = localStorage.getItem("zilmoney-companies");
    const savedInvited = localStorage.getItem("zilmoney-invited-companies");

    let loadedCompanies = INITIAL_COMPANIES;
    let loadedInvited = INITIAL_INVITED;

    if (savedCompanies) {
      try {
        loadedCompanies = JSON.parse(savedCompanies);
        setCompanies(loadedCompanies);
      } catch {
        // ignore
      }
    }

    if (savedInvited) {
      try {
        loadedInvited = JSON.parse(savedInvited);
        setInvitedCompanies(loadedInvited);
      } catch {
        // ignore
      }
    }

    if (savedCurrentId) {
      const allCompanies = [...loadedCompanies, ...loadedInvited];
      const found = allCompanies.find((c: Company) => c.id === savedCurrentId);
      if (found) {
        setCurrentCompany(found);
      }
    }

    setIsLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (isLoaded) {
      if (currentCompany) {
        localStorage.setItem("zilmoney-current-company-id", currentCompany.id);
      }
      localStorage.setItem("zilmoney-companies", JSON.stringify(companies));
      localStorage.setItem(
        "zilmoney-invited-companies",
        JSON.stringify(invitedCompanies),
      );
    }
  }, [currentCompany, companies, invitedCompanies, isLoaded]);

  const switchCompany = (companyId: string) => {
    const allCompanies = [...companies, ...invitedCompanies];
    const company = allCompanies.find((c) => c.id === companyId);
    if (company) {
      setCurrentCompany(company);
    }
  };

  const addCompany = (
    companyData: Omit<Company, "id" | "createdAt">,
  ): Company => {
    const newCompany: Company = {
      ...companyData,
      id: `comp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCompanies((prev) => [...prev, newCompany]);
    return newCompany;
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    const companyIndex = companies.findIndex((c) => c.id === id);
    if (companyIndex !== -1) {
      const updatedCompanies = [...companies];
      updatedCompanies[companyIndex] = {
        ...updatedCompanies[companyIndex],
        ...updates,
      };
      setCompanies(updatedCompanies);
      if (currentCompany?.id === id) {
        setCurrentCompany({ ...currentCompany, ...updates });
      }
      return;
    }

    const invitedIndex = invitedCompanies.findIndex((c) => c.id === id);
    if (invitedIndex !== -1) {
      const updatedInvited = [...invitedCompanies];
      updatedInvited[invitedIndex] = {
        ...updatedInvited[invitedIndex],
        ...updates,
      };
      setInvitedCompanies(updatedInvited);
    }
  };

  const removeInvitedAccess = (id: string) => {
    setInvitedCompanies((prev) => prev.filter((c) => c.id !== id));
    if (currentCompany?.id === id) {
      setCurrentCompany(null);
      localStorage.removeItem("zilmoney-current-company-id");
    }
  };

  const getMyCompanies = () => companies;
  const getAllCompanies = () => [...companies, ...invitedCompanies];

  const clearSelectedCompany = () => {
    setCurrentCompany(null);
    localStorage.removeItem("zilmoney-current-company-id");
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <CompanyContext.Provider
      value={{
        currentCompany,
        companies,
        invitedCompanies,
        switchCompany,
        addCompany,
        updateCompany,
        removeInvitedAccess,
        getMyCompanies,
        getAllCompanies,
        hasSelectedCompany: currentCompany !== null,
        clearSelectedCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
