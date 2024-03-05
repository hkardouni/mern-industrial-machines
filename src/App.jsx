import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import About from "./pages/about";
import Profile from "./pages/profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
