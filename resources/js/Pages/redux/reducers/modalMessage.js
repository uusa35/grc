const initialState = {title: '', message: '', type: 'info', display : false }
export default function(modalMessage = initialState, action) {
    switch (action.type) {
        case 'SET_MODAL_MESSAGE':
            return action.payload;
        case 'CLEAR_MODAL_MESSAGE':
            return initialState;
        default:
            return modalMessage;
    }
}
