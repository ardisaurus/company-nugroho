import AppBar from "../components/Appbar";
import { makeStyles } from "@material-ui/core/styles";
import OfficeCard from "../components/cards/OfficeCard";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyDetails } from "../services/company.service";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCompany } from "../redux/company";
import React from "react";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "0 1em",
  },
});

function Home() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const { company } = useAppSelector((state) => state.company);

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const results = await getCompanyDetails(id);
        dispatch(setCompany(results));
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
        <Typography variant="h4">{company.name}</Typography>
        <Divider style={{ margin: "1em 0" }} />
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">Address</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {company.address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {company.revenue}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">Phone Number</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {`(${company.phone_code}) ${company.phone_number}`}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/")}
                >
                  Back to Overview
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider style={{ margin: "1em 0" }} />
        <Typography variant="h5" style={{ marginBottom: "1em" }}>
          Offices
        </Typography>
        {loading && <Typography variant="subtitle1">Loading...</Typography>}

        {company.offices < 1 && !loading && (
          <Typography variant="subtitle1">
            There is no office created yet
          </Typography>
        )}
        {company.offices && !loading && (
          <Grid container spacing={2}>
            {company.offices.map((item) => (
              <Grid item xs={6} key={item._id}>
                <OfficeCard
                  companyId={id}
                  officeId={item._id}
                  name={item.name}
                  lat={item.location_lat}
                  lng={item.location_lng}
                  startDate={moment(item.start_date).format("MM/DD/YYYY")}
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
