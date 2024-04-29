import React, { useEffect } from "react";
import { addEmployee, updateEmployee } from "../features/ems/emsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";

const EmployeeForm = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const employees = useSelector((state) => state.ems);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
      setValue("name", employeeToEdit.name);
      setValue("birthDate", employeeToEdit.birthDate);
      setValue("department", employeeToEdit.department);
      setValue("experience", employeeToEdit.experience);
    }
  }, [mode, employees, params.id]);

  return (
    <div className="container">
      <h1>{mode === "add" ? "Add Employee" : "Edit Employee"}</h1>
      <div className="row mt-5">
        <div className="col-md-6">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "Name should contain only alphabets",
                  },
                })}
              />
              {errors.name && (
                <Form.Text className="text-danger">
                  {errors.name.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                max={new Date()?.toISOString()?.slice(0, 10)}
                {...register("birthDate", { required: true })}
              />
              {errors.birthDate && (
                <Form.Text className="text-danger">
                  Birth date is required
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </div>
        <div className="col-md-6">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                {...register("department", { required: true })}
              />
              {errors.department && (
                <Form.Text className="text-danger">
                  Department is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter experience"
                {...register("experience", { required: true })}
              />
              {errors.experience && (
                <Form.Text className="text-danger">
                  Experience is required
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </div>
        <div className="col-md-12">
          <Button
            variant="primary"
            onClick={handleSubmit((data) => {
              if (mode === "add") {
                dispatch(addEmployee(data));
              } else {
                dispatch(updateEmployee({ id: params.id, ...data }));
              }
              navigate("/");
            })}
          >
            {mode === "add" ? "Add Employee" : "Update Employee"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
