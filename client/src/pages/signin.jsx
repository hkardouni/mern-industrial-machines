"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);

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

      const res = await fetch("/api/auth/signin", {
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
      setSuccessLogin(true);
      setLoading(false);
      setError(null);
      e.target.reset();
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      setSuccessLogin(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-lg p-3 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-700 my-7">
          ورود
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rtl-form">
          <input
            type="text"
            placeholder="ایمیل"
            className="p-3 border rounded-lg hover:border-gray-400"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="p-3 border rounded-lg hover:border-gray-400"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="p-3 font-semibold text-gray-700 bg-green-500 border rounded-lg hover:opacity-90 disabled:opacity-75"
          >
            {loading ? <span>لطفا منتظر بمانید...</span> : <span>ورود</span>}
          </button>
        </form>
        <div className="flex gap-2 mt-5 text-xs rtl-form">
          <p>قبلا ثبت نام نکرده اید؟</p>
          <Link to="/sign-up">
            <span className="text-blue-700">حساب بسازید</span>
          </Link>
        </div>
      </div>
      {successLogin ? (
        <div className="rtl-form">
          <Alert
            sx={{
              fontFamily: "Tahoma",
            }}
            variant="outlined"
            severity="success"
            color="success"
            className="float-right mr-4 gap-2"
          >
            کاربر با موفقیت ایجاد شد
          </Alert>
        </div>
      ) : (
        <div className="rtl-form">
          <Alert
            sx={{
              fontFamily: "Tahoma",
            }}
            variant="outlined"
            severity="error"
            color="error"
            className="float-right mr-4 gap-2"
          >
            ورود ناموفق. لطفا مجددا تلاش کنید
          </Alert>
        </div>
      )}
    </>
  );
}
