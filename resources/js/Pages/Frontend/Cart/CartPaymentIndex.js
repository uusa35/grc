import FrontendContainer from "../components/FrontendContainer";
import FrontendContentContainer from "../components/FrontendContentContainer";
import CartStepper from "./CartStepper";

export default function() {
    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <div className="w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 ">
                    <CartStepper activeStep={4}/>
                    <h1>CartPaymentIndex</h1>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
