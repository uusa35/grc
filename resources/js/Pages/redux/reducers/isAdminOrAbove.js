import { SET_IS_ADMIN_OR_ABOVE} from "../actions/types";

export default function(isAdminOrAbove = false, action) {
    switch (action.type) {
        case SET_IS_ADMIN_OR_ABOVE:
            return action.payload;
        default:
            return isAdminOrAbove;
    }
}
