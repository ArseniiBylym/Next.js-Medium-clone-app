import React, {Component} from 'react';
import NextLink from 'next/link';
import {withStyles} from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {FaMedium} from 'react-icons/fa';
import {inject, observer} from 'mobx-react';
import API from '../api';
import Components from './../components/index';

const defaultState = {
    email: '',
    password: '',
    rememberUser: false,
    errorMessage: '',
};

@inject('store')
@observer
class Login extends Component {
    state = defaultState;

    submitHandler = async e => {
        const {email, password} = this.state;
        e.preventDefault();
        const {data, status} = await API.POST('/api/auth/login', {email, password});
        if (status > 300) {
            console.log(data);
            this.setState({
                errorMessage: data
            })
        }
    };

    snackbarCloseHandler = () => {
        this.setState({
            errorMessage: '',
        })
    }

    inputHandler = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };

    checkboxHandler = e => {
        console.log(e.target.value);
        this.setState(prevState => ({
            ...this.state,
            rememberUser: !prevState.rememberUser,
        }));
    };
    render() {
        const {email, password, rememberUser, errorMessage} = this.state;
        const {classes} = this.props;
        return (
            <Components.Layout>
                <div className={classes.wrapper}>
                    <div className={classes.main}>
                        <Paper className={classes.paper}>
                            <NextLink href="/">
                                <Avatar className={classes.avatar}>
                                    <FaMedium />
                                </Avatar>
                            </NextLink>
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            <form onSubmit={this.submitHandler}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel>Email</InputLabel>
                                    <Input name="email" autoComplete="email" autoFocus value={email} onChange={this.inputHandler} />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel>Password</InputLabel>
                                    <Input name="password" type="password" autoComplete="current-password" value={password} onChange={this.inputHandler} />
                                </FormControl>
                                <FormControlLabel control={<Checkbox checked={rememberUser} color="primary" />} label="Remember me" onChange={this.checkboxHandler} />
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Login
                                </Button>
                            </form>
                            <NextLink href="/register">
                                <Link>
                                    <Typography className={classes.text}>Create new account</Typography>
                                </Link>
                            </NextLink>
                        </Paper>
                    </div>
                </div>
                <Components.Snackbar message={errorMessage} handleClose={this.snackbarCloseHandler}/>
            </Components.Layout>
        );
    }
}

const styles = themes => ({
    wrapper: {
        height: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        width: '400px',
        margin: '3rem 0 auto',
    },
    paper: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        padding: '2rem 3rem',
    },
    avatar: {
        margin: '0.5rem',
        backgroundColor: themes.palette.text.primary,
        cursor: 'pointer',
    },
    submit: {
        marginTop: '2rem',
    },
    text: {
        cursor: 'pointer',
        marginTop: '2rem',
    }
})

export default withStyles(styles)(Login);
