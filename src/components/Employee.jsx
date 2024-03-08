import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeEmployee } from "../features/ems/emsSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";

const Employee = () => {
  const employees = useSelector((state) => state.ems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to confirm delete operation
  const confirmDelete = (id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeEmployee(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // Function to format birth date to dd/MM/yyyy
  const formatBirthDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <>
      <h1>
        <span className="blue"></span>Employee<span className="blue"></span>{" "}
        <span className="yellow">Table</span>
      </h1>

      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>Name</h1>
            </th>
            <th>
              <h1>Birth Date</h1>
            </th>
            <th>
              <h1>Department</h1>
            </th>
            <th>
              <h1>Experience</h1>
            </th>
            <th>
              <h1>Actions</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{formatBirthDate(employee.birthDate)}</td>
              <td>{employee.department}</td>
              <td>{employee.experience}</td>
              <td>
                <i
                  onClick={() => {
                    navigate(`/edit/${employee.id}`, { state: { employee } });
                  }}
                  className="fa-solid fa-pen-to-square text-warning ms-3 custom-icon"
                ></i>
                <i
                  onClick={() => confirmDelete(employee.id)}
                  className="fa-solid fa-trash text-danger ms-4 custom-icon"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add">
        <button type="button" className="btn btn-outline-success mt-3">
          Add Employee
        </button>
      </Link>
    </>
  );
};

export default Employee;
