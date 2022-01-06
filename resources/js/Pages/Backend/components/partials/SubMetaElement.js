import React, {useContext, useEffect} from 'react';
import {InertiaHead} from "@inertiajs/inertia-react";
import {AppContext} from "../../../context/AppContext";
import GlobalContext from "../../../context/GlobalContext";

const SubMetaElement = ({
                            title = null,
                            image = null,
                            description = null,
                        }) => {
    const { getThumb } = useContext(AppContext);
    const { settings } = useContext(GlobalContext);

    return (
        <InertiaHead>
            <title>{title}</title>
            <meta name="title" content={title}/>
            <meta  name="description"
                  content={description}/>
            <meta itemProp="image" content={getThumb(image)}/>
            <meta property="og:type" content="website" key="ogtype"/>
            <meta
                property="og:title"
                content={title}
                key="ogtitle"
            />
            <meta property="og:description" content={description} key="ogdesc"/>
            <meta property="og:image" content={getThumb(image)} key="ogimage"/>
        </InertiaHead>
    );
};

export default SubMetaElement;
