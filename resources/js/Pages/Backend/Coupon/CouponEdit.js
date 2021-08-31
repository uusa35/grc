import BackendContainer from "../components/containers/BackendContainer";


export default function({coupon}) {
    return (
        <BackendContainer>
            <h1>edit {coupon.id}</h1>
        </BackendContainer>
    )
}

