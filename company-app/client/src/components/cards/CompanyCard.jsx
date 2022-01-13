import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CloseIcon from "@material-ui/icons/Close";
import DeleteModal from "../DeleteModal";
import { deleteCompany } from "../../services/company.service";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCompaniesList } from "../../redux/companiesList";
import { useNavigate } from "react-router-dom";

export default function CompanyCard({
  id,
  name,
  address,
  revenue,
  phone_code,
  phone_number,
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteCompany(id);
      dispatch(deleteCompaniesList(response));
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
      <CardActionArea component="div" onClick={() => navigate(`company/${id}`)}>
        <CardHeader
          action={
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteModal(true);
              }}
            >
              <CloseIcon />
            </IconButton>
          }
          title={name}
          style={{ borderBottom: "solid lightgrey 1px" }}
        />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h6">Address</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {address}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {revenue}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Phone Number</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`(${phone_code}) ${phone_number}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
