import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  company: {},
};

export const taskListSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    deleteCompanyOffice: (state, action) => {
      state.company.offices = state.company.offices.filter((company) => {
        return company._id !== action.payload;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCompany, deleteCompanyOffice } = taskListSlice.actions;

export default taskListSlice.reducer;
