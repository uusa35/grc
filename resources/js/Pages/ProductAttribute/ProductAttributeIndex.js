import BackendContainer from "../components/containers/BackendContainer";
import route from 'ziggy-js';

const ProductAttributeIndex = ({ element }) => {
    const { params } = route();
    console.log('the params', params);
    return (
        <BackendContainer>
            <h1>Product Attribute Index</h1>
        </BackendContainer>
    )
}

export default ProductAttributeIndex;
