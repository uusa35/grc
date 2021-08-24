const initialState = {desc: true , colName : 'id' }
export default function(sort = initialState, action) {
    switch (action.type) {
        case 'SET_SORT':
            return action.payload;
        default:
            return sort;
    }
}
