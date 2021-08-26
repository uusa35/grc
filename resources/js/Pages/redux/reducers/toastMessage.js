import { SET_TOAST_MESSAGE , CLEAR_TOAST_MESSAGE } from "../actions/types";

const initialState = {title: '', message: '', type: 'info', display: false}
export default function(toastMessage = initialState, action) {
    switch (action.type) {
        case SET_TOAST_MESSAGE:
            return {
                ...toastMessage,
                title: action.payload.title,
                message: action.payload.message,
                type: action.payload.type ? action.payload.type : 'info',
                display: true
            };
        case CLEAR_TOAST_MESSAGE:
            return initialState;
        default:
            return toastMessage;
    }
}
