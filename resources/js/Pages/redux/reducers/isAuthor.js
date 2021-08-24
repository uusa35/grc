import { SET_IS_AUTHOR } from "../actions/types";

export default function(isAuthor = false, action) {
    switch (action.type) {
        case SET_IS_AUTHOR:
            return action.payload;
        default:
            return isAuthor;
    }
}
