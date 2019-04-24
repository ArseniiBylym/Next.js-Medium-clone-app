import App, {Container} from 'next/app';
import Head from "next/head";
import React from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import NProgress from "next-nprogress/component";
import {initializeStore} from '../store';
import {Provider} from 'mobx-react';
import getPageContext from '../lib/getPageContext';

class MyApp extends App {
    static async getInitialProps(appContext) {
        // Get or Create the store with `undefined` as initialState
        // This allows you to set a custom default initialState
        const mobxStore = initializeStore();
        // Provide the store to getInitialProps of pages
        appContext.ctx.mobxStore = mobxStore;

        let appProps = await App.getInitialProps(appContext);

        return {
            ...appProps,
            initialMobxState: mobxStore,
        };
    }

    constructor(props) {
        super(props);
        const isServer = !process.browser;
        this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
        this.pageContext = getPageContext();
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }

    }

    render() {
        const {Component, pageProps} = this.props;
        return (
            <Container>
                <Head>
                    <title>Next.js app</title>
                </Head>
                {/* Wrap every page in Jss and Theme providers */}
                <JssProvider registry={this.pageContext.sheetsRegistry} generateClassName={this.pageContext.generateClassName}>
                    {/* MuiThemeProvider makes the theme available down the React
                    tree thanks to React context. */}
                    <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Provider store={this.mobxStore}>
                            <Component pageContext={this.pageContext} {...pageProps} />
                        </Provider>
                    </MuiThemeProvider>
                </JssProvider>
                <NProgress spinner={false}/>
            </Container>
        );
    }
}

export default MyApp;