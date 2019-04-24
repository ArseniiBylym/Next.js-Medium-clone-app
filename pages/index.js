import Components from './../components/index';

const Home = props => {
    return (
        <Components.Layout>
            <div className="wrapper">
               Home
            </div>
        </Components.Layout>
    );
};

Home.getInitialProps = ({req}) => {
   return {};
}

export default Home;
