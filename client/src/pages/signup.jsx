"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataSaved, setDataSaved] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        console.log(error);
        return;
      }
      setDataSaved(true);
      setLoading(false);
      setError(null);
      // navigate("/sign-in");
      console.log(
        `dataSaved: ${dataSaved}, loading: ${loading}, error: ${error}`
      );
    } catch (err) {
      setLoading(false);
      setError(err.message);
      setDataSaved(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-2xl text-center font-semibold my-7 text-gray-700">
          فرم ثبت نام
        </h1>
        <form onSubmit={handleSubmit} className="rtl-form flex flex-col gap-4">
          <input
            type="text"
            placeholder="نام کاربری"
            className="border p-3 rounded-lg hover:border-gray-400"
            id="username"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="ایمیل"
            className="border p-3 rounded-lg hover:border-gray-400"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="border p-3 rounded-lg hover:border-gray-400"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-green-500 hover:opacity-90 rounded-lg p-3 border font-semibold text-gray-700 disabled:opacity-75"
          >
            {loading ? <span>لطفا منتظر بمانید...</span> : <span>ثبت نام</span>}
          </button>
          <button className="bg-red-500 hover:opacity-90 rounded-lg p-3 border font-semibold text-gray-700 disabled:opacity-75">
            ثبت نام از طریق گوگل
          </button>
        </form>
        <div className="rtl-form flex gap-2 mt-5 text-xs">
          <p>قبلا ثبت نام کرده اید؟</p>
          <Link to="/sign-in">
            <span className="text-blue-700">وارد شوید</span>
          </Link>
        </div>
      </div>
      {dataSaved && (
        <Alert severity="success" color="success">
          This is a success Alert with an encouraging title.
        </Alert>
      )}
    </>
  );
}
