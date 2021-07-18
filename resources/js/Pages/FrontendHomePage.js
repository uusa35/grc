import MainSlider from "./components/widgets/slider/MainSlider";
import FrontendContainer from "./components/containers/FrontendContainer";
import {createContext, useContext} from "react";
import GlobalContext from "./context/GlobalContext";
import {Head} from '@inertiajs/inertia-react'

const FrontendHomePage = ({slides}) => {
    const {settings, dir} = useContext(GlobalContext);
    return (
        <FrontendContainer>
            <Head>
                <title>HomePage</title>
                <meta name="description" content="HomePage"/>
            </Head>
            {/*<MainSlider elements={slides}/>*/}
            <div className={`bg-${settings.theme}-900 flex flex-col lg:min-h-screen max-w-7xl mx-auto px-8 py-8`}>
                <h1 className="text-lg p-10">Home</h1>
            </div>
        </FrontendContainer>
    )
}


export default FrontendHomePage;
