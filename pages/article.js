import Components from './../components/index';

const Article = props => {
    return (
        <Components.Layout>
            <div className="wrapper">
               Article
            </div>
        </Components.Layout>
    );
};

Article.getInitialProps = ({req}) => {
   return {};
}

export default Article;
