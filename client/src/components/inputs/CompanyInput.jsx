import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useAppSelector } from "../../redux/hooks";

export default function PhoneCodeInput({ formik, name, label }) {
  const { companiesList } = useAppSelector((state) => state.companiesList);

  return (
    <TextField
      select
      fullWidth
      name={name}
      label={label}
      variant="outlined"
      margin="dense"
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={Boolean(formik.errors[name]) && formik.touched[name]}
      helperText={formik.errors[name]}
    >
      {companiesList.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
