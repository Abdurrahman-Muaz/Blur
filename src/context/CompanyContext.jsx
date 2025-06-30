import { createContext, useContext, useState } from "react"; //

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState([]);

  // ekleme

  const ekleCompany = (company) => {
    setCompany((prev) => [...prev, company]);
  };

  //   güncelleme

  const guncelleCompany = (id, guncelle) => {
    setCompany((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, ...guncelle } : company
      )
    );
  };

  // silme

  const silCompany = (id) => {
    setCompany((prev) => prev.filter((company) => company.id !== id));
  };

  // bul oku

  const bulCompany = (id) => {
    return company.find((company) => company.id === id);
  };

  // state ve fonksiyonları dön

  return (
    <CompanyContext.Provider
      value={{ company, ekleCompany, guncelleCompany, silCompany, bulCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
