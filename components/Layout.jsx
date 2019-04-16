const Layout = ({children}) => {
    return (
        <div className="layout">
            {children}
            {styles()}
        </div>
    );
};

function styles() {
    return (
        <style jsx>{`
            .layout {
                width: 100vw;
                height: 100vh;
                overflow: hidden;
                position: relative;
                background: #e3e3e3;
            }
        `}
        </style>
    );
}

export default Layout;
