import {SheetsRegistry} from 'jss';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';
import pink from '@material-ui/core/colors/pink';

/* Create your app color theme here */
const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: red,
        text: {
            primary: blueGrey[900],
            primary_hover: blueGrey[700],
            secondary: blueGrey[100],
            secondary_hover: blueGrey[300],
            danger: red[500],
        }
    },
    typography: {
        useNextVariants: true,
    },
});

function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
    };
}

let pageContext;

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }
    // Reuse context on the client-side.
    if (!pageContext) {
        pageContext = createPageContext();
    }

    return pageContext;
}
