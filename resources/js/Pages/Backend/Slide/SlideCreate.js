import BackendContainer from "../components/containers/BackendContainer";
import route from 'ziggy-js';

const SlideCreate = () => {
    const { params } = route();
    console.log('the params', params);
    return (
        <BackendContainer>
            <h1>Slide Create</h1>
        </BackendContainer>
    )
}

export default SlideCreate;
