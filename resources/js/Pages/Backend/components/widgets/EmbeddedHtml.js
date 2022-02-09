import PropTypes from 'prop-types';
import {AppContext} from "../../../context/AppContext";
import {useContext} from "react";

export default function EmbeddedHtml({html}) {
    const {mainColor} = useContext(AppContext)
    return <div className={`overflow-hidden w-full h-auto text-${mainColor}-900 dark:text-${mainColor}-50`}
                dangerouslySetInnerHTML={{__html: html}}></div>;
}

EmbeddedHtml.propTypes = {
    html: PropTypes.any.isRequired,
};
