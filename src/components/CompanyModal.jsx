import React, { useState } from "react";

const CompanyModal = ({ isOpen, onClose, onCompanyAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    phone: "",
    email: "",
    balance: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Şirket adı gereklidir";
    }

    const phoneRegex = /^\+90\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Telefon numarası +90 ile başlayan 12 haneli olmalıdır";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (!formData.balance || parseFloat(formData.balance) < 0) {
      newErrors.balance = "Geçerli bir bakiye giriniz";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adres gereklidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Form Data:", formData);

    const newCompany = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      verified: true,
      active: true,
    };

    onCompanyAdded(newCompany);
    onClose();
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    Object.keys(errors).length === 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white opacity-95 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-950  rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Yeni Şirket Ekle</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Şirket Adı
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Telefon</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
                placeholder="+90 ile başlayan 12 haneli numara yazınız. Örneğin: +905455990170"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">E-posta</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bakiye</label>
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {errors.balance && (
                <p className="text-red-500 text-xs mt-1">{errors.balance}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Adres</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                required
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md  cursor-pointer"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-4 py-2 rounded-md cursor-pointer ${
                  isFormValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-pointer"
                }`}
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
