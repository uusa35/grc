import { SET_IS_ADMIN } from "../actions/types";

export default function(isAdmin = false, action) {
    switch (action.type) {
        case SET_IS_ADMIN:
            return action.payload;
        default:
            return isAdmin;
    }
}
