import BackendContainer from "../components/containers/BackendContainer";
import route from 'ziggy-js';

const ProductAttributeCreate = () => {
    const { params } = route();
    console.log('the params', params);
    return (
        <BackendContainer>
            <h1>Product Attribute Create</h1>
        </BackendContainer>
    )
}

export default ProductAttributeCreate;
