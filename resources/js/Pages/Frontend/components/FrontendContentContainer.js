import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";
import {motion } from 'framer-motion';

export default function({children, showBreadCrumbs = true, childName = '', parentModuleName = null}) {
    const { mainBgColor, classNames, currentHome, textColor    } = useContext(AppContext);
    const { settings } = useContext(GlobalContext);

    return (
        <motion.div
            className={classNames(settings.wide_screen && currentHome ? `` : `xl:w-4/5 2xl:w-3/5 m-auto`, ` ${textColor} ${mainBgColor} w-full md:w-full lg:w-full  shadow-xl min-h-screen text-sm`)}
            initial={{ opacity  : 0.2 }}
            animate={{ opacity : 1  }}
            transtion={{ stiffness : 300 }}
        >
            {showBreadCrumbs && <FrontendBreadCrumbs parentModuleName={parentModuleName} childName={childName}/>}
            {children}
        </motion.div>
    );
}
