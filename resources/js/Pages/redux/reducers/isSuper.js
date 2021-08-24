import { SET_IS_SUPER } from "../actions/types";

export default function(isSuper = false, action) {
    switch (action.type) {
        case SET_IS_SUPER:
            return action.payload;
        default:
            return isSuper;
    }
}
