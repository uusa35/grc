import {Fragment, useContext, useEffect, useMemo} from "react";
import {BackendContext} from "../../context/BackendContext";

const LoadingView = () => {
    const {toggleIsLoading, isLoading} = useContext(BackendContext);

    useMemo(() => {
        if (isLoading) {
            setTimeout(() => toggleIsLoading(false), 250)
            // toggleIsLoading(false)
        }
    }, [])

    return (

        <div
            className="absolute top-0 left-0 z-40 flex items-end justify-center h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0 bg-gray-900 opacity-70 w-full">
            <div className="flex h-screen min-w-full flex-1 justify-center items-center">
                <div className="w-20 h-20 border-t-2 border-b-2 border-gray-400 rounded-full animate-spin"></div>
            </div>
        </div>

    );
}

export default LoadingView;
