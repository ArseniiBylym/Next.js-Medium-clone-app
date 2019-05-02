import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from '../api';

@inject('store')
@observer
class AddComment extends Component {
    state = {
        text: '',
    };

    inputHandler = e => {
        this.setState({text: e.target.value});
    };

    sendCommentHandler = async () => {
        const {articleId, addComment, store: {showMessage}} = this.props;
        const {text} = this.state;

        const {data, status} = await API.PUT('/api/articles/comment', {articleId, text});
        if (status >= 300) {
            console.log(data);
        } else {
            addComment(data);
            this.setState({text: ''});
            showMessage({text: 'New commet was added', type: 'success', dellay: 500})
        }
    };

    clearInputHandler = () => {
        this.setState({text: ''})
    }

    keyUpHandler = e => {
        if (this.state.text && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            this.sendCommentHandler()
        }
    }

    render() {
        const {classes} = this.props;
        const {text} = this.state;

        return (
            <>
                <Typography variant="h6" color="textSecondary">
                    Add comment
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Comment"
                    name="text"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.inputHandler}
                    onKeyUp={this.keyUpHandler}
                    value={text}
                />
                <Button onClick={this.sendCommentHandler} className={classes.add_button} color="primary" variant="contained" disabled={!text}>
                    Add
                </Button>
                <Button onClick={this.clearInputHandler} className={classes.add_button} color="secondary" variant="contained" disabled={!text}>
                    Clear
                </Button>
            </>
        );
    }
}

const styles = theme => ({
    add_button: {
        paddingLeft: '4rem',
        paddingRight: '4rem',
        marginRight: '2rem',
    },
});

export default withStyles(styles)(AddComment);
