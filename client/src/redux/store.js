import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./company";
import companiesListReducer from "./companiesList";

const store = configureStore({
  reducer: {
    company: companyReducer,
    companiesList: companiesListReducer,
  },
});

export default store;
