import {Component} from 'react';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import {inject, observer} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Components from '.';
import {getDate, sortComments} from './../lib/functions';
import {MdDelete} from 'react-icons/md';
import grey from '@material-ui/core/colors/grey';
import API from '../api';

@inject('store')
@observer
class Comments extends Component {
    state = {
        comments: [],
    };

    componentDidMount = () => {
        this.setState({
            comments: this.props.comments.reverse(),
        });
    };

    addComment = updatedComments => {
        this.setState({comments: updatedComments.reverse()});
    };

    removeComment = commentId => async e => {
        const {articleId} = this.props;
        const {data, result} = await API.PUT(`/api/articles/comment/${commentId}`, {articleId});
        if (result >= 300) {
            console.log(data);
        } else {
            console.log(data);
            const updatedComments = this.state.comments.filter(item => item._id !== commentId);
            this.setState({comments: updatedComments});
        }
    };

    getDeleteButton = (commentId, authorId) => {
        if (!this.props.store.user) return null;
        if (authorId !== this.props.store.user._id) return null;
        return (
            <IconButton onClick={this.removeComment(commentId)}>
                <MdDelete />
            </IconButton>
        );
    };

    render() {
        const {comments} = this.state;
        const {classes} = this.props;

        return (
            <>
                {this.props.store.user && <Components.AddComment addComment={this.addComment} articleId={this.props.articleId} />}
                {comments.length > 0 && (
                    <Grid container spacing={24} direction="column" className={classes.comments_container}>
                        <Typography variant="h6" color="textSecondary" className={classes.comments_title}>
                            Comments
                        </Typography>
                        {comments.map((item, i) => {
                            return (
                                <Grid key={item._id} item>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            avatar={<Avatar className={classes.avatar} src={item.author.avatar} />}
                                            action={this.getDeleteButton(item._id, item.author._id)}
                                            title={
                                                <NextLink href={`/profile/${item.author._id}`}>
                                                    <Link>
                                                        <Typography color="textPrimary" variant="body1">
                                                            {item.author.name}
                                                        </Typography>
                                                    </Link>
                                                </NextLink>
                                            }
                                            subheader={getDate(item.createdAt)}
                                            classes={{
                                                root: classes.card_header,
                                                title: classes.card_title,
                                                subheader: classes.card_subheader,
                                            }}
                                        />
                                        <CardContent>
                                            <Typography variant="body1">{item.text}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </>
        );
    }
}

const styles = theme => ({
    comments_container: {
        marginTop: '2rem',
    },
    comments_title: {
        marginLeft: '1rem',
    },
    card: {},
    card_header: {
        backgroundColor: grey[200],
    },
    card_title: {
        fontSize: '1.2rem',
        color: 'black',
        cursor: 'pointer',
    },
    card_subheader: {},
});
export default withStyles(styles)(Comments);
