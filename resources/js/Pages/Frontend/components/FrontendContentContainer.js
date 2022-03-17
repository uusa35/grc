import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";

export default function({children, showBreadCrumbs = true, childName = '', parentModuleName = null}) {
    const { mainBgColor, classNames, currentHome   } = useContext(AppContext);
    const { settings } = useContext(GlobalContext);

    return (
        <div className={classNames(settings.wide_screen && currentHome ? `` : `xl:w-4/5 2xl:w-3/5 m-auto`, `bg-white dark:bg-${mainBgColor}-700 w-full md:w-full lg:w-full  shadow-xl min-h-screen pb-10 text-sm`)}>
            {showBreadCrumbs && <FrontendBreadCrumbs parentModuleName={parentModuleName} childName={childName}/>}
            {children}
        </div>
    );
}
