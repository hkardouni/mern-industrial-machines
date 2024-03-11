import React from "react";
import {Link} from 'react-router-dom'
import Signin from "./signin";

export default function Signup() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl text-center font-semibold my-7 text-gray-700">فرم ثبت نام</h1>
      <form action="" className="rtl-form flex flex-col gap-4">
        <input type="text" placeholder="نام کاربری" className="border p-3 rounded-lg hover:border-gray-400" id="username"/>
        <input type="text" placeholder="ایمیل" className="border p-3 rounded-lg hover:border-gray-400" id="email"/>
        <input type="text" placeholder="رمز عبور" className="border p-3 rounded-lg hover:border-gray-400" id="password"/>
        <button className="bg-green-500 hover:opacity-90 rounded-lg p-3 border font-semibold text-gray-700 disabled:opacity-75">ثبت نام</button>
        <button className="bg-red-500 hover:opacity-90 rounded-lg p-3 border font-semibold text-gray-700 disabled:opacity-75">ثبت نام از طریق گوگل</button>
      </form>
      <div className="rtl-form flex gap-2 mt-5 text-xs">
        <p>قبلا ثبت نام کرده اید؟</p>
        <Link to='/sign-in'>
          <span className="text-blue-700">وارد شوید</span>
        </Link>
      </div>
    </div>
  );
}
