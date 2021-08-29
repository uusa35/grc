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


const FrontendContainer = ({
                               children, elements = [],
                               childName = '',
                               showNoElements = false,
                               showSearch = false,
                               showMobileView = false,
                               mainSlides = [],
                               showBreadCrumbs = true
                           }) => {
    const {locale, settings } = useSelector(state => state)
    const {classNames, getThumb , getLocalized} = useContext(AppContext);

    return (
        <div className="h-full flex overflow-hidden text-sm md:text-lg" dir={locale.dir}>
            <Head title={capitalize(settings[getLocalized()])}>
                <meta head-key="title" name="title" content={settings[getLocalized()]}/>
                <meta head-key="description" name="description" content={settings[getLocalized('description')]}/>
                <link href={getThumb(settings.logo)} rel="shortcut icon" type="image/png"/>
                <link rel="canonical" href={route('frontend.home')}/>
                <link rel="icon" type="image/svg+xml" href={getThumb(settings.image)}/>
                <meta
                    http-equiv="Content-type"
                    charSet="utf-8"
                    content="text/html; charset=utf-8"
                />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>{settings[getLocalized()]}</title>
                <meta name="title" content={settings[getLocalized()]}/>
                <link href={getThumb(settings.image)} rel="shortcut icon" type="image/png"/>
                <meta name={settings[getLocalized()]} content="E-commerce"/>
                <meta
                    key="theme-color"
                    name="theme-color"
                    content={settings.theme}
                />
                <meta key="keywords" name="keywords" content={settings[getLocalized()]}/>
                <meta key="author" name="author" content={settings[getLocalized()]}/>
                <meta key="country" name="country" content={settings[getLocalized('country')]}/>
                <meta key="mobile" name="mobile" content={settings.mobile}/>
                <meta key="whatsapp" name="whatsapp" content={settings.whatsapp}/>
                <meta key="phone" name="phone" content={settings.phone}/>
                <meta key="logo" name="logo" content={getThumb(settings.image)}/>
                <meta key="email" name="email" content={settings.email}/>
                <meta key="address" name="address" content={settings[getLocalized('address')]}/>
                <meta key="name" name="name" content={settings[getLocalized()]}/>
                <meta key="lang" name="lang" content={locale}/>
                <meta
                    name="description"
                    key="description"
                    content={`${settings[getLocalized('description')]}`}
                />
                <meta itemProp="name" content={settings[getLocalized()]}/>
                <meta itemProp="description" content={`${settings[getLocalized('description')]}`}/>
                <meta itemProp="image" content={getThumb(settings.image)}/>
                <meta property="og:type" content="website" key="ogtype"/>
                <meta
                    property="og:site_name"
                    content={`${settings[getLocalized()]}`}
                    key="ogsitename"
                />
                <meta property="og:url" content={settings.apple} key="ogurl"/>
                <meta
                    property="og:title"
                    content={`${settings[getLocalized()]}`}
                    key="ogtitle"
                />
                <meta property="og:description" content={settings[getLocalized('description')]} key="ogdesc"/>
                <meta property="og:image" content={getThumb(settings.image)} key="ogimage"/>
            </Head>
            {/*<ConfirmationModal/>*/}
            {/*{isLoading && <LoadingView/>}*/}
            <main
                className={classNames(locale.isRTL ? 'font-bein' : 'font-tajwal-medium', "flex-1 relative z-0 focus:outline-none max-w-full bg-white font-extrabold capitalize")}>
                <MainNav/>
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
