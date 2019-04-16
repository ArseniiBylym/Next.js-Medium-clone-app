import Components from '.';

const Layout = ({children}) => {
    return (
        <div className="layout">
            <div className="main_wrapper">
                <Components.Navbar />
                {children}
            </div>
            {styles()}
        </div>
    );
};

function styles() {
    return (
        <style jsx>
            {`
                .layout {
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    position: relative;
                    background: #e3e3e3;
                }
                .main_wrapper {
                    max-width: 1400px;
                    margin: 0 auto;
                }
            `}
        </style>
    );
}

export default Layout;
