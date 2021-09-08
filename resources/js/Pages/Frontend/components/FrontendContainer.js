import React, {useContext, useEffect} from "react";
import {capitalize, split} from 'lodash';
import PropTypes from 'prop-types';
import {Inertia} from "@inertiajs/inertia";
import {Head} from '@inertiajs/inertia-react'
import route from "ziggy-js";
import MainNav from "../partials/header/MainNav";
import {AppContext} from "../../context/AppContext";
import ConfirmationModal from "../../Backend/components/partials/ConfirmationModal";
import GlobalContext from "../../context/GlobalContext";
import Footer from "../partials/footer/Footer";
import LoadingView from "../../Backend/components/widgets/LoadingView";
import MainSlider from "./widgets/slider/MainSlider";
import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import {useSelector} from "react-redux";
import { InertiaHead } from '@inertiajs/inertia-react'
import MetaElement from "../../Backend/components/partials/MetaElement";
import { motion } from "framer-motion"

const FrontendContainer = ({
                               children, elements = [],
                               childName = '',
                               showNoElements = false,
                               showSearch = false,
                               showMobileView = false,
                               mainSlides = [],
                               showBreadCrumbs = true
                           }) => {
    const {locale} = useSelector(state => state)
    const {classNames, getThumb, getLocalized, arFont, enFont } = useContext(AppContext);
    const { settings } = useContext(GlobalContext);

    return (
        <div className={classNames(locale.isRTL ? arFont : enFont,"h-full flex overflow-hidden text-sm md:text-lg capitalize")} dir={locale.dir}>
            {/*<ConfirmationModal/>*/}
            {/*{isLoading && <LoadingView/>}*/}
            <main
                className={"flex-1 relative z-0 focus:outline-none max-w-full bg-white font-extrabold capitalize"}>
                <MainNav/>
                <MetaElement settings={settings} />
                <div className="min-h-screen">
                    {mainSlides && <MainSlider elements={mainSlides}/>}
                    <div className="w-4/5 sm:w-4/5 lg:3/5 2xl:w-3/5 m-auto shadow-xl min-h-screen">
                        {showBreadCrumbs && <FrontendBreadCrumbs childName={childName}/>}
                        {children}
                    </div>

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
