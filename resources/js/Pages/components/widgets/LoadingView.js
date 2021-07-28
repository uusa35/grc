import {useContext, useMemo} from "react";
import {BackendContext} from "../../context/BackendContext";

const LoadingView = () => {
    const { disableLoading, isLoading } = useContext(BackendContext);

    useMemo(() => {
        if(isLoading) {
            setTimeout(() =>  disableLoading(), 2000);
        }
    },[])
    return (
        <div className="flex h-screen min-w-full flex-1 justify-center items-center">
            <img
                className="h-20 w-20 mb-96 object-contain"
                src="../../../images/loading.gif" alt={"loading.."}/>
        </div>
    );
}

export default LoadingView;
