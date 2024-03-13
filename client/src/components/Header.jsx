import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import useOutsideClick from "./useOutsideClick";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, (event) => {
    event.stopPropagation();
    console.log("recieved");
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl  p-3">
        <div className="flex justify-between">
          <Link
            to="/sign-in"
            className="hidden lg:inline-block lg:ml-15 lg:mr-2 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
          >
            ورود
          </Link>
          <Link
            to="/sign-up"
            className="hidden lg:inline-block lg:ml-0 py-2 px-6 bg-green-300 hover:bg-green-500 text-sm text-gray-800 font-bold rounded-xl transition duration-200"
          >
            ثبت نام
          </Link>
        </div>
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Industrial</span>
            <span className="text-red-300">Machines</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="جستجو"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <div
          className={`navbar-menu relative z-50 ${isMenuOpen ? "" : "hidden"}`}
          ref={ref}
        >
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-xs py-6 px-6 bg-white border-l overflow-x-hidden transition-all">
            <div className="flex items-center mb-8">
              <button className="navbar-close" onClick={closeMenu}>
                {/* navbar close buttom */}
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <Link to="/" onClick={closeMenu}>
                  <li className="mb-1 block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-gray-700 rounded cursor-pointer">
                    خانه
                  </li>
                </Link>
                <Link to="/" onClick={closeMenu}>
                  <li className="mb-1 block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-gray-700 rounded cursor-pointer">
                    صنایع
                  </li>
                </Link>
                <Link to="/" onClick={closeMenu}>
                  <li className="mb-1 block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-gray-700 rounded cursor-pointer">
                    خدمات ما
                  </li>
                </Link>
                <Link to="/" onClick={closeMenu}>
                  <li className="mb-1 block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-gray-700 rounded cursor-pointer">
                    معرفی
                  </li>
                </Link>
                <Link to="about" onClick={closeMenu}>
                  <li className="mb-1 block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-gray-700 rounded cursor-pointer">
                    درباره ما
                  </li>
                </Link>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                <Link
                  to="/sign-in"
                  onClick={closeMenu}
                  className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl"
                >
                  ورود
                </Link>
                <Link
                  to="/sign-up"
                  onClick={closeMenu}
                  className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-gray-800 font-semibold bg-green-300 hover:bg-green-500  rounded-xl"
                >
                  ثبت نام
                </Link>
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2024</span>
              </p>
            </div>
          </nav>
        </div>
        <nav className="relative px-4 py-4 flex justify-between items-center">
          <div className="lg:hidden">
            {/* navbar close buttom */}
            <button
              className="navbar-burger flex items-center text-gray-800 p-3"
              onClick={toggleMenu}
            >
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden absolute transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:items-center lg:w-auto lg:space-x-8 lg:mr-0">
            <Link to="/about">
              <li className="text-sm text-gray-700 hover:text-gray-950 whitespace-nowrap hover:font-semibold">
                درباره ما
              </li>
            </Link>
            <Link to="/">
              <li className="text-sm text-gray-700 hover:text-gray-950 hover:font-semibold">
                معرفی
              </li>
            </Link>
            <Link to="/">
              <li className="text-sm text-gray-700 hover:text-gray-950 hover:font-semibold">
                خدمات
              </li>
            </Link>
            <Link to="/">
              <li className="text-sm text-gray-700 hover:text-gray-950 hover:font-semibold">
                صنایع
              </li>
            </Link>
            <Link to="/">
              <li className="text-sm text-gray-700 hover:text-gray-950 hover:font-semibold">
                خانه
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
