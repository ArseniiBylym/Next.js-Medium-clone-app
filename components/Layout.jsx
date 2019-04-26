import Components from '.';
import { withStyles } from '@material-ui/core/styles';

const Layout = ({classes, children}) => {

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Components.Navbar />
                <div className={classes.grow}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const styles = {
    root: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: '#e3e3e3',
    },
    wrapper: {
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'column'
    },
    grow: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column',
        overflow: 'auto',
    }
}

export default withStyles(styles)(Layout);
