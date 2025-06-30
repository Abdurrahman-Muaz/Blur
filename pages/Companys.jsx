import React from "react";
import { useState } from "react";
import Navigation from "../src/components/Navigation";
import { useCompany } from "../src/context/CompanyContext";
import CompanyModal from "../src/components/CompanyModal";
import CompanyDetail from "../src/components/CompanyDetail";

const Companys = () => {
  const { company, ekleCompany } = useCompany();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi state'i ekledim

  const handleCompanyAdded = (newCompany) => {
    ekleCompany(newCompany);
    console.log("Yeni şirket eklendi:", newCompany);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredCompanies = company.filter(
    (comp) =>
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comp.phone && comp.phone.includes(searchTerm))
  );

  return (
    <div>
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Şirketler</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold cursor-pointer text-sm"
            onClick={() => setModalOpen(true)}
          >
            Yeni Şirket Ekle
          </button>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Şirket adı veya e-posta ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-cyan-800"
          />
          {searchTerm && (
            <button
              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Şirket
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bakiye
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="hidden sm:inline">Oluşturulma</span>
                    <span className="sm:hidden">Tarih</span>
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="hidden sm:inline">Doğrulandı</span>
                    <span className="sm:hidden">Doğr.</span>
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-3 py-6 text-center text-gray-500"
                    >
                      {searchTerm ? (
                        <div className="text-sm">
                          "{searchTerm}" ile eşleşen şirket bulunamadı.
                        </div>
                      ) : (
                        <>
                          <div className="text-sm">
                            Henüz eklenmiş bir şirket yok.
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            "Yeni Şirket Ekle" butonuna basarak
                            başlayabilirsiniz.
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredCompanies.map((comp) => (
                    <tr
                      key={comp.id}
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                        searchTerm &&
                        comp.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                          ? "bg-yellow-50"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedCompany(comp);
                        setIsDetailModalOpen(true);
                      }}
                    >
                      <td className="px-2 py-2">
                        <div className="text-xs font-medium text-gray-900 truncate max-w-[60px] sm:max-w-[120px]">
                          {comp.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[60px] sm:max-w-[120px]">
                          {comp.email}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="text-xs font-medium text-green-600 truncate max-w-[50px] sm:max-w-[80px]">
                          ₺
                          {parseFloat(comp.balance).toLocaleString("tr-TR", {
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="text-xs text-gray-900 truncate max-w-[50px] sm:max-w-[80px]">
                          {formatDate(comp.createdAt).substring(0, 10)}
                        </div>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span
                          className={`inline-flex text-xs rounded-full ${
                            comp.verified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          <span className="hidden sm:inline px-2 py-1">
                            {comp.verified ? "Evet" : "Hayır"}
                          </span>
                          <span className="sm:hidden h-4 w-4 flex items-center justify-center">
                            {comp.verified ? "✓" : "✗"}
                          </span>
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span
                          className={`inline-flex text-xs rounded-full ${
                            comp.active
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <span className="hidden sm:inline px-2 py-1">
                            {comp.active ? "Aktif" : "Pasif"}
                          </span>
                          <span className="sm:hidden h-4 w-4 flex items-center justify-center">
                            {comp.active ? "A" : "P"}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CompanyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCompanyAdded={handleCompanyAdded}
      />
      <CompanyDetail
        company={selectedCompany}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};

export default Companys;
