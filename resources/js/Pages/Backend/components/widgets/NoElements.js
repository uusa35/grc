import {useContext, Fragment} from "react";
import {AppContext} from "../../../context/AppContext";
import { FiSearch } from "react-icons/fi";




const NoElements = ({ display = false }) => {
    const { trans } = useContext(AppContext);
    return (
        <Fragment>
            {display &&
            <div className="flex flex-1 flex-col justify-center items-center w-full h-60 border-2 border-gray-100 p-8 bg-white rounded-md shadow-md">
                <FiSearch  size={150} className={'text-gray-200'}/>
                {trans('no_elements')}
            </div>}
        </Fragment>
    );
}

export default NoElements;
