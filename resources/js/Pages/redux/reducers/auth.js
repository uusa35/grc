import { SET_AUTH } from "../actions/types";

export default function(auth = [], action) {
    switch (action.type) {
        case SET_AUTH:
            return action.payload;
        default:
            return auth;
    }
}
