import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import countryCode from "../../constants/countryCode";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  code: {
    minWidth: 40,
    borderRight: "1px solid #ccc",
    paddingRight: 8,
    marginRight: 8,
  },
  customSelect: {
    "& .code": {
      borderRight: "none",
      paddingRight: 0,
      marginRight: 0,
    },
    "& .country": {
      display: "none",
    },
  },
}));

export default function PhoneCodeInput({ formik, name, label }) {
  const classes = useStyles();
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
      className={classes.customSelect}
    >
      {countryCode.map((option) => (
        <MenuItem key={option.code} value={option.dial_code}>
          <span className={`${classes.code} code`}>{option.dial_code}</span>
          <span className={`country`}>{option.name}</span>
        </MenuItem>
      ))}
    </TextField>
  );
}
