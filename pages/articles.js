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
                            <Grid item xs={12} md={7}>
                                <CardHeader
                                    avatar={<Avatar src={item.author.avatar} className={classes.avatar} />}
                                    title={
                                        <NextLink href={`/profile/${item.author._id}`}>
                                            <Link className={classes.link}>
                                                <Typography variant="body1" noWrap={true}>
                                                    {item.author.name}
                                                </Typography>
                                            </Link>
                                        </NextLink>
                                    }
                                />
                                <CardContent>
                                    <NextLink href={`/article/${item._id}`}>
                                        <Link className={classes.link}>
                                            <Typography variant="h4" gutterBottom color="textPrimary">
                                                {item.title}
                                            </Typography>
                                        </Link>
                                    </NextLink>
                                    {item.subTitle && (
                                        <Typography variant="body1" gutterBottom color="textSecondary">
                                            {item.subTitle}
                                        </Typography>
                                    )}
                                </CardContent>
                                <CardActions>
                                    <IconButton disabled={true}>
                                        <MdFavoriteBorder />
                                    </IconButton>
                                    <Typography variant="body2" color="primary">{item.likes.length}</Typography>
                                    {getBookmarkButton()}
                                </CardActions>
                            </Grid>
                            <Grid item xs={12} md={5} className={classes.image_container}>
                                    <CardMedia component="img" image={item.image} className={classes.image} />
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
                <Grid container direction="column" alignItems="center" spacing={24} className={classes.main_container}>
                    <Grid item>
                        <Typography variant="h3" align="center" color="primary" className={classes.header}>
                            Articles
                        </Typography>
                    </Grid>
                    <Grid item container direction="column" spacing={24}>
                        <Divider className={classes.divider} />
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
    },
    main_container: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    header: {
        marginTop: '3rem',
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
        maxHeight: '250px',
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    article: {
        height: '250px',
    },
});

export default withStyles(styles)(Articles);
