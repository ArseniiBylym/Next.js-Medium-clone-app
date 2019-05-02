import NextLink from 'next/link';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const CardUser = ({classes, name, avatar, email, _id}) => {
    return (
        <Grid item >
            <Card>
                <NextLink href={`/profile/${_id}`}>
                    <CardActionArea>
                        <Grid container direction="row"  alignItems="center" spacing={16} className={classes.article}>
                            <Grid item container xs={12} md={3} alignItems="center" justify="center">
                                <Grid item>
                                    <Avatar src={avatar} className={classes.avatar} />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} md={9} alignItems="center" spacing={24} wrap="nowrap" className={classes.info_content}>
                                <Grid item>
                                    <Typography variant="h6">{name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">{email}</Typography>
                                </Grid>
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
        margin: 0,
        width: '100%',
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
    info_content: {
        margin: 0,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
           flexFlow: 'column nowrap'
        },
    }
});

export default withStyles(styles)(CardUser);
