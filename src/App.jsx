import React from "react";
import "./App.css";
import "./index.css";
import Employee from "./components/employee";
import EmployeeForm from "./components/EmployeeForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/add" element={<EmployeeForm mode="add" />} />
        <Route path="/edit/:id" element={<EmployeeForm mode="edit" />} />
        <Route path="*" element={<Employee />} />
      </Routes>
    </>
  );
}

export default App;
