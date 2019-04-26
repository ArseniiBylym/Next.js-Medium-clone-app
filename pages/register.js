import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'next/router';

import NextLink from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {FaMedium} from 'react-icons/fa';
import {inject, observer} from 'mobx-react';
import Components from './../components';
import API from '../api';

const defaultForm = {
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    rememberUser: false,
    errorMessage: '',
};

@inject('store')
@observer
class Register extends Component {
    state = defaultForm;

    submitHandler = async e => {
        const {name, email, password, password_confirm} = this.state;
        e.preventDefault();
        const {data, status} = await API.POST('/api/auth/register', {name, email, password, password_confirm});
        if (status > 300) {
            this.setState({
                errorMessage: data
            })
        } else {
            this.props.store.setUser(data)
            this.props.router.push('/')
        }
    }

    inputHandler = e => {
        if (e.target.type === 'checkbox') {
            this.setState(prevState => ({
                rememberUser: !prevState.rememberUser,
            }));
        }  else {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    };

    snackbarCloseHandler = () => {
        this.setState({
            errorMessage: '',
        })
    }

    render() {
        const {name, email, password, password_confirm, rememberUser, errorMessage} = this.state;
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
                                Register
                            </Typography>
                            <form onSubmit={this.submitHandler}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel>Name</InputLabel>
                                    <Input value={name} name="name" autoFocus onChange={this.inputHandler} />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel>Email</InputLabel>
                                    <Input value={email} name="email" onChange={this.inputHandler} />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel>Password</InputLabel>
                                    <Input value={password} name="password" type="password" id="password" onChange={this.inputHandler} />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel>Confirm password</InputLabel>
                                    <Input value={password_confirm} name="password_confirm" type="password" onChange={this.inputHandler} />
                                </FormControl>
                                <FormControlLabel control={<Checkbox checked={rememberUser} color="primary" />} label="Remember me" onChange={this.inputHandler} />
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Register
                                </Button>
                            </form>
                            <NextLink href="/login">
                                <Link >
                                    <Typography className={classes.text}>Login with existed account</Typography>
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

export default withStyles(styles)(withRouter(Register));
