import React, {useEffect} from 'react';
import {InertiaHead} from "@inertiajs/inertia-react";

const SubMetaElement = ({
                            title = null,
                            image = null,
                            description = null,
                        }) => {
    return (
        <InertiaHead>
            <title>{title}</title>
            <meta name="title" content={title}/>
        </InertiaHead>
    );
};

export default SubMetaElement;
