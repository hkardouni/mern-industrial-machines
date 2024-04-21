import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";

export default function CreateIndustry() {
  const [industryName, setIndustryName] = useState("");
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);


  const fetchIndustries = async () => {
    const response = await fetch("/api/industries/all");
    const data = await response.json();
    setIndustries(data);
  };

  const handleIndustryChange = (e) => {
    setIndustryName(e.target.value);
  };

  const handleSelectIndustry = (industry) => {
    setSelectedIndustry(industry);
    setIndustryName(industry.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payLoad = {
      name: industryName,
    };

    const method = selectedIndustry ? "PUT" : "POST";
    const url = selectedIndustry
      ? `/api/industries/update/${selectedIndustry._id}`
      : "/api/industries/create";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });

    if (response.ok) {
      fetchIndustries();
      setIndustryName("");
      setSelectedIndustry(null);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  return (
    <main className="p-3 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">مدیریت صنایع</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row rtl-form"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="p-3 border rounded-lg hover:border-gray-400"
            placeholder="صنعت جدید"
            value={industryName}
            onChange={handleIndustryChange}
          />
          <button
            type="submit"
            className="p-3 font-semibold text-gray-700 bg-green-500 border rounded-lg hover:opacity-90 disabled:opacity-75"
          >
            {selectedIndustry ? "بروزرسانی" : "افزودن"}
          </button>
        </div>
      </form>
      <DataTable rows={industries} handleSelectRow={handleSelectIndustry}/>
    </main>
  );
}
