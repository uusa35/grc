import Nav from "./Nav";

const AppContainer = ({ children }) => {
    return (
        <>
            <Nav />
            {children}
        </>
    );
}


export default AppContainer;
