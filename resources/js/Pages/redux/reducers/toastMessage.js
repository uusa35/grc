const initialState = {title: '', message: '', type: 'info', display : false }
export default function(toastMessage = initialState, action) {
    switch (action.type) {
        case 'SET_TOAST_MESSAGE':
            return action.payload;
        case 'CLEAR_TOAST_MESSAGE':
            return initialState;
        default:
            return toastMessage;
    }
}
