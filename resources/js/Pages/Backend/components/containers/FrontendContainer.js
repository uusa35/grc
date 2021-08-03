import Nav from "../partials/Nav";
import Footer from "../partials/Footer";
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";

const FrontendContainer = ({children}) => {
    const { dir } = useContext(GlobalContext);
    return (
        <div className="container font-bein m-auto">
            <Nav/>
            {children}
            <Footer/>
        </div>
    );
}


export default FrontendContainer;
