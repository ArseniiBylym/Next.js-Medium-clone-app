import NextLink from 'next/link';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { getDate } from './../lib/functions';

const CardUser = ({classes, name, avatar, email, _id}) => {
    return (
        <Grid item >
        <Card className={classes.card}>
            <NextLink href={`/profile/${_id}`}>
                <CardActionArea>
                    <Grid container direction="row" spacing={16} className={classes.article}>
                        <Grid item container xs={12} md={3} alignItems='center' justify='center'>
                            {/* <Grid container aligItems='center' justify='center'> */}
                                <Grid item>
                                    <Avatar src={avatar} className={classes.avatar}/>
                                </Grid>
                            {/* </Grid> */}
                        </Grid>
                        <Grid item container xs={12} md={9} alignItems='center' spacing={24}>
                            {/* <CardContent> */}
                                    <Grid item>
                                        <Typography variant="h6">{name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">{email}</Typography>
                                    </Grid>
                                {/* </Grid> */}
                            {/* </CardContent> */}
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
        height: '100px',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundPosition: 'left top',
        backgroundSize: 'cover',
    },
    avatar: {
        width: '60px',
        height: '60px',
    },
});

export default withStyles(styles)(CardUser);
