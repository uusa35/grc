import BackendContainer from "../components/containers/BackendContainer";
import route from 'ziggy-js';

const SlideCreate = () => {
    const { params } = route();
    return (
        <BackendContainer>
            <h1>Slide Create</h1>
        </BackendContainer>
    )
}

export default SlideCreate;
