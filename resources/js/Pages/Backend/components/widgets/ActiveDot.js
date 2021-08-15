import {useContext} from "react";
import {AppContext} from "../../../context/AppContext";

export default function ActiveDot({ active = false}) {
    const { classNames } = useContext(AppContext);
    return (
        <div
            className={classNames(active ? 'bg-green-600' : 'bg-gray-600', 'flex-shrink-0 w-2.5 h-2.5 rtl:ml-3 ltr:mr-3 rounded-full')}
            aria-hidden="true"></div>
    );
}
