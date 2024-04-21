import React, { useEffect, useState } from "react";

export default function CreateListing() {
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [functionalities, setFunctionalities] = useState([]);

  const fetchIndustries = async () => {
    await fetch("/api/industries/all")
      .then((response) => response.json())
      .then((data) => setIndustries(data));
  };

  useEffect(() => {
    fetchIndustries();
    console.log(industries);
  }, []);

  useEffect(() => {
    if (selectedIndustry) {
      
    }
  },[functionalities])

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">ثبت آگهی جدید</h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="عنوان آگهی"
            className="border p-3 rounded-lg"
            id="title"
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            type="text"
            placeholder="شرح آگهی"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <select
            id="industries"
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            {industries.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            id="functionalities"
          >
            {functionalities.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </main>
  );
}
