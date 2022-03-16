import React, {useContext} from "react";
import PropTypes from 'prop-types';
import MainNav from "../partials/header/MainNav";
import {AppContext} from "../../context/AppContext";
import Footer from "../partials/footer/Footer";
import {useSelector} from "react-redux";
import MetaElement from "../../Backend/components/partials/MetaElement";
import SystemMessage from "../../Backend/components/partials/SystemMessage";
// import GlobalContext from "../../context/GlobalContext";
// import {setTheme} from "../../redux/actions";
import './../../../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
// Import Swiper styles
import 'swiper/css';
import GlobalContext from "../../context/GlobalContext";

const FrontendContainer = ({children}) => {
    const {locale, theme} = useSelector(state => state)
    const { settings } = useContext(GlobalContext);
    const {currentFont, mainColor, mainBgColor, getThumb} = useContext(AppContext);

    return (
        <div
            className={`${theme} ${currentFont} h-full flex overflow-hidden text-sm md:text-sm lg:text-sm capitalize mainBgImage`}
            dir={locale.dir} style={{ backgroundImage : `url(${getThumb(settings.main_bg)})`}}>
            {/*<ConfirmationModal/>*/}
            {/*{isLoading && <LoadingView/>}*/}
            <MetaElement/>
            <MainNav/>
            <main
                className={`bg-transparent dark:bg-${mainBgColor}-900 flex-1 relative z-0 focus:outline-none max-w-full font-extrabold capitalize`}>

                <div className={`min-h-full bg-transparent dark:bg-${mainBgColor}-900 text-${mainColor}-50 pt-32`}>
                    <SystemMessage/>
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
