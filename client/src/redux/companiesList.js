import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  companiesList: [],
};

export const taskListSlice = createSlice({
  name: "companiesList",
  initialState,
  reducers: {
    setCompaniesList: (state, action) => {
      state.companiesList = action.payload;
    },
    addCompaniesList: (state, action) => {
      state.companiesList.push(action.payload);
    },
    deleteCompaniesList: (state, action) => {
      state.companiesList = state.companiesList.filter((task) => {
        return task.id !== action.payload.id;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCompaniesList, addCompaniesList, deleteCompaniesList } =
  taskListSlice.actions;

export default taskListSlice.reducer;
