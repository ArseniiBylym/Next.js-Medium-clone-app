import {withStyles} from '@material-ui/core/styles';
import Components from './../components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import {FaMedium} from 'react-icons/fa';
import API from '../api';

const Home = ({classes, articles, authors}) => {
    console.log(articles, authors)
    return (
        <Components.Layout>
            <div className="wrapper">
                <Grid container direction="column" spacing="0">
                    <Grid item container xs={12} spacing="24" alignItems="center" justify="center" className={classes.header}>
                        <Grid item>
                            <Avatar className={classes.avatar}>
                                <FaMedium className={classes.avatar_svg} />
                            </Avatar>
                        </Grid>
                        <Grid>
                            <Typography variant="h1" align="center">
                                Medium
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" align="center" color="textSecondary">
                            your personal place for reading
                        </Typography>
                        <Divider variant='middle'/>
                    </Grid>
                    <Grid item container spacing='24' direction="row" className={classes.content} >
                        <Grid item container xs={12} md={8} direction="column" spacing="16" className={classes.articles}>
                            <Grid item className={classes.articles_header}>
                                <Typography align="center" variant="h5">
                                    Articles
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper>
                                    <Grid container direction="column" spacing='24' zeroMinWidth className={classes.articles_content}>
                                        {articles && articles.map(item => (
                                            <Components.CardArticle key={item._id} {...item} />
                                        ))}
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={4} direction="column" spacing="16" className={classes.authors}>
                            <Grid item className={classes.authors_header}>
                                <Typography align="center" variant="h5">
                                    Authors
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper>
                                    <Grid container direction="column" spacing='24' zeroMinWidth className={classes.authors_content}>
                                        {authors && authors.map(item => (
                                            <Components.CardUser key={item._id} {...item} />
                                        ))}
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Components.Layout>
    );
};

const style = theme => ({
    wrapper: {},
    header: {
        marginTop: '2rem',
    },
    avatar: {
        width: '100px',
        height: '100px',
        backgroundColor: theme.palette.text.primary,
    },
    avatar_svg: {
        width: '62%',
        height: 'auto',
    },
    content: {
        padding: '2rem',
        width: '100%',
        margin: '0',
    },
    articles: {
    },
    articles_content: {
        width: '100%',
        margin: '0',
    },
    authors: {
    },
    authors_content: {
        width: '100%',
        margin: '0',
    },

});

Home.getInitialProps = async ({req}) => {
    try {

        const authors = (await API.GET('/api/users')).data;
        const articles = (await API.GET('/api/articles')).data;
        return {authors, articles};
    } catch (error) {
        return {};
    }
};

export default withStyles(style)(Home);
