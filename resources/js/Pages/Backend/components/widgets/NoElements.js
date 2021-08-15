import {useContext, Fragment} from "react";
import {AppContext} from "../../../context/AppContext";

const NoElements = ({ display = false }) => {
    const { trans } = useContext(AppContext);
    return (
        <Fragment>
            {display && <div className="w-full p-8 bg-white rounded-md shadow-md">{trans('no_elements')}</div>}
        </Fragment>
    );
}

export default NoElements;
