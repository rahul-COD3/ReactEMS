import { createSlice, nanoid } from "@reduxjs/toolkit";

// Initial state of the slice
const initialState = {
  ems: [
    {
      id: "1",
      name: "Rambo",
      birthDate: "2024-01-31",
      department: "EMS",
      experience: 5,
    },
    {
      id: "2",
      name: "John",
      birthDate: "2024-01-31",
      department: "EMS",
      experience: 10,
    },
    {
      id: "3",
      name: "Doe ",
      birthDate: "2024-01-31",
      department: "EMS",
      experience: 15,
    },
  ],
};

// Slice for employee management system
const emsSlice = createSlice({
  name: "ems",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const employee = {
        id: nanoid(),
        name: action.payload.name,
        birthDate: action.payload.birthDate,
        department: action.payload.department,
        experience: action.payload.experience,
      };
      state.ems.push(employee);
    },

    // Remove employee
    removeEmployee: (state, action) => {
      state.ems = state.ems.filter(
        (employee) => employee.id !== action.payload
      );
    },

    // Update employee
    updateEmployee: (state, action) => {
      const index = state.ems.findIndex(
        (employee) => employee.id === action.payload.id
      );
      state.ems[index] = action.payload;
    },
  },
});

export const { addEmployee, removeEmployee, updateEmployee } = emsSlice.actions;
export default emsSlice.reducer;
