import Components from './../components/index';

const styles = () => (
    <style jsx>{`
        .wrapper {
        }
    `}</style>
);

const Home = props => {
    return (
        <Components.Layout>
            <div className="wrapper">
               Home
            </div>
            {styles()}
        </Components.Layout>
    );
};

export default Home;
