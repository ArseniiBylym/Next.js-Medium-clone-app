import Components from '../components/index';
import API from '../api';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

const Profile = ({classes}) => {
    return (
        <Components.Layout>
            <Paper className={classes.wrapper}>
                <Typography variant="h4" align="center">
                    User profile
                </Typography>
            </Paper>
        </Components.Layout>
    );
};

const styles = theme => ({
    wrapper: {
        margin: '2rem',
        padding: '1rem',
        flexGrow: 1,
    },
});

export default withStyles(styles)(Profile);
