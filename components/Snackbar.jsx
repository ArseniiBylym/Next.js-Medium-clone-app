import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import {IoIosCloseCircleOutline} from 'react-icons/io';

const MySnackbar = props => {
    const {classes, message, duration = 5000, handleClose} = props;
    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={!!message}
          autoHideDuration={duration}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id" className={classes.message}>{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <IoIosCloseCircleOutline />
            </IconButton>,
          ]}
        />
    )
}

const styles = themes => ({
    close: {
        padding: '5px',
    },
    message: {
        color: themes.palette.text.danger
    }
})
export default withStyles(styles)(MySnackbar);