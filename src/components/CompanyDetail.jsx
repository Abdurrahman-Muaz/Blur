import { useCompany } from "../context/CompanyContext";

const CompanyDetail = ({ company, isOpen, onClose }) => {
  const { guncelleCompany, silCompany } = useCompany();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleToggleStatus = () => {
    guncelleCompany(company.id, { active: !company.active });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Bu şirketi silmek istediğinizden emin misiniz?")) {
      silCompany(company.id);
      onClose();
    }
  };

  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Şirket Detayları
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Şirket Adı
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {company.title}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">
                  ID
                </label>
                <p className="text-sm text-gray-900 font-mono">{company.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Telefon
                </label>
                <p className="text-gray-900">{company.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">
                  E-posta
                </label>
                <p className="text-gray-900">{company.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Bakiye
                </label>
                <p className="text-lg font-semibold text-green-600">
                  {parseFloat(company.balance).toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
              </div>
            </div>

            <div className="pr-79 mb-10">
              <label className="block text-sm font-medium text-gray-500">
                Adres
              </label>
              <p className="text-gray-900 whitespace-pre-line">
                {company.address}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              <div>
                <label className="block text-sm font-medium text-gray-500 ">
                  Oluşturulma Tarihi
                </label>
                <p className="text-gray-900">{formatDate(company.createdAt)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Doğrulandı
                </label>
                <p className="text-gray-900">
                  {company.verified ? "Evet" : "Hayır"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Durum
                </label>
                <p className="text-gray-900">
                  {company.active ? "Aktif" : "Pasif"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between space-x-3">
              <div className="flex space-x-3">
                <button
                  onClick={handleToggleStatus}
                  className={`px-4 py-2 rounded-md text-white transition-colors cursor-pointer ${
                    company.active
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {company.active ? "Devre Dışı Bırak" : "Aktifleştir"}
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Sil
                </button>
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
