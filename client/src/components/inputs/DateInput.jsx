import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function DateInput({ formik, name, label }) {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          disableToolbar
          inputVariant="outlined"
          variant="inline"
          name={name}
          format="dd/MM/yyyy"
          margin="dense"
          label={label}
          InputProps={{ readOnly: true }}
          value={formik.values[name]}
          onChange={(val) => {
            formik.setFieldValue(name, val);
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      {Boolean(formik.errors[name]) && formik.touched[name]
        ? formik.errors[name]
        : null}
    </>
  );
}
