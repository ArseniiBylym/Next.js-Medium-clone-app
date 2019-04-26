import {useState} from 'react';
import {withRouter} from 'next/router';
import Components from '../components/index';
import API from '../api';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';


const defaultForm = {
    title: '',
    subTitle: '',
    text: '',
    image: '',
    tags: '',
    isPrivate: false,
};

const NewArticle = ({classes, router}) => {
    const [form, setForm] = useState(defaultForm);
    const [sending, setSending] = useState(false)

    const inputHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const sendData = async newArticle => {
        console.log(newArticle);
        const {data, status} = await API.POST('/api/articles', newArticle)
        if (status >= 300) {
            console.log(data)
        } else {
            console.log(data);
            router.push('/articles')
        }
    }

    const submitHandler = async e => {
        setSending(true)
        e.preventDefault();
        const data = {...form};
        sendData(data)
    };

    return (
        <Components.Layout>
            <Paper className={classes.wrapper}>
                <Typography variant="h4" align="center">
                    Create new article
                </Typography>
                <form className={classes.form} onSubmit={submitHandler}>
                    <TextField
                        autoFocus
                        fullWidth
                        helperText="Main title for the article"
                        required
                        label="Title"
                        name="title"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={inputHandler}
                        InputLabelProps={{
                            shrink: true,
                            classes: {root: classes.helper_text}
                        }}
                        FormHelperTextProps={{
                            classes: {root: classes.helper_text}
                        }}
                    />
                    <TextField
                        fullWidth
                        helperText="Secondary title for the article (optional)"
                        label="Subtitle"
                        name="subTitle"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={inputHandler}
                        InputLabelProps={{
                            shrink: true,
                            classes: {root: classes.helper_text}
                        }}
                        FormHelperTextProps={{
                            classes: {root: classes.helper_text}
                        }}
                    />
                    <TextField
                        fullWidth
                        helperText="Main image for the article (optional)"
                        label="Image url"
                        name="image"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={inputHandler}
                        InputLabelProps={{
                            shrink: true,
                            classes: {root: classes.helper_text}
                        }}
                        FormHelperTextProps={{
                            classes: {root: classes.helper_text}
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
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={inputHandler}
                        InputLabelProps={{
                            shrink: true,
                            classes: {root: classes.helper_text}
                        }}
                        FormHelperTextProps={{
                            classes: {root: classes.helper_text}
                        }}
                    />
                    <TextField
                        fullWidth
                        helperText="List of tags (optional). Example: Tech, Life, Education"
                        label="Tags"
                        name="tags"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={inputHandler}
                        InputLabelProps={{
                            shrink: true,
                            classes: {root: classes.helper_text}
                        }}
                        FormHelperTextProps={{
                            classes: {root: classes.helper_text}
                        }}
                    />
                    <Button className={classes.create_button} type='submit' color='primary' variant='contained'>
                        {sending ? 'Saving...' : 'Create'}
                    </Button>
                    {sending && <LinearProgress classes={{root: classes.progress}}/> }
                </form>
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
    form: {
        padding: '2rem'
    },
    helper_text: {
        color: 'black',
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
    }
});

export default withStyles(styles)(withRouter(NewArticle));
