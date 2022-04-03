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
import {motion} from 'framer-motion';
import IstoresMainNav from "../partials/header/IstoresMainNav";
import MgtMainNav from "../partials/header/MgtMainNav";


const currentVariants = {
    visible: {opacity: 1, transition: {duration: 0.5}},
    hidden: {opacity: 0.4}
};

const FrontendContainer = ({children}) => {
    const {locale, theme, menuBg } = useSelector(state => state)
    const {settings, appName } = useContext(GlobalContext);
    const {
        currentFont,
        textColor,
        classNames,
        currentHome,
        mainColor,
        getLarge,
    } = useContext(AppContext);

    return (
        <motion.div
            className={classNames(theme === `dark` ? `bg-black` : ``, `${theme} ${currentFont} flex flex-col overflow-hidden text-sm md:text-sm lg:text-sm capitalize`)}
            dir={locale.dir}
            variants={currentVariants}
            animate={`visible`}
            initial="hidden"
            // style={{backgroundImage: `url(${getThumb(settings.main_bg)})`}}
        >
            {/*<ConfirmationModal/>*/}
            {/*{isLoading && <LoadingView/>}*/}
            <MetaElement/>
            { appName === 'istores' && <IstoresMainNav />}
            { appName === 'mgt' && <MgtMainNav />}
            { appName !== 'istores' || appName !== 'mgt' && <MainNav />}
            <div className="hidden lg:flex z-0 absolute inset-0 min-w-full">
                {
                    settings.wide_screen ? <img
                        className="w-full h-60 object-cover shadow-lg"
                        src={getLarge(menuBg)}
                        alt=""

                    /> : null
                }
                <div
                    className={`absolute inset-0 bg-gradient-to-b from-${mainColor}-800 to-${mainColor}-50 mix-blend-multiply`}
                    aria-hidden="true"
                />
            </div>
            <main
                className={`relative flex-1 focus:outline-none max-w-full font-extrabold capitalize`}>
                <div
                    className={classNames(settings.wide_screen && currentHome ? `` : `lg:pt-32`, `min-h-screen ${textColor}`)}>
                    <SystemMessage/>
                    {children}
                </div>
                <Footer/>
            </main>

        </motion.div>
    );
}


export default FrontendContainer;

FrontendContainer.propTypes = {
    type: PropTypes.string,
    elements: PropTypes.object,
};
