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
import {MdModeEdit} from 'react-icons/md';
import {tagsToString, stringToTags} from '../lib/functions';

@inject('store')
@observer
class Article extends Component {
    state = {
        ...this.props.data,
        editMode: false,
        sending: false,
    };

    inputHander = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitHandler = async e => {
        e.preventDefault();
        const {_id, title, subTitle, text, image, tags} = this.state;
        this.setState({sending: true});
        const {data, status} = await API.PUT(`/api/articles/${_id}`, {title, subTitle, text, image, tags: stringToTags(tags)});
        if (status >= 300) {
            console.log(data);
        } else {
            console.log(data);
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
                    <Grid item><Chip key={tag} label={tag} classes={{root: classes.tag_chip, label: classes.tag_chip_label}} /></Grid>
                ))}
            </Grid>
        )
    }

    returnHandler = () => {
        this.setState({
            ...this.props.data,
            editMode: false,
            sending: false,
        });
    };

    render() {
        const {classes} = this.props;
        const {_id, title, subTitle, text, image, author, claps, comments, createdAt, editMode, tags} = this.state;
        console.log(this.state);
        return (
            <Components.Layout>
                <Paper className={classes.wrapper}>
                    {editMode ? (
                        <Components.ArticleForm {...this.state} tags={typeof tags === 'string' ? tags : tagsToString(tags)} inputHandler={this.inputHander} submitHandler={this.submitHandler} returnHandler={this.returnHandler} />
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
                                    <Typography variant="body1">{getDate(createdAt)}</Typography>
                                    <Typography variant="body1" color="primary" className={classes.clap_length}>
                                        {claps.length}
                                    </Typography>
                                    <IconButton className={classes.clap_icon_root}>
                                        <img src="/static/images/clap.png" width="50" className={classes.clap_icon} />
                                    </IconButton>
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
