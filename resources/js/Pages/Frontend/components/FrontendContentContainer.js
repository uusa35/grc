import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";

export default function({children, showBreadCrumbs = true, childName = '', parentModuleName = null}) {
    const { mainBgColor, classNames, currentHome, textColor    } = useContext(AppContext);
    const { settings } = useContext(GlobalContext);

    return (
        <div className={classNames(settings.wide_screen && currentHome ? `` : `xl:w-4/5 2xl:w-3/5 m-auto`, ` ${textColor} ${mainBgColor} w-full md:w-full lg:w-full  shadow-xl min-h-screen text-sm`)}>
            {showBreadCrumbs && <FrontendBreadCrumbs parentModuleName={parentModuleName} childName={childName}/>}
            {children}
        </div>
    );
}
