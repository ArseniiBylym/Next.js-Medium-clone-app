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
import getUserFromToken from '../lib/getUserFromToken';
import API from '../api';

class MyApp extends App {
    static async getInitialProps(appContext) {
        // Get or Create the store with `undefined` as initialState
        // This allows you to set a custom default initialState
        const mobxStore = initializeStore();

        // If reques contains token, then parse token and seed user data to the mobx store
        // Browser no need to sed session request if token exists
        if (appContext.ctx.req) {
            const user = getUserFromToken(appContext.ctx.req);
            if (user && !mobxStore.userFetched) {
                const {data, status} = await API.GET(`/api/users/${user._id}`)
                if (status >= 300) {
                    console.log(data)
                } else {
                    mobxStore.user = data;
                    mobxStore.userFetched = true;
                }
            }
        }
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
                    <title>Meduim</title>
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
                <NProgress color='#911117' spinner={false}/>
            </Container>
        );
    }
}

export default MyApp;