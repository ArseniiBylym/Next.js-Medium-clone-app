import {Component} from 'react';
import {withRouter} from 'next/router';
import Components from '../components';
import API from '../api';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import {MdAssignment, MdFavoriteBorder, MdPeople, MdRecordVoiceOver, MdMailOutline, MdDateRange, MdModeEdit} from 'react-icons/md';
import {getDate} from '../lib/functions';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
class Profile extends Component {
    state = {
        user: this.props.user,
        file: '',
        tabValue: 0,
        editMode: false,
        sending: false,
    };

    tabValueHandler = (e, tabValue) => {
        this.setState({tabValue});
    };

    addToFollowed = async () => {
        const {showMessage} = this.props.store;
        const followId = this.state.user._id;
        const {data, status} = await API.PUT('/api/users/follow', {followId});
        if (status >= 300) {
            console.log(data);
        } else {
            this.setState({
                user: {
                    ...this.state.user,
                    followers: [...this.state.user.followers, {...this.props.store.user}],
                },
            });
            showMessage({text: `${this.state.user.name} added to followed`, type: 'info', dellay: 500})
        }
    };

    removeFromFollowed = async () => {
        const {showMessage} = this.props.store;
        const followId = this.state.user._id;
        const {data, status} = await API.PUT('/api/users/unfollow', {followId});
        if (status >= 300) {
            console.log(data);
        } else {
            const filteredFollowers = this.state.user.followers.slice().filter(item => item._id !== this.props.store.user._id);
            this.setState({
                user: {
                    ...this.state.user,
                    followers: filteredFollowers,
                },
            });
            showMessage({text: `${this.state.user.name} removed from followed`, type: 'info', dellay: 500})
        }
    };

    isAlreadyFollowed = () => {
        if (!this.props.store.user) return null;
        if (this.props.store.user._id === this.state.user._id) return null;
        return this.props.store.isFollowed(this.state.user) ? (
            <Button variant="contained" color="secondary" onClick={this.removeFromFollowed}>
                Unfollow
            </Button>
        ) : (
            <Button variant="contained" color="primary" onClick={this.addToFollowed}>
                Follow
            </Button>
        );
    };

    inputHandler = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            },
        });
    };

    updateHandler = async () => {
        const {showMessage} = this.props.store;
        this.setState({sending: true});
        const {file, user: {_id, name, email, info}} = this.state;
        let body = {};
        if (file) {
            const formData = new FormData();
            formData.append('name', name)
            formData.append('email', email)
            formData.append('info', info || '')
            formData.append('avatar', file)
            body = formData;
        } else {
            body = {name, email, info}
        }
        const {data, status} = await API.PUT(`/api/users/${_id}`, body);
        if (status >= 300) {
            console.log(data);
        } else {
            this.setState({
                user: data,
                sending: false,
                editMode: false,
            });
            this.props.store.setUser(data);
            showMessage({text: `User profile updated`, type: 'success', dellay: 500})   
        }
    };

    clearHandler = () => {
        this.setState({user: this.props.user});
    };

    uploadAvatarHandler = e => {
        const file = e.target.files[0];
        this.setState({file});
    };

    getUserArticles = () => {
        const {user} = this.state;
        if (user.articles.length === 0) {
            return (
                <Typography align="center" variant="body1">
                    User doesn't have his own articles yet
                </Typography>
            );
        }
        return (
            <Grid container direction="column" spacing={16}>
                {user.articles.map(item => {
                    return <Components.CardArticle key={item._id} {...item} />;
                })}
            </Grid>
        );
    };

    getUserFavorites = () => {
        const {user} = this.state;
        if (user.likes.length === 0) {
            return (
                <Typography align="center" variant="body1">
                    User doesn't have favorite articles yet
                </Typography>
            );
        }
        return (
            <Grid container direction="column" spacing={16}>
                {user.likes.map(item => {
                    return <Components.CardArticle key={item._id} {...item} />;
                })}
            </Grid>
        );
    };

    getFollowers = () => {
        const {user} = this.state;
        if (user.following.length === 0) {
            return (
                <Typography align="center" variant="body1">
                    User doesn't have followed users yet
                </Typography>
            );
        }
        return (
            <Grid container direction="column" spacing={16}>
                {user.following.map(item => {
                    return <Components.CardUser key={item._id} {...item} />;
                })}
            </Grid>
        );
    };

    getFollowedBy = () => {
        const {user} = this.state;
        if (user.followers.length === 0) {
            return (
                <Typography align="center" variant="body1">
                    Nobody follows this user yet
                </Typography>
            );
        }
        return (
            <Grid container direction="column" spacing={16}>
                {user.followers.map(item => {
                    return <Components.CardUser key={item._id} {...item} />;
                })}
            </Grid>
        );
    };

    getUpdateImageButton = () => {
        const {classes} = this.props;
        return (
            <>
                <input type="file" id="uploadAvatar" accept="image/*" onChange={this.uploadAvatarHandler} className={classes.uploadAvatar_input} />
                <label htmlFor="uploadAvatar" className={classes.uploadButton}>
                    <Button variant="contained" color="primary" component="span">
                        Upload Image
                    </Button>
                </label>
            </>
        );
    };

    getUserAvatar = () => {
        const {file, user: {avatar}} = this.state;
        return file ? URL.createObjectURL(file) : avatar;
    }

    render() {
        const {classes} = this.props;
        const {tabValue, user, editMode, sending} = this.state;
        return (
            <Components.Layout>
                <Paper className={classes.wrapper}>
                    <Grid container direction="column" className={classes.container}>
                        <Grid item className={classes.header}>
                            <Typography gutterBottom variant="h4" align="center" color="primary">
                                User profile
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <Grid container direction="row">
                                        <Grid item xs={12} md={3} container alignItems="center" direction="column" justify="center">
                                            <Avatar src={this.getUserAvatar()} className={classes.avatar} />
                                            {this.props.store.isCurrentUserOwner(user._id) && editMode ? this.getUpdateImageButton() : null}
                                        </Grid>
                                        <Grid item xs={12} md={7} className={classes.user_details}>
                                            <Typography gutterBottom variant="h4" color="textPrimary">
                                                {user.name}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" color="textSecondary">
                                                {user.info}
                                            </Typography>
                                            <Typography gutterBottom variant="body1">
                                                <MdMailOutline /> {user.email}
                                            </Typography>
                                            <Typography gutterBottom variant="body1">
                                                <MdDateRange /> Signed in from {getDate(user.createdAt)}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} container alignItems="center" justify="flex-end">
                                            {this.props.store.isCurrentUserOwner(user._id) && (
                                                <IconButton
                                                    onClick={() => {
                                                        this.setState(prevState => ({editMode: !prevState.editMode}));
                                                    }}
                                                >
                                                    <MdModeEdit />
                                                </IconButton>
                                            )}
                                            {this.isAlreadyFollowed()}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider />
                                {editMode && (
                                    <>
                                        <Components.ProfileEdit
                                            name={user.name}
                                            email={user.email}
                                            info={user.info}
                                            sending={sending}
                                            inputHandler={this.inputHandler}
                                            updateHandler={this.updateHandler}
                                            clearHandler={this.clearHandler}
                                        />
                                        <Divider />
                                    </>
                                )}
                                <CardActions>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Tabs variant="fullWidth" value={tabValue} onChange={this.tabValueHandler} indicatorColor="primary" textColor="primary">
                                                <Tab label="Articles" icon={<MdAssignment />} />
                                                <Tab label="Favorites" icon={<MdFavoriteBorder />} />
                                                <Tab label="Followers" icon={<MdPeople />} />
                                                <Tab label="Followed by" icon={<MdRecordVoiceOver />} />
                                            </Tabs>
                                        </Grid>
                                        <Grid item className={classes.tab_content}>
                                            {tabValue === 0 && this.getUserArticles()}
                                            {tabValue === 1 && this.getUserFavorites()}
                                            {tabValue === 2 && this.getFollowers()}
                                            {tabValue === 3 && this.getFollowedBy()}
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item />
                    </Grid>
                </Paper>
            </Components.Layout>
        );
    }
}

const styles = theme => ({
    wrapper: {
        margin: '2rem',
        padding: '1rem',
        flexGrow: 1,
    },
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    header: {
        margin: '2rem auto',
    },
    avatar_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: '150px',
        height: '150px',
    },
    user_details: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
          },
    }, 
    tab_content: {
        padding: '2rem',
    },
    uploadAvatar_input: {
        display: 'none'
    },
});

Profile.getInitialProps = async props => {
    const userId = props.req ? props.req.params.userId : props.query.userId;
    const {data, status} = await API.GET(`/api/users/${userId}`);
    return {user: data};
};

export default withStyles(styles)(withRouter(Profile));
