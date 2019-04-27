import {useState} from 'react';
import NextLink from 'next/link';
import {withRouter} from 'next/router';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import {MdMoreVert} from 'react-icons/md';

import Components from '.';

const UserNav = props => {
    const {classes} = props;
    const [modal, setModal] = useState(false);
    const [menu, setMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const logoutHandler = () => {
        setModal(false);
        props.logoutHandler();
    };

    const openModal = () => {
        setAnchorEl(null); 
        setMenu(false);
        setModal(true);
    }

    const openMenu = e => {
        setAnchorEl(e.currentTarget); 
        setMenu(true);
    }

    return (
        <div>
            {/* <NextLink href="/"> */}
                <Grid container justify="center" alignItems="center">
                    <Avatar src={props.user.avatar} className={classes.avatar} />
                    <Typography variant="body1" className={classes.user_name}>{props.user.name}</Typography>
                    <IconButton classes={{root: classes.menu_button, label: classes.menu_icon}} onClick={openMenu} aria-owns={menu ? 'user-menu' : undefined} aria-haspopup="true">
                        <MdMoreVert />
                    </IconButton>
                    <Menu classes={{paper: classes.menu_body}}open={menu} onClose={() => setMenu(false)} id="user-menu" anchorEl={anchorEl}>
                        <MenuItem className={classes.menu_item} onClick={() => props.router.push('/new-article')}>New article</MenuItem>
                        <MenuItem className={classes.menu_item} onClick={() => props.router.push('/profile')}>Profile</MenuItem>
                        <MenuItem className={classes.menu_item} onClick={openModal}>Logout</MenuItem>
                    </Menu> 
                </Grid>
            {/* </NextLink> */}
            <Components.Modal open={modal} confirmText="Logout" confirmHandler={logoutHandler} rejectText="Cancel" rejectHandler={() => setModal(false)}>
                <Typography variant="body1">Are you sure you want to log out?</Typography>
            </Components.Modal>
        </div>
    );
};

const styles = theme => ({
    avatar: {
        margin: '0 15px',
    },
    user_name: {
        color: theme.palette.text.light
    },
    menu_button: {
        padding: 10,
        margin: '0 10px'
    },
    menu_icon: {
        color: theme.palette.text.light
    },
    menu_body: {
    },
    menu_item: {
        padding: '1rem 2rem'
    }

})

export default withStyles(styles)(withRouter(UserNav));
