import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CloseIcon from "@material-ui/icons/Close";
import DeleteModal from "../DeleteModal";
import { deleteOffice } from "../../services/company.service";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCompanyOffice } from "../../redux/company";

export default function CompanyCard({
  officeId,
  companyId,
  name,
  lat,
  lng,
  startDate,
}) {
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteOffice({ companyId, officeId });
      dispatch(deleteCompanyOffice(officeId));
      setLoading(false);
      setOpenDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Card elevation={3}>
      <DeleteModal
        loading={loading}
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
      />
      <CardHeader
        action={
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <CloseIcon />
          </IconButton>
        }
        title={name}
        style={{ borderBottom: "solid lightgrey 1px" }}
      />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">Location</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Lat - {lat}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Log - {lng}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Start Date</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {startDate}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
