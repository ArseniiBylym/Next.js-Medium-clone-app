import {Component} from 'react';
import Components from './../components';
import {withStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import API from '../api';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import NextLink from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import {getDate} from './../lib/functions';
import {inject, observer} from 'mobx-react';
import {MdModeEdit, MdFavorite, MdFavoriteBorder} from 'react-icons/md';
import {tagsToString, stringToTags} from '../lib/functions';

@inject('store')
@observer
class Article extends Component {
    state = {
        ...this.props.data,
        tagsString: tagsToString(this.props.data.tags),
        editMode: false,
        sending: false,
    };

    inputHander = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitHandler = async e => {
        const {showMessage} = this.props.store;
        e.preventDefault();
        const {_id, title, subTitle, text, image, tagsString} = this.state;
        this.setState({sending: true});
        const {data, status} = await API.PUT(`/api/articles/${_id}`, {title, subTitle, text, image, tags: stringToTags(tagsString)});
        if (status >= 300) {
            console.log(data);
        } else {
            showMessage({text: `Article was successfully updated`, type: 'success', dellay: 500})
            this.setState({
                ...data,
                editMode: false,
                sending: false,
            });
        }
    };

    getEditButton = () => {
        return this.props.store.isCurrentUserOwner(this.state.author._id) ? (
            <IconButton
                onClick={() => {
                    this.setState({editMode: true});
                }}
            >
                <MdModeEdit />
            </IconButton>
        ) : null;
    };

    getTags = () => {
        const {tags} = this.state;
        const {classes} = this.props;
        if (!tags || tags.length === 0) return null;
        return (
            <Grid container direction="row" spacing={16} className={classes.tags}>
                {tags.map(tag => (
                    <Grid key={tag} item>
                        <Chip key={tag} label={tag} classes={{root: classes.tag_chip, label: classes.tag_chip_label}} />
                    </Grid>
                ))}
            </Grid>
        );
    };

    getLikesIcon = () => {
        const {_id} = this.state;
        return this.props.store.isAlreadyLiked(_id) ? (
            <IconButton>
                <MdFavorite />
            </IconButton>
        ) : (
            <IconButton onClick={this.likeHandler}>
                <MdFavoriteBorder />
            </IconButton>
        );
    };

    likeHandler = async () => {
        if (!this.props.store.user) return false;
        const {user, likeArticle, showMessage} = this.props.store;
        const {_id, title, subTitle, image, createdAt} = this.state;

        const {data, status} = await API.PUT(`/api/articles/likes`, {articleId: _id});
        if (status >= 300) {
            console.log(data)
        } else {
            this.setState({
               likes: [...this.state.likes].concat({_id: user._id, name: user.name, avatar: user.avatar})
            })
            likeArticle({_id, title, subTitle, image, createdAt});
            showMessage({text: `Article added to favorit`, type: 'success', dellay: 500})
        }
    };

    returnHandler = () => {
        this.setState({
            ...this.props.data,
            editMode: false,
            sending: false,
        });
    };

    render() {
        const {classes} = this.props;
        const {_id, title, subTitle, text, image, author, likes, comments, createdAt, editMode} = this.state;
        return (
            <Components.Layout>
                <Paper className={classes.wrapper}>
                    {editMode ? (
                        <Components.ArticleForm
                            {...this.state}
                            inputHandler={this.inputHander}
                            submitHandler={this.submitHandler}
                            returnHandler={this.returnHandler}
                        />
                    ) : (
                        <div className={classes.container}>
                            <Grid container alignItems="center" justify="space-between" className={classes.title}>
                                <Typography variant="h3">{title}</Typography>
                                {this.getEditButton()}
                            </Grid>
                            {this.getTags()}
                            <img src={image} className={classes.image} />
                            <div className={classes.secondary_container}>
                                <Typography gutterBottom variant="h5" align="center" className={classes.subTitle}>
                                    {subTitle}
                                </Typography>
                                <Typography gutterBottom variant="body1" className={classes.text}>
                                    {text}
                                </Typography>
                                <Grid container alignItems="center" direction="row" className={classes.article_info}>
                                    <Grid item xs>
                                        <NextLink href={`/profile/${author._id}`}>
                                            <Link title={author.name}>
                                                <Grid container alignItems="center" className={classes.user_info}>
                                                    <Avatar src={author.avatar} className={classes.avatar} />
                                                    <Typography variant="body1" className={classes.user_name}>
                                                        {author.name}
                                                    </Typography>
                                                </Grid>
                                            </Link>
                                        </NextLink>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography align="center" variant="body1">
                                            {getDate(createdAt)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs container direction="row" alignItems="center" justify="flex-end">
                                        <Grid item>
                                            <Typography variant="body1">{likes.length}</Typography>
                                        </Grid>
                                        <Grid item>{this.getLikesIcon()}</Grid>
                                    </Grid>
                                </Grid>
                                <Components.Comments articleId={_id} comments={comments} />
                            </div>
                        </div>
                    )}
                </Paper>
            </Components.Layout>
        );
    }
}

const styles = theme => ({
    wrapper: {
        margin: '2rem',
        padding: '5rem 6rem',
        flexGrow: 1,
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    secondary_container: {
        maxWidth: '900px',
        margin: '0 auto',
    },
    title: {
        color: theme.palette.text.primary_hover,
        paddingBottom: '1rem',
    },
    subTitle: {
        margin: '2rem auto',
    },
    tags: {
        marginBottom: '1rem',
    },
    tag_chip_label: {
        textTransform: 'capitalize',
    },
    text: {},
    image: {
        width: '100%',
        height: 'auto',
    },
    user_info: {
        display: 'flex',
        marginRight: '2rem',
        cursor: 'pointer',
    },
    article_info: {
        padding: '2rem',
    },
    avatar: {
        marginRight: '1rem',
    },
    clap_icon_root: {
        padding: '5px',
        marginLeft: '1rem',
    },
    clap_icon: {
        width: '50px',
    },
    clap_length: {
        marginLeft: 'auto',
    },
});

Article.getInitialProps = async props => {
    const articleId = props.req ? props.req.params.articleId : props.query.articleId;
    const {data, status} = await API.GET(`/api/articles/${articleId}`);
    return {data};
};

export default withStyles(styles)(Article);
