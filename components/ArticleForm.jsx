import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {MdArrowBack} from 'react-icons/md';

const ArticleForm = ({classes, title, subTitle, image, text, tagsString, inputHandler, submitHandler, sending, returnHandler}) => {
    return (
        <>
            <form className={classes.form} onSubmit={submitHandler} >
                <IconButton onClick={returnHandler} className={classes.button_back} >
                    <MdArrowBack />
                </IconButton>
                <Typography variant="h4" align="center" className={classes.header} >Edit article</Typography>
                <TextField
                    autoFocus
                    fullWidth
                    helperText="Main title for the article"
                    required
                    label="Title"
                    name="title"
                    value={title}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={inputHandler}
                    InputLabelProps={{
                        shrink: true,
                        classes: {root: classes.helper_text},
                    }}
                    FormHelperTextProps={{
                        classes: {root: classes.helper_text},
                    }}
                />
                <TextField
                    fullWidth
                    helperText="Secondary title for the article (optional)"
                    label="Subtitle"
                    name="subTitle"
                    value={subTitle}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={inputHandler}
                    InputLabelProps={{
                        shrink: true,
                        classes: {root: classes.helper_text},
                    }}
                    FormHelperTextProps={{
                        classes: {root: classes.helper_text},
                    }}
                />
                <TextField
                    fullWidth
                    helperText="Main image for the article (optional)"
                    label="Image url"
                    name="image"
                    value={image}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={inputHandler}
                    InputLabelProps={{
                        shrink: true,
                        classes: {root: classes.helper_text},
                    }}
                    FormHelperTextProps={{
                        classes: {root: classes.helper_text},
                    }}
                />
                <TextField
                    fullWidth
                    multiline
                    required
                    rows={10}
                    helperText="Main article's text"
                    label="Text"
                    name="text"
                    value={text}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={inputHandler}
                    InputLabelProps={{
                        shrink: true,
                        classes: {root: classes.helper_text},
                    }}
                    FormHelperTextProps={{
                        classes: {root: classes.helper_text},
                    }}
                />
                <TextField
                    fullWidth
                    helperText="List of tags (optional). Example: Tech, Life, Education"
                    label="Tags"
                    name="tagsString"
                    value={tagsString}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={inputHandler}
                    InputLabelProps={{
                        shrink: true,
                        classes: {root: classes.helper_text},
                    }}
                    FormHelperTextProps={{
                        classes: {root: classes.helper_text},
                    }}
                />
                <Button className={classes.create_button} type="submit" color="primary" variant="contained">
                    {sending ? 'Saving...' : 'Update'}
                </Button>
                {sending && <LinearProgress classes={{root: classes.progress}} />}
            </form>
        </>
    );
};

const styles = theme => ({
    form: {
        padding: '0 2rem',
    },
    header: {
        marginBottom: '1rem'
    },
    title: {
        color: theme.palette.text.primary_hover,
        paddingBottom: '2rem',
    },
    helper_text: {
        color: 'black',
    },
    button_back: {
        marginRight: 'auto',
    },
    create_button: {
        display: 'block',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    progress: {
        height: '2px',
        marginTop: '1rem',
    },
});

export default withStyles(styles)(ArticleForm);
