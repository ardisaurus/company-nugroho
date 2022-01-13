import React from "react";
import TextField from "@material-ui/core/TextField";

export default function TextInputs({ formik, name, label, type = "text" }) {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={type}
      variant="outlined"
      margin="dense"
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={Boolean(formik.errors[name]) && formik.touched[name]}
      helperText={formik.errors[name]}
    />
  );
}
