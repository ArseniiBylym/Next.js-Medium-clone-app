import Components from './../components/index';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import API from '../api';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';
import {FaRegThumbsUp} from 'react-icons/fa';
import {getDate} from './../lib/functions';

const Articles = ({classes, data}) => {
    console.log(data);

    const articlesList = () => {
        return data.map((item, i) => {
            return (
                <Paper key={item._id} className={classes.paper}>
                    <Grid container className={classes.article}>
                        <Grid item sm={8} className={classes.info}>
                            <Grid container alignItems="center" direction="row" className={classes.article_info}>
                                <NextLink href={`/profile/${item.author._id}`}>
                                    <Link title={item.author.name}>
                                        <Grid item alignItems="center" className={classes.user_info}>
                                            <Avatar src={item.author.avatar} className={classes.avatar} />
                                            <Typography variant="body1" className={classes.user_name}>
                                                {item.author.name}
                                            </Typography>
                                        </Grid>
                                    </Link>
                                </NextLink>
                                <Grid item className={classes.date}>
                                    <Typography variant="body1">{getDate(item.createdAt)}</Typography>
                                </Grid>
                            </Grid>
                            <NextLink href={`/article/${item._id}`}>
                                <Link className={classes.article_link}>
                                    <Typography variant="h4" gutterBottom>
                                        {item.title}
                                    </Typography>
                                </Link>
                            </NextLink>
                            {item.subTitle && (
                                <Typography gutterBottom variant="h6">
                                    {item.subTitle}
                                </Typography>
                            )}
                            {/* <Grid container direction="row">
                                <Typography variant="h6"><FaRegThumbsUp />  {item.claps.length}</Typography>
                            </Grid> */}
                        </Grid>
                        <Grid item sm={4} className={classes.image_container} style={{backgroundImage: `url(${item.image})`}} />
                    </Grid>
                </Paper>
            );
        });
    };

    return (
        <Components.Layout>
            <Paper className={classes.wrapper}>
                <Typography gutterBottom variant="h3" align="center">
                    Articles
                </Typography>
                <Grid container spacing={16} direction="column">
                    {data.length ? articlesList() : <Typography variant="h6">Articles list is empty now</Typography>}
                </Grid>
            </Paper>
        </Components.Layout>
    );
};

Articles.getInitialProps = async ({req}) => {
    try {
        const {data, status} = await API.GET('/api/articles');
        return {data};
    } catch (error) {
        return {};
    }
};

const styles = theme => ({
    wrapper: {
        margin: '2rem',
        padding: '1rem 6rem',
        flexGrow: 1,
    },
    paper: {
        overflow: 'hidden',
    },
    article: {
        height: '220px',
        overflow: 'hidden',
    },
    article_info: {
        marginBottom: '1rem',
    },
    article_link: {
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.text.secodary
        }
    },
    info: {
        padding: '1rem',
        height: '100%',
    },
    user_info: {
        display: 'flex',
        flexFlow: 'row nowrap',
        cursor: 'pointer',
    },
    date: {
        marginLeft: '2rem',
    },
    avatar: {
        marginRight: '10px',
    },
    image_container: {
        height: '100%',
        display: 'flex',
        backgroundSize: 'contain',
        backgroundPosition: 'right top',
        backgroundRepeat: 'no-repeat',
    },
    image: {
        objectFit: 'cover',
        height: '100%',
        marginLeft: 'auto',
    },
});

export default withStyles(styles)(Articles);
