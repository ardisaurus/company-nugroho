import AppBar from "../components/Appbar";
import { makeStyles } from "@material-ui/core/styles";
import CreateCompanyForm from "../components/forms/CreateCompanyForm";
import CreateOfficeForm from "../components/forms/CreateOfficeForm";
import CompanyCard from "../components/cards/CompanyCard";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { getCompanies } from "../services/company.service";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCompaniesList } from "../redux/companiesList";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "0 1em",
  },
});

function Home() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const { companiesList } = useAppSelector((state) => state.companiesList);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const results = await getCompanies();
        dispatch(setCompaniesList(results));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppBar />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CreateCompanyForm />
          </Grid>
          <Grid item xs={6}>
            <CreateOfficeForm />
          </Grid>
        </Grid>
        <Divider style={{ margin: "1em 0" }} />
        <Typography variant="h5" style={{ marginBottom: "1em" }}>
          Companies
        </Typography>
        {loading && <Typography variant="subtitle1">Loading...</Typography>}
        {companiesList < 1 && !loading && (
          <Typography variant="subtitle1">
            There is no office created yet
          </Typography>
        )}
        {companiesList && !loading && (
          <Grid container spacing={2}>
            {companiesList.map((item) => (
              <Grid item xs={6} key={item.id}>
                <CompanyCard
                  id={item.id}
                  name={item.name}
                  address={item.address}
                  revenue={item.revenue}
                  phone_code={item.phone_code}
                  phone_number={item.phone_number}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

export default Home;
