import Components from '../components/index';
import API from '../api';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

const Authors = ({data, classes}) => {
    return (
        <Components.Layout>
            <Paper className={classes.wrapper}>
                <Typography variant="h3" align="center">
                    Authors
                </Typography>
            </Paper>
        </Components.Layout>
    );
};

Authors.getInitialProps = async ({req}) => {
    try {
        const {data, status} = await API.GET('/api/users');
        return {data};
    } catch (error) {
        return {};
    }
};

const styles = theme => ({
    wrapper: {
        margin: '2rem',
        padding: '1rem',
        flexGrow: 1,
    },
});

export default withStyles(styles)(Authors);
