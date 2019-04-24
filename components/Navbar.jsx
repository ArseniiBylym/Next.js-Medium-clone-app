import React, {Component} from 'react';
import { withRouter } from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import NextLink from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {FaMedium} from 'react-icons/fa';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
class Navbar extends Component {
    componentDidMount = async () => {
        const {store} = this.props;
        if (!store.userFetched) {
            store.getSession();
        }
    };

    getAuthButton = () => {
        const {route} = this.props.router;
        if (route === '/login') {
            return (
                <NextLink href="/register">
                    <Button color="inherit">Register</Button>
                </NextLink>
            )
        } 
        return (
            <NextLink href="/login">
                <Button color="inherit">Login</Button>
            </NextLink>
        )
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <NextLink href="/">
                            <Link button title="Home" className={classes.home_link} >
                                <Avatar className={classes.avatar}>
                                    <FaMedium />
                                </Avatar>
                                <Typography variant="h5" className={classes.home}>
                                    Medium
                                </Typography>
                            </Link>
                        </NextLink>
                        <List component="nav" className={classes.nav_list}>
                            <NextLink href="articles">
                                <ListItem button className={classes.nav_item}>
                                    <Link title="Articles">
                                        <ListItemText
                                            primary="Articles"
                                            classes={{
                                                root: classes.nav_item_text,
                                                primary: classes.nav_item_text,
                                            }}
                                        />
                                    </Link>
                                </ListItem>
                            </NextLink>
                            <NextLink href="authors">
                                <ListItem button className={classes.nav_item}>
                                    <Link title="Authors">
                                        <ListItemText
                                            primary="Authors"
                                            classes={{
                                                root: classes.nav_item_text,
                                                primary: classes.nav_item_text,
                                            }}
                                        />
                                    </Link>
                                </ListItem>
                            </NextLink>
                        </List>
                        {this.props.store.user ? (
                            <NextLink href="/">
                                <Button color="inherit">Logout</Button>
                            </NextLink>
                        ) : this.getAuthButton() }
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}

const styles = themes => ({
    nav_list: {
        display: 'flex',
        flexGrow: 1,
        flexFlow: 'row nowrap',
        marginLeft: '30px',
    },
    nav_item: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0 10px',
        width: 'auto',
    },
    nav_item_text: {
        padding: 0,
        color: themes.palette.text.secondary,
        textTransform: 'uppercase',
    },
    home: {
        color: themes.palette.text.primary,
    },
    home_link: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    avatar: {
        backgroundColor: themes.palette.text.primary,
        marginRight: '1rem',
    },
});

export default withStyles(styles)(withRouter(Navbar));
