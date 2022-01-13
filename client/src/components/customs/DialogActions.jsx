import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";

export default withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
