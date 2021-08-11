import {useContext, useEffect, useMemo} from "react";
import {BackendContext} from "../../context/BackendContext";
import {Inertia} from "@inertiajs/inertia";

const LoadingView = () => {
    const { toggleIsLoading , isLoading } = useContext(BackendContext);

    // useMemo(() => {
    //     if(isLoading) {
    //         setTimeout(() => toggleIsLoading(false), 2000)
    //     }
    // },[])

    return (
        <div className="flex h-screen min-w-full flex-1 justify-center items-center">
            <img
                className="h-20 w-20 mb-96 object-contain"
                src="../../../images/loading.gif" alt={"loading.."}/>
        </div>
    );
}

export default LoadingView;
