import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function CreateFunctionalities() {
  const [functionalities, setFunctionalities] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedFunctionality, setSelectedFunctionality] = useState(null)
  const [functionalityName, setFunctionalityName] = useState("");

  const fetchIndustries = async () => {
    fetch("/api/industries/all")
      .then((response) => response.json())
      .then((data) => setIndustries(data));
  };

  const fetchFunctionalities = async () => {
    fetch('/api/functionalities/all')
    .then((response) => response.json())
    .then((data) => setFunctionalities(data))
  }

  const handleInputChange = (e) => {
    setFunctionalityName(e.target.value);
  };

  const handleSelectedRow = (functionality) => {
    setSelectedFunctionality(functionality)
    setFunctionalityName(functionality.name)
  }

  useEffect(() => {
    fetchIndustries();
    fetchFunctionalities()
  }, []);

  return (
    <main className="p-3 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">مدیریت عملکردها</h1>
      <form className="flex flex-col sm:flex-row rtl-form">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="عملکرد دستگاه"
            className="p-3 border rounded-lg hover:border-gray-400"
            value={functionalityName}
            onChange={handleInputChange}
          />
          <select>
            {industries.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="p-3 font-semibold text-gray-700 bg-green-500 border rounded-lg hover:opacity-90 disabled:opacity-75"
          >
            ذخیره
          </button>
        </div>
      </form>
      <div className="rtl-form">
        <DataTable rows={functionalities} handleSelectRow={handleSelectedRow}/>
      </div>
    </main>
  );
}
