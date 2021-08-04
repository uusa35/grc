import {useContext} from "react";
import {BackendContext} from "../../context/BackendContext";

export default function ActiveDot({ active = false}) {
    const { classNames } = useContext(BackendContext);
    return (
        <div
            className={classNames(active ? 'bg-green-600' : 'bg-gray-600', 'flex-shrink-0 w-2.5 h-2.5 rtl:ml-3 ltr:mr-3 rounded-full')}
            aria-hidden="true"></div>
    );
}
