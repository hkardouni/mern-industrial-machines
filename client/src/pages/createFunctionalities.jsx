import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function CreateFunctionalities() {
  const [functionalities, setFunctionalities] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [industryMapping, setIndustryMapping] = useState({})
  const [selectedFunctionality, setSelectedFunctionality] = useState(null);
  const [formData, setFormData] = useState({ name: "", industry: "" });
  const [cancelEdit, setCancelEdit] = useState(false)

  const fetchIndustries = async () => {
    const response = await fetch("/api/industries/all")
    const data = await response.json()
    setIndustries(data)
      const mapping = data.reduce((acc, current) => ({
        ...acc,
        [current._id]: current.name,
      }), {});
      setIndustryMapping(mapping);
  };

  const fetchFunctionalities = async () => {
    fetch("/api/functionalities/all")
      .then((response) => response.json())
      .then((data) => setFunctionalities(data));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectedRow = (functionality) => {
    setSelectedFunctionality(functionality);
    setFormData({ name: functionality.name, industry: functionality.industry });
    setCancelEdit(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedFunctionality ? "PUT" : "POST";
    const url = selectedFunctionality
      ? `/api/functionalities/${selectedFunctionality._id}`
      : "/api/functionalities/create";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      fetchFunctionalities();
      setSelectedFunctionality(null);
      setFormData({ name: "", industry: "" });
    }
  };

  const handleCancelEdit = () => {
    setCancelEdit(false)
    setSelectedFunctionality(null)
    setFormData({ name: "", industry: "" });
  }
  useEffect(() => {
    fetchIndustries();
    fetchFunctionalities();
  }, []);

  return (
    <main className="p-3 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        مدیریت عملکردها
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row rtl-form"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            name="name"
            placeholder="عملکرد دستگاه"
            className="p-3 border rounded-lg hover:border-gray-400"
            value={formData.name}
            onChange={handleInputChange}
          />
          <select
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="p-3 hover:border-gray-400 cursor-pointer"
          >
            {industries.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="p-3 font-semibold text-gray-700 bg-green-500 border rounded-lg hover:opacity-90 disabled:opacity-75"
          >
            {
                selectedFunctionality ? 'ویرایش' : 'ذخیره'
            }
          </button>
          <button disabled={!cancelEdit} onClick={handleCancelEdit} className="p-3 font-semibold text-gray-900 bg-red-400 border rounded-lg hover:opacity-90 disabled:bg-gray-300">
            لغو تغییرات
          </button>
        </div>
      </form>
      <div className="rtl-form">
        <DataTable rows={functionalities} handleSelectRow={handleSelectedRow} dependency='صنعت' dependencyType='industry' industryMapping={industryMapping}/>
      </div>
    </main>
  );
}
