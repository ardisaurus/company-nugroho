import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextInputs from "../inputs/TextInputs";
import PhoneCodeInput from "../inputs/PhoneCodeInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCompany } from "../../services/company.service";
import { useAppDispatch } from "../../redux/hooks";
import { addCompaniesList } from "../../redux/companiesList";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Insert name"),
  address: Yup.string().required("Insert address"),
  revenue: Yup.number()
    .positive("Insert positive number")
    .round("floor")
    .required("Insert revenue"),
  phoneCode: Yup.number()
    .positive("Insert positive number")
    .integer("Insert positive number")
    .required("Insert phone code"),
  phoneNumber: Yup.number()
    .positive()
    .integer()
    .required("Insert phone number"),
});

export default function CreateCompanyForm() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      revenue: 0,
      phoneCode: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (
      { name, address, revenue, phoneCode, phoneNumber },
      { resetForm }
    ) => {
      setErrorMsg("");
      setSuccessMsg("");
      const floorRevenue = Math.floor(revenue);
      try {
        setLoading(true);
        const response = await createCompany({
          name,
          address,
          revenue: floorRevenue,
          phoneCode,
          phoneNumber,
        });
        dispatch(addCompaniesList(response));
        setLoading(false);
        resetForm();
        setSuccessMsg("New company has been added");
      } catch (err) {
        console.error(err);
        setErrorMsg("Error on create company");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h5">Create Company</Typography>
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
          <TextInputs name="address" label="Address" formik={formik} />
        </Grid>
        <Grid item>
          <TextInputs
            type="number"
            name="revenue"
            label="Revenue"
            formik={formik}
          />
        </Grid>
        <Grid item>
          <b>Phone No.</b>
          <Grid container spacing={2} style={{ marginTop: "0.25em" }}>
            <Grid item xs={2}>
              <PhoneCodeInput name="phoneCode" label="Code" formik={formik} />
            </Grid>
            <Grid item xs={10}>
              <TextInputs name="phoneNumber" label="Number" formik={formik} />
            </Grid>
          </Grid>
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
