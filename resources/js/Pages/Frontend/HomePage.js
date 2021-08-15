/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment, useContext} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import {Head, Link} from "@inertiajs/inertia-react";
import {capitalize, isEmpty} from "lodash";
import pluralize from "pluralize";
import {BackendContext} from "../Backend/context/BackendContext";
import MetaElement from "../Backend/components/partials/MetaElement";
import route from 'ziggy-js';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import MainSlider from "../Backend/components/widgets/slider/MainSlider";
import MainNav from "./partials/header/MainNav";
import FrontendContainer from "./components/FrontendContainer";

const navigation = [
    {name: 'Product', href: '#'},
    {name: 'Features', href: '#'},
    {name: 'Marketplace', href: '#'},
    {name: 'Company', href: '#'},
]

export default function HomePage({auth, settings, slides}) {
    const {trans, parentModule, getLarge, getLocalized, locale, getThumb, isRTL} = useContext(BackendContext);

    console.log('elements', slides);
    return (
        <FrontendContainer>
            <MainSlider elements={slides}/>
            <h1>Categories swiper</h1>
        </FrontendContainer>
    )
}
