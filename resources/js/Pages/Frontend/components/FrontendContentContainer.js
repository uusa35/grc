import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";

export default function({children, showBreadCrumbs = true, childName = '', parentModuleName = null}) {
    const { mainBgColor } = useContext(AppContext);
    return (
        <div className={`bg-${mainBgColor}-50 dark:bg-${mainBgColor}-700 w-full md:w-full lg:w-full xl:w-4/5 2xl:w-3/5 m-auto shadow-xl min-h-screen pb-10 text-sm`}>
            {showBreadCrumbs && <FrontendBreadCrumbs parentModuleName={parentModuleName} childName={childName}/>}
            {children}
        </div>
    );
}
