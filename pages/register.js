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
            width: 500px;
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
    name: '',
    public_name: '',
    email: '',
    password: '',
    confirm_password: ''
}

const Register = props => {

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
                            Register
                        </Typography>
                        <form className="form" onSubmit={submitHandler}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel>Name</InputLabel>
                                <Input value={form.name} name="name" autoFocus onChange={inputHandler}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel>Public name</InputLabel>
                                <Input value={form.public_name} name="public_name" onChange={inputHandler}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel>Email</InputLabel>
                                <Input value={form.email} name="email" onChange={inputHandler}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel>Password</InputLabel>
                                <Input value={form.password} name="password" type="password" id="password" onChange={inputHandler}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel>Confirm password</InputLabel>
                                <Input value={form.confirm_password} name="confirm_password" type="password"  onChange={inputHandler}/>
                            </FormControl>
                            <FormControlLabel control={<Checkbox checked={rememberUser} color="primary" />} label="Remember me" onChange={checkboxHandler}/>
                            <Button type="submit" fullWidth variant="contained" color="primary" className="submit">
                                Register
                            </Button>
                        </form>
                        <Link href="/login">
                            <a>
                                <Typography className="text">Login with existed account</Typography>
                            </a>
                        </Link>
                    </Paper>
                </div>
            </div>
            {styles()}
        </Components.Layout>
    );
};

export default Register;
