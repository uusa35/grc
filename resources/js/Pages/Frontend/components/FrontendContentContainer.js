import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";
import {motion } from 'framer-motion';



const containerVariants = {
    hidden : {
        opacity : 0
    },
    visible : {
        opacity  : 1 ,
        // transition : { delay : 0.2 },
    },
    exit : {
        x : '-100vw',
        // transition : { ease : 'easeInOut', delay : 0.5 }
    }
}

export default function({children, showBreadCrumbs = true, childName = '', parentModuleName = null}) {
    const { mainBgColor, classNames, currentHome, textColor    } = useContext(AppContext);
    const { settings } = useContext(GlobalContext);

    return (
        <motion.div
            className={classNames(settings.wide_screen && currentHome ? `` : `xl:w-4/5 2xl:w-3/5 m-auto`, ` ${textColor} ${mainBgColor} w-full md:w-full lg:w-full  shadow-xl min-h-screen text-sm`)}
            variants={containerVariants}
            initial={'hidden'}
            animate={'visible'}
            exit={`exit`}
        >
            {showBreadCrumbs && <FrontendBreadCrumbs parentModuleName={parentModuleName} childName={childName}/>}
            {children}
        </motion.div>
    );
}
