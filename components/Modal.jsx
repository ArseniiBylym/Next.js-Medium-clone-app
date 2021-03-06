import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const Modal = ({children, open, title, confirmText, confirmHandler, rejectText, rejectHandler}) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={rejectHandler}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {title && <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>}
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={confirmHandler} color="primary">
                    {confirmText}
                </Button>
                <Button onClick={rejectHandler} color="primary">
                    {rejectText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
