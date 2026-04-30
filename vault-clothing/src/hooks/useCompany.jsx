import { useState, useEffect, createContext, useContext } from 'react';
import { getCompany } from '../api/client';

const CompanyContext = createContext(null);

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompany()
      .then(setCompany)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <CompanyContext.Provider value={{ company, loading }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => useContext(CompanyContext);
