import React, {Fragment, useEffect} from "react";
import {isEmpty, map, first} from 'lodash';
import {usePage} from '@inertiajs/inertia-react'
import {hideToastMessage, showToastMessage} from "../../../redux/actions";
import {useDispatch} from "react-redux";



const SystemMessage = () => {
    const dispatch = useDispatch();
    const { errors, error, success} = usePage().props;

    useEffect(() => {
        success && !isEmpty(success) ? dispatch(showToastMessage({message: success, type: 'success'})) : null;
        errors && !isEmpty(errors) ? dispatch(showToastMessage({message: first(map(errors, e => e)), type: 'error'})) : null;
        error && !isEmpty(error) ? dispatch(showToastMessage({message: error, type: 'error'})) : null;
        setTimeout(() => dispatch(hideToastMessage()), 3000)
    }, [success, errors, error])

    return (
        <Fragment></Fragment>
    );
}
export default React.memo(SystemMessage);
