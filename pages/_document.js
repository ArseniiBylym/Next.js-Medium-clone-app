import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(context) {
        const initialProps = await Document.getInitialProps(context);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>Next.js app</title>
                    <link rel="shortcut icon" href="/static/image/favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <style global jsx>{`
                    body {
                        margin: 0;
                        padding: 0;
                    }
                `}</style>
            </Html>
        );
    }
}

export default MyDocument;
