import BackendContainer from "../components/containers/BackendContainer";


const UserEdit = ({ element }) => {
    return (
        <BackendContainer>
            <h1>User Edit Id : {element.id}</h1>
        </BackendContainer>
    )
}

export default UserEdit;
