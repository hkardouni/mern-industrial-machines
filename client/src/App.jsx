import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import About from "./pages/about";
import Profile from "./pages/profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import CreateIndustry from "./components/CreateIndustry";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/create-industry" element={<CreateIndustry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
