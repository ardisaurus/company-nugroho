import Typography from "@material-ui/core/Typography";
import DialogTitle from "./customs/DialogTitle";
import DialogContent from "./customs/DialogContent";
import DialogActions from "./customs/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteModal = ({ loading = false, open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Delete
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Are you sure want to remove this item?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleConfirm}
          color="secondary"
          variant="contained"
          startIcon={<DeleteIcon />}
          disabled={loading}
        >
          {loading ? "Loading..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
