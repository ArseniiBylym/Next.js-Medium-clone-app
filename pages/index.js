import Link from 'next/link';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Layout from './../components/Layout';

const styles = {
    root: {
        flexGrow: 1,
        maxWidth: '1400px',
        margin: '0 auto',
    },
    grow: {
        flexGrow: 1,
    },
};

const Home = props => {
    const {classes} = props;
    return (
        <Layout>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Medium
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </Layout>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
