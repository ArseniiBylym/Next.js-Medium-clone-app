import NextLink from 'next/link';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { getDate } from './../lib/functions';

const CardArticle = ({classes, title, subTitle, image, _id, createdAt}) => {
    return (
        <Grid item >
        <Card className={classes.card}>
            <NextLink href={`/article/${_id}`}>
                <CardActionArea>
                    <Grid container direction="row" spacing={16} className={classes.article}>
                        <Grid item xs={12} md={4}>
                            <CardMedia image={image} className={classes.image}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardContent>
                                <Typography variant="caption">{getDate(createdAt)}</Typography>
                                <Typography variant="h6">{title}</Typography>
                                <Typography variant="body1">{subTitle}</Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </NextLink>
        </Card>
        </Grid>
    );
};

const styles = theme => ({
    article: {
        minHeight: '200px',
    },
    image: {
        width: '100%',
        height: '100%',
        minHeight: '200px',
        backgroundPosition: 'left top',
        backgroundSize: 'cover',
    },
});

export default withStyles(styles)(CardArticle);
