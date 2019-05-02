import Document, {Html, Head, Main, NextScript} from 'next/document';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
    static getInitialProps = ctx => {
        // Render app and page and get the context of the page with collected side effects.
        let pageContext;
        const page = ctx.renderPage(Component => {
            const WrappedComponent = props => {
                pageContext = props.pageContext;
                return <Component {...props} />;
            };
            return WrappedComponent;
        });

        let css;
        if (pageContext)  {
            css = pageContext.sheetsRegistry.toString()
        }

        return {
            ...page,
            pageContext,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: (
                <React.Fragment>
                    <style
                        id="jss-server-side"
                        dangerouslySetInnerHTML={{
                            __html: css,
                        }}
                    />
                    {flush() || null}
                </React.Fragment>
            ),
        };
    };

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/static/images/favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;
