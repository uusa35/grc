import {Head, Link} from "@inertiajs/inertia-react";
import React, {useContext} from 'react';
import GlobalContext from "../../context/GlobalContext";
import {capitalize} from "lodash";
import pluralize from "pluralize";

const MetaElement = ({metas}) => {
    const {locale, getLocalized, getImageThumb , trans , parentModule } = useContext(GlobalContext);

    return (
        <Head title={`${capitalize(trans(pluralize(parentModule)))} :: ${metas[getLocalized()]}`}>
            <meta head-key="title" name="title" content={metas[getLocalized()]}/>
            <meta head-key="description" name="description" content={metas[getLocalized('description')]}/>
            <link href={getImageThumb(metas.logo)} rel="shortcut icon" type="image/png"/>
            <link rel="icon" type="image/svg+xml" href={getImageThumb(metas.image)}/>
            <meta
                http-equiv="Content-type"
                charSet="utf-8"
                content="text/html; charset=utf-8"
            />
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>{metas[getLocalized()]}</title>
            <meta name="title" content={metas[getLocalized()]}/>
            <link href={getImageThumb(metas.image)} rel="shortcut icon" type="image/png"/>
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
            <meta key="logo" name="logo" content={getImageThumb(metas.image)}/>
            <meta key="email" name="email" content={metas.email}/>
            <meta key="address" name="address" content={metas.address}/>
            <meta key="name" name="name" content={metas[getLocalized()]}/>
            <meta key="lang" name="lang" content={locale}/>
            <meta
                name="description"
                key="description"
                content={`${metas[getLocalized('description')]}`}
            />
            <meta itemProp="name" content={metas[getLocalized()]}/>
            <meta itemProp="description" content={`${metas[getLocalized('description')]}`}/>
            <meta itemProp="image" content={getImageThumb(metas.image)}/>
            <meta property="og:type" content="website" key="ogtype"/>
            <meta
                property="og:site_name"
                content={`${metas[getLocalized()]}`}
                key="ogsitename"
            />
            <meta property="og:url" content={metas.apple} key="ogurl"/>
            <meta
                property="og:title"
                content={`${metas[getLocalized('description')]}`}
                key="ogtitle"
            />
            <meta
                property="og:title"
                content={`${metas[getLocalized('description')]}`}
                key="ogtitle"
            />
            <meta property="og:description" content={metas[getLocalized()]} key="ogdesc"/>
            <meta property="og:image" content={getImageThumb(metas.image)} key="ogimage"/>
        </Head>
    );
};

export default MetaElement;
