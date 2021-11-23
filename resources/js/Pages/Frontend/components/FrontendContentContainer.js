import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import React from "react";

export default function({children, showBreadCrumbs = true, childName = '', parentModuleName = null}) {
    return (
        <div className="w-4/5 sm:w-full lg:w-full xl:w-4/5 2xl:w-4/5 m-auto shadow-xl min-h-screen pb-10 text-sm">
            {showBreadCrumbs && <FrontendBreadCrumbs parentModuleName={parentModuleName} childName={childName}/>}
            {children}
        </div>
    );
}
