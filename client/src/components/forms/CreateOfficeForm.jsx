import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextInputs from "../inputs/TextInputs";
import DateInput from "../inputs/DateInput";
import CompanyInput from "../inputs/CompanyInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createOffice } from "../../services/company.service";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Insert name"),
  lat: Yup.number()
    .positive("Insert positive number")
    .required("Insert location lat"),
  lng: Yup.number()
    .positive("Insert positive number")
    .required("Insert location lng"),
  startDate: Yup.date().required("Insert Start Date"),
  company: Yup.string().required("Insert company"),
});

export default function CreateOfficeForm() {
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      lat: 0,
      lng: 0,
      startDate: new Date(),
      company: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ name, lat, lng, startDate, company }, { resetForm }) => {
      setErrorMsg("");
      setSuccessMsg("");
      try {
        setLoading(true);
        await createOffice({ name, lat, lng, startDate, company });
        setLoading(false);
        resetForm();
        setSuccessMsg("New office has been added");
      } catch (err) {
        console.error(err);
        setErrorMsg("Error on create office");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h5">Create Office</Typography>
        </Grid>
        {errorMsg && (
          <Grid item>
            <Alert severity="error" onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          </Grid>
        )}
        {successMsg && (
          <Grid item>
            <Alert severity="success" onClose={() => setSuccessMsg("")}>
              {successMsg}
            </Alert>
          </Grid>
        )}
        <Grid item>
          <TextInputs name="name" label="Name" formik={formik} />
        </Grid>
        <Grid item>
          <b>Location</b>
          <Grid container spacing={2} style={{ marginTop: "0.25em" }}>
            <Grid item xs={6}>
              <TextInputs
                type="number"
                name="lat"
                label="Latitude"
                formik={formik}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInputs
                type="number"
                name="lng"
                label="Longtitude"
                formik={formik}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <DateInput name="startDate" label="Start Date" formik={formik} />
        </Grid>
        <Grid item>
          <CompanyInput name="company" label="Company" formik={formik} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Create"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
