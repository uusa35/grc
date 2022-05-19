import React, {useContext} from "react";
import PropTypes from 'prop-types';
import MainNav from "../partials/header/MainNav";
import {AppContext} from "../../context/AppContext";
import Footer from "../partials/footer/Footer";
import {useSelector} from "react-redux";
import MetaElement from "../../Backend/components/partials/MetaElement";
import SystemMessage from "../../Backend/components/partials/SystemMessage";
import 'swiper/css';
import GlobalContext from "../../context/GlobalContext";
import {motion} from 'framer-motion';
import IstoresMainNav from "../partials/header/IstoresMainNav";
import MgtMainNav from "../partials/header/MgtMainNav";
import LoadingView from "../../Backend/components/widgets/LoadingView";
import moment from 'moment'
import 'moment/locale/ar'
import 'moment/locale/en-in'
import {removeFromCart} from "../../redux/actions";
import {getWhatsappLink} from "../../helpers";
import {FaWhatsapp} from "react-icons/fa";


const currentVariants = {
    visible: {opacity: 1, transition: {duration: 0.5}},
    hidden: {opacity: 0.4}
};

const FrontendContainer = ({children}) => {
    const {locale, theme, menuBg, isLoading} = useSelector(state => state)
    moment.locale(locale.isRTL ? 'ar' : 'en-in')
    const {settings, appName} = useContext(GlobalContext);
    const {
        currentFont,
        textColor,
        classNames,
        currentHome,
        mainColor,
        getLarge,
        getLocalized
    } = useContext(AppContext);

    return (
        <div
            className={classNames(theme === `dark` ? `bg-black` : ``, `${theme} ${currentFont} flex flex-col overflow-hidden text-sm md:text-sm lg:text-sm capitalize`)}
            dir={locale.dir}
            // variants={currentVariants}
            // animate={`visible`}
            // initial="hidden"
            // style={{backgroundImage: `url(${getThumb(settings.main_bg)})`}}
        >
            {/*<ConfirmationModal/>*/}
            {/*{isLoading && <LoadingView/>}*/}
            <MetaElement/>
            {appName === 'istores' ? <IstoresMainNav/> : (appName === 'mgt' ? <MgtMainNav/> : <MainNav/>)}
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
                    {isLoading ? <LoadingView/> : children}
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
