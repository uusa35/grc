import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import React from "react";

export default function({children, showBreadCrumbs = true, childName = ''}) {
    return (
        <div className="w-4/5 sm:w-4/5 lg:3/5 2xl:w-3/5 m-auto shadow-xl min-h-screen pb-10">
            {showBreadCrumbs && <FrontendBreadCrumbs childName={childName}/>}
            {children}
        </div>
    );
}
