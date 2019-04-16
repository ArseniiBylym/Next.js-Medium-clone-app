import {useState} from 'react';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {FaMedium} from 'react-icons/fa';
import Components from './../components/index';

const styles = () => (
    <style jsx>{`
        .wrapper {
            height: 100%;
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .main {
            width: 400px;
            margin: 0 auto;
        }
        .paper {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 2rem 3rem;
        }
        .avatar {
            margin: 0.5rem;
            background-color: black;
            cursor: pointer;
        }
        .submit {
            margin-top: 2rem;
        }
        .text {
            margin-top: 2rem;
        }
    `}</style>
);

const defaultForm = {
    email: '',
    password: '',
}

const Login = props => {

    const [form, setForm] = useState(defaultForm)
    const [rememberUser, setRememberUser] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
        console.log(form)
    }

    const inputHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const checkboxHandler = e => {
        console.log(e.target.value)
        setRememberUser(!rememberUser)
    }
    return (
        <Components.Layout>
            <div className="wrapper">
                <div className="main">
                    <Paper className="paper">
                        <Link href="/">
                            <Avatar className="avatar">
                                <FaMedium />
                            </Avatar>
                        </Link>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className="form" onSubmit={submitHandler}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel>Email</InputLabel>
                                <Input name="email" autoComplete="email" autoFocus value={form.email} onChange={inputHandler}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel>Password</InputLabel>
                                <Input name="password" type="password" autoComplete="current-password" value={form.password} onChange={inputHandler}/>
                            </FormControl>
                            <FormControlLabel control={<Checkbox checked={rememberUser} color="primary" />} label="Remember me" onChange={checkboxHandler}/>
                            <Button type="submit" fullWidth variant="contained" color="primary" className="submit">
                                Login
                            </Button>
                        </form>
                        <Link href="/register">
                            <a>
                                <Typography className="text">Create new account</Typography>
                            </a>
                        </Link>
                    </Paper>
                </div>
            </div>
            {styles()}
        </Components.Layout>
    );
};

export default Login;
