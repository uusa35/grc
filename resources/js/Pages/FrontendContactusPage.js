
import FrontendContainer from "./components/containers/FrontendContainer";
import {Head} from "@inertiajs/inertia-react";
import {useContext} from "react";
import GlobalContext from "./context/GlobalContext";

const FrontendContactusPage = ({ elements }) => {
    const { settings } = useContext(GlobalContext);
    console.log('settings', settings);
    return (
        <FrontendContainer>
            <Head>
                <title>Contactus Page</title>
                <meta name="description" content="Contactus" />
            </Head>
        <div className="h-screen">
            <h1 className="text-lg p-10">Contact us testing</h1>
            <h1 className="text-lg p-10">{settings.name_ar}</h1>

        </div>
        </FrontendContainer>
    )
}


export default FrontendContactusPage;
