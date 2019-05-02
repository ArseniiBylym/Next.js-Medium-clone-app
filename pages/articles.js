import Components from './../components/index';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import API from '../api';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles';
import {MdFavoriteBorder} from 'react-icons/md';
import {getDate} from './../lib/functions';

const Articles = ({classes, data}) => {
    const getBookmarkButton = () => {
        return null;
    };

    const articlesList = () => {
        return data.map((item, i) => {
            return (
                <Grid key={item._id} item>
                    <Card>
                        <Grid container direction="row" className={classes.article}>
                            <Grid item xs={12} md={7} zeroMinWidth>
                                <CardHeader
                                    avatar={<Avatar src={item.author.avatar} className={classes.avatar} />}
                                    title={
                                        <NextLink href={`/profile/${item.author._id}`}>
                                            <Link className={classes.link}>
                                                <Typography variant="body1">
                                                    {item.author.name}
                                                </Typography>
                                            </Link>
                                        </NextLink>
                                    }
                                    action={
                                        <Typography align='center' variant="body1">{getDate(item.createdAt)}</Typography>
                                    }
                                    classes={{action: classes.header_createdAt}}
                                />
                                <CardContent>
                                    <NextLink href={`/article/${item._id}`}>
                                        <Link className={classes.link}>
                                            <Typography variant="h4" gutterBottom color="textPrimary" className={classes.article_title}>
                                                {item.title}
                                            </Typography>
                                        </Link>
                                    </NextLink>
                                    {item.subTitle && (
                                        <Typography variant="body1" gutterBottom color="textSecondary" className={classes.article_subTitle}>
                                            {item.subTitle}
                                        </Typography>
                                    )}
                                </CardContent>
                                <CardActions>
                                    <IconButton disabled={true}>
                                        <MdFavoriteBorder />
                                    </IconButton>
                                    <Typography variant="body2" color="primary">
                                        {item.likes.length}
                                    </Typography>
                                    {getBookmarkButton()}
                                </CardActions>
                            </Grid>
                            <Grid item xs={12} md={5} className={classes.image_container}>
                                <NextLink href={`/article/${item._id}`}>
                                    <CardActionArea>
                                        <CardMedia component="img" image={item.image} className={classes.image} />
                                    </CardActionArea>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            );
        });
    };

    return (
        <Components.Layout>
            <Paper className={classes.wrapper}>
                <Grid container direction="column" spacing={24} className={classes.main_container}>
                    <Typography variant="h3" align="center" color="primary" className={classes.header}>
                        Articles
                    </Typography>
                    <Divider variant="middle" />
                    <Grid item container spacing={24} direction="column" className={classes.articles}>
                        {data.length ? (
                            articlesList()
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                Articles list is empty now
                            </Typography>
                        )}
                    </Grid>
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
        flexGrow: 1,
    },
    main_container: {
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
        
    },
    header: {
        marginTop: '3rem',
        padding: '12px',
    },
    articles: {
        width: '100%',
        margin: '0'
    },
    divider: {
        marginBottom: '2rem',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    },
    image_container: {
        [theme.breakpoints.down('sm')]: {
            order: -1,
        },
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    article_title: {
        transition: 'color .5s ease',
        textOverflow: 'ellipsis',
        // whiteSpace: 'nowrap',
        overflow: 'hidden',
        '&:hover': {
            color: "#009688"
        }
    },
    article_subTitle: {
        // textOverflow: 'ellipsis',
        // whiteSpace: 'nowrap',
        // overflow: 'hidden',
    },
    header_createdAt: {
        alignSelf: 'center',
        marginRight: '10px',
    }
});

export default withStyles(styles)(Articles);
