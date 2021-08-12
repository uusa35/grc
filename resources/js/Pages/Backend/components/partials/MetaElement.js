import {Head, Link} from "@inertiajs/inertia-react";
import React, {useContext} from 'react';
import GlobalContext from "../../context/GlobalContext";

const MetaElement = ({metas}) => {
    const {locale, getLocalized} = useContext(GlobalContext);

    return (
        <>
            <meta
                http-equiv="Content-type"
                charSet="utf-8"
                content="text/html; charset=utf-8"
            />
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>{metas[getLocalized()]}</title>
            <meta name="title" content={metas[getLocalized()]}/>
            <link href={metas.logo} rel="shortcut icon" type="image/png"/>
            <meta name={metas[getLocalized()]} content="E-commerce"/>
            <meta
                key="theme-color"
                name="theme-color"
                content={metas.colors.main_theme_color}
            />
            <meta key="keywords" name="keywords" content={metas[getLocalized()]}/>
            <meta key="author" name="author" content={metas[getLocalized()]}/>
            <meta key="country" name="country" content={metas.country}/>
            <meta key="mobile" name="mobile" content={metas.mobile}/>
            <meta key="whatsapp" name="whatsapp" content={metas.whatsapp}/>
            <meta key="phone" name="phone" content={metas.phone}/>
            <meta key="logo" name="logo" content={metas.logo}/>
            <meta key="email" name="email" content={metas.email}/>
            <meta key="address" name="address" content={metas.address}/>
            <meta key="name" name="name" content={metas[getLocalized()]}/>
            <meta key="lang" name="lang" content={locale}/>
            <meta
                name="description"
                key="description"
                content={`${metas.description}`}
            />
            <meta itemProp="name" content={metas[getLocalized()]}/>
            <meta itemProp="description" content={`${metas.description}`}/>
            <meta itemProp="image" content={metas.logo}/>
            <meta property="og:type" content="website" key="ogtype"/>
            <meta
                property="og:site_name"
                content={`${metas[getLocalized()]}`}
                key="ogsitename"
            />
            <meta property="og:url" content={metas.apple} key="ogurl"/>
            <meta
                property="og:title"
                content={`${metas.description}`}
                key="ogtitle"
            />
            <meta
                property="og:title"
                content={`${metas.description}`}
                key="ogtitle"
            />
            <meta property="og:description" content={metas[getLocalized()]} key="ogdesc"/>
            <meta property="og:image" content={metas.logo} key="ogimage"/>
        </>
    );
};

export default MetaElement;
