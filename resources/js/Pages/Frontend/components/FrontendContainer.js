import React, {useContext} from "react";
import PropTypes from 'prop-types';
import MainNav from "../partials/header/MainNav";
import {AppContext} from "../../context/AppContext";
import Footer from "../partials/footer/Footer";
import {useSelector} from "react-redux";
import MetaElement from "../../Backend/components/partials/MetaElement";

const FrontendContainer = ({children}) => {
    const {locale} = useSelector(state => state)
    const {classNames, arFont, enFont } = useContext(AppContext);

    return (
        <div className={classNames(locale.isRTL ? arFont : enFont,"h-full flex overflow-hidden text-sm md:text-lg capitalize")} dir={locale.dir}>
            {/*<ConfirmationModal/>*/}
            {/*{isLoading && <LoadingView/>}*/}
            <MetaElement />
            <main
                className={"flex-1 relative z-0 focus:outline-none max-w-full bg-white font-extrabold capitalize"}>
                <MainNav/>
                <div className="min-h-screen">
                    {children}
                </div>
                <Footer/>
            </main>
        </div>
    );
}


export default FrontendContainer;

FrontendContainer.propTypes = {
    type: PropTypes.string,
    elements: PropTypes.object,
};
