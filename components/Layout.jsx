import Components from '.';
import { withStyles } from '@material-ui/core/styles';

const Layout = ({classes, children}) => {

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Components.Navbar />
                {children}
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
        maxWidth: '1400px',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

export default withStyles(styles)(Layout);
