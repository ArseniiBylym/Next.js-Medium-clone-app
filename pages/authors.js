import NextLink from 'next/link';
import Components from '../components/index';
import API from '../api';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';
import {withStyles} from '@material-ui/core/styles';
import {MdMailOutline, MdDateRange} from 'react-icons/md';
import {getDate} from '../lib/functions';

const Authors = ({authors, classes}) => {
    const authorsList = () => {
        if (!authors || authors.length === 0) {
            return (
                <Typography variant="h5" align="center">
                    Authors list is empty now
                </Typography>
            );
        }
        return authors.map(item => {
            return (
                <Grid item key={item._id}>
                    <Card tem className={classes.author}>
                        <CardContent className={classes.card_content}>
                            <NextLink href={`/profile/${item._id}`}>
                                <CardActionArea className={classes.card_action_area}>
                                    <Grid container alignItems="center" justify="center">
                                        <Grid item container xs={12} sm={3} alignItems="center" justify="center">
                                            <Grid item>
                                                <Avatar src={item.avatar} className={classes.avatar} />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={9} className={classes.author_details}>
                                            <Typography gutterBottom variant="h4" color="textPrimary">
                                                {item.name}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" color="textSecondary">
                                                {item.info}
                                            </Typography>
                                            <Typography gutterBottom variant="body1">
                                                <MdMailOutline /> {item.email}
                                            </Typography>
                                            <Typography gutterBottom variant="body1">
                                                <MdDateRange /> Signed in from {getDate(item.createdAt)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardActionArea>
                            </NextLink>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    };

    return (
        <Components.Layout>
            <Paper className={classes.wrapper}>
                <Grid container direction="column" spacing={24} className={classes.authors}>
                    <Typography variant="h3" align="center" color="primary" className={classes.header}>
                        Authors
                    </Typography>
                    <Divider variant="middle" />
                    <Grid item container spacing={24} direction='column'>{authorsList()}</Grid>
                </Grid>
            </Paper>
        </Components.Layout>
    );
};

Authors.getInitialProps = async ({req}) => {
    try {
        const {data, status} = await API.GET('/api/users');
        return {authors: data};
    } catch (error) {
        return {};
    }
};

const styles = theme => ({
    wrapper: {
        margin: '2rem',
        flexGrow: 1,
    },
    header: {
        marginTop: '3rem',
        padding: '12px',
       
    },
    authors: {
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
    },
    author_details: {
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
          },
    },
    card_content: {
        padding: 0,
        '&:last-child': {
            paddingBottom: '0',
        },
    },
    card_action_area: {
        padding: '1rem',
    },
    avatar: {
        width: '120px',
        height: '120px',
    },
});

export default withStyles(styles)(Authors);
