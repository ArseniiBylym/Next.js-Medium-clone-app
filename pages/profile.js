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


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

@inject('store')
@observer
class Profile extends Component {
    state = {
        user: this.props.user,
        tabValue: 0,
        editMode: false,
        sending: false
    };

    tabValueHandler = (e, tabValue) => {
        this.setState({tabValue});
    };

    addToFollowed = async () => {
        const followId = this.state.user._id;
        const {data, status} = await API.PUT('/api/users/follow', {followId});
        if (status >= 300) {
            console.log(data);
        } else {
            console.log(data);
            this.setState({
                user: {
                    ...this.state.user,
                    followers: [...this.state.user.followers, {...this.props.store.user}],
                },
            });
        }
    };

    removeFromFollowed = async () => {
        const followId = this.state.user._id;
        const {data, status} = await API.PUT('/api/users/unfollow', {followId});
        if (status >= 300) {
            console.log(data);
        } else {
            console.log(data);
            const filteredFollowers = this.state.user.followers.slice().filter(item => item._id !== this.props.store.user._id);
            this.setState({
                user: {
                    ...this.state.user,
                    followers: filteredFollowers,
                },
            });
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
                [e.target.name]: e.target.value
            }
        })
    }

    updateHandler = async () => {
        this.setState({sending: true})
        const {_id, name, email, info} = this.state.user;
        const {data, status} = await API.PUT(`/api/users/${_id}`, {name, email, info})
        if (status >= 300) {
            console.log(data)
        } else {
            console.log(data)
            this.setState({
                user: data, 
                sending: false,
                editMode: false,
            })
            this.props.store.setUser(data);
        }
        console.log(this.state.user)
    }

    clearHandler = () => {
        this.setState({user: this.props.user})
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
                                        <Grid item xs={3} container alignItems="center" justify="center">
                                            <Avatar src={user.avatar} className={classes.avatar} />
                                        </Grid>
                                        <Grid item xs={7} className={classes.user_details}>
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
                                                <IconButton onClick={() => {this.setState(prevState => ({editMode: !prevState.editMode}))}}>
                                                    <MdModeEdit />
                                                </IconButton>
                                            )
                                            }
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
                                        <Grid item>
                                            {tabValue === 0 && <TabContainer>Articles</TabContainer>}
                                            {tabValue === 1 && <TabContainer>Favorites</TabContainer>}
                                            {tabValue === 2 && <TabContainer>Followers</TabContainer>}
                                            {tabValue === 3 && <TabContainer>Followed by</TabContainer>}
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
        width: '80px',
        height: '80px',
    },
});

Profile.getInitialProps = async props => {
    const userId = props.req ? props.req.params.userId : props.query.userId;
    const {data, status} = await API.GET(`/api/users/${userId}`);
    return {user: data};
};

export default withStyles(styles)(withRouter(Profile));
