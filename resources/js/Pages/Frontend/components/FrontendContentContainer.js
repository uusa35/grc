import FrontendBreadCrumbs from "./FrontendBreadCrumbs";
import React, {useContext} from "react";
import MetaElement from "../../Backend/components/partials/MetaElement";
import GlobalContext from "../../context/GlobalContext";
import FrontendContainer from "./FrontendContainer";

export default function({children, showBreadCrumbs = true, childName = ''}) {
    const { settings } = useContext(GlobalContext);
    return (
        <div className="w-4/5 sm:w-4/5 lg:3/5 2xl:w-3/5 m-auto shadow-xl">
            {showBreadCrumbs && <FrontendBreadCrumbs childName={childName}/>}
            {children}
        </div>
    );
}
