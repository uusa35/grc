import BackendContainer from "./../components/containers/BackendContainer";

export default function ProductEdit({ element }) {
    return (
        <BackendContainer>
        <h1>ProductEdit Id : {element.id}</h1>
        </BackendContainer>
    )
}
