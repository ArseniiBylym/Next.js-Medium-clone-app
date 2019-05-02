import {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {inject, observer} from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import {IoIosCloseCircleOutline} from 'react-icons/io';

@inject('store')
@observer
class Notification extends Component {

    getTextColor = () => {
        const {classes} = this.props;
        switch (this.props.store.message.type) {
            case 'success': 
                return classes.message_success;
            case 'info': 
                return classes.message_info;
            case 'error':
                return classes.message_error;
            default: 
                return classes.message_info;
        }
    }

    render() {
        const {classes} = this.props;
        const {
            message: {text, open, type},
            hideMessage,
        } = this.props.store;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={5000}
                onClose={hideMessage}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={
                    <span id="message-id" className={this.getTextColor()}>
                        {text}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={hideMessage}>
                        <IoIosCloseCircleOutline />
                    </IconButton>,
                ]}
            />
        );
    }
}

const styles = theme => ({
    close: {
        padding: '5px',
    },
    message_success: {
        color: theme.palette.text.success,
    },
    message_error: {
        color: theme.palette.text.danger,
    },
    message_info: {
        color: theme.palette.text.info,
    },
});

export default withStyles(styles)(Notification);
