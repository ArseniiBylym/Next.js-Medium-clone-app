import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const ProfileEdit = ({classes, name, email, info, sending, inputHandler, updateHandler, clearHandler}) => {

    return (
        <Grid container className={classes.container} direction="column" alignItems="center">
            <Grid item className={classes.content}>
            <TextField
                    fullWidth
                    helperText="Main title for the article"
                    required
                    label="Name"
                    name="name"
                    value={name}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={inputHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    value={email}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={inputHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    fullWidth
                    label="Additional info"
                    name="info"
                    value={info}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={inputHandler}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item container alignItems='center' justify='center' direction="column" spacing={8}>
                    <Grid item>
                 <Button className={classes.button} onClick={updateHandler} color="primary" variant="contained">
                    {sending ? 'Saving...' : 'Update'}
                </Button>
                    </Grid>
                    <Grid>
                        <Button className={classes.button} onClick={clearHandler} color="secondary" variant="outlined">Clear</Button>
                    </Grid>
            </Grid>
        </Grid>

    )
}

const styles = theme => ({
    container: {
        padding: '2rem 0'
    },
    content: {
        maxWidth: '1000px',
        margin: '0 auto'
    },
    button: {
        minWidth: '100px',
    }
})

export default withStyles(styles)(ProfileEdit);