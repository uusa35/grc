import {useContext, useEffect, useMemo} from "react";
import {BackendContext} from "../../context/BackendContext";
import {Inertia} from "@inertiajs/inertia";

const LoadingView = () => {
    const { disableLoading, isLoading } = useContext(BackendContext);

    // useMemo(() => {
    //     if(isLoading) {
    //         setTimeout(() => disableLoading(), 250)
    //     }
    // })

    return (
        <div className="flex h-screen min-w-full flex-1 justify-center items-center">
            <img
                className="h-20 w-20 mb-96 object-contain"
                src="../../../images/loading.gif" alt={"loading.."}/>
        </div>
    );
}

export default LoadingView;
