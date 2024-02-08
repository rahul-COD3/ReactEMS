import React, { useEffect, useState } from "react";
import { addEmployee, updateEmployee } from "../features/ems/emsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EmployeeForm = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const employees = useSelector((state) => state.ems);

  // Declare state variables for managing employee data
  const [employee, setEmployee] = useState({
    name: "",
    birthDate: "",
    department: "",
    experience: 0,
  });

  // State variables for managing error messages
  const [errors, setErrors] = useState({
    name: "",
    birthDate: "",
    department: "",
    experience: 0,
  });

  // Fetch employee data to edit if mode is "edit"
  useEffect(() => {
    if (mode === "edit") {
      const employeeToEdit = employees.find((emp) => emp.id === params.id);
      if (!employeeToEdit) {
        Swal.fire({
          icon: "error",
          title: "Employee not found!",
          text: "The employee you are trying to edit does not exist.",
          showConfirmButton: true,
        }).then(() => {
          navigate("/");
        });
        return;
      }
      setEmployee(employeeToEdit);
    }
  }, [mode, employees, params.id]);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "experience") {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: parseInt(value),
      }));
      return;
    }
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  // Handle add or edit operation
  const handleOperation = () => {
    // Reset errors
    setErrors({
      name: "",
      birthDate: "",
      department: "",
      experience: 0,
    });

    // Define regex patterns for each field
    const nameRegex = /^[A-Za-z\s]+$/;
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const experienceRegex = /^[0-9]+$/;

    // Validate employee name, birth date, department, and experience
    if (!nameRegex.test(employee.name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter only letters and spaces.",
      }));
      return;
    }

    if (!birthDateRegex.test(employee.birthDate)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birthDate: "Please enter valid DOB in yyyy-MM-dd format.",
      }));
      return;
    }

    if (employee.department === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        department: "Please enter department name.",
      }));
      return;
    }

    if (
      !experienceRegex.test(employee.experience) ||
      employee.experience > 60
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        experience: "Please enter a valid experience. Must be in range 0-60.",
      }));
      return;
    }

    // If all fields pass validation, dispatch the appropriate action
    if (mode === "add") {
      dispatch(addEmployee(employee));
    } else if (mode === "edit") {
      dispatch(updateEmployee(employee));
    }
    navigate("/");
  };

  return (
    <div className="container">
      <h1>{mode === "add" ? "Add Employee" : "Edit Employee"}</h1>
      <div className="form-group row mt-4">
        <div className="col">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className={`form-control ${errors.name && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="col">
          <label>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={employee.birthDate}
            onChange={handleChange}
            className={`form-control ${errors.birthDate && "is-invalid"}`}
            max={new Date()?.toISOString()?.slice(0, 10)}
          />
          <div className="invalid-feedback">{errors.birthDate}</div>
        </div>
      </div>
      <div className="form-group row mt-4">
        <div className="col">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            className={`form-control ${errors.department && "is-invalid"}`}
          />
          <div className="invalid-feedback">{errors.department}</div>
        </div>
        <div className="col">
          <label>Experience</label>
          <input
            type="number"
            name="experience"
            value={employee.experience}
            onChange={handleChange}
            className={`form-control ${errors.experience && "is-invalid"}`}
            min={0}
          />
          <div className="invalid-feedback">{errors.experience}</div>
        </div>
      </div>
      {mode === "add" ? (
        <button onClick={handleOperation} className="btn btn-primary mt-4">
          Add Employee
        </button>
      ) : (
        <button onClick={handleOperation} className="btn btn-warning mt-4">
          Update Employee
        </button>
      )}
    </div>
  );
};

export default EmployeeForm;
