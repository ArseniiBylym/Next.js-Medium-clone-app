import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = () => (
    <style jsx>{`
        .grow {
            flex-grow: 1;
        }
        .nav_list {
            display: flex;
            flex-flow: row nowrap;
            margin-left: 30px;
        }
        .nav_item {
            font-size: 18px;
            margin: 0 20px;
        }
        li {
            list-style-type: none;
        }
        a {
            color: inherit;
            text-decoration: none;
        }
        a:hover {
            color: gray;
        }
    `}</style>
);

const Navbar = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/">
                        <a title="Home">
                            <Typography variant="h5" color="inherit">
                                Medium
                            </Typography>
                        </a>
                    </Link>
                    <ul className="grow nav_list">
                        <li>
                            <Link href="articles">
                                <a title="Articles">
                                    <Typography color="inherit" className="nav_item">
                                        Articles
                                    </Typography>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="authors">
                                <a title="Authors">
                                    <Typography color="inherit" className="nav_item">
                                        Authors
                                    </Typography>
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <Link href="/login">
                        <Button color="inherit">Login</Button>
                    </Link>
                </Toolbar>
                {styles()}
            </AppBar>
        </>
    );
};

export default Navbar;
