import { SET_MENU_BG } from "../actions/types";

export default function(menuBg = '', action) {
    switch (action.type) {
        case SET_MENU_BG:
            return action.payload;
        default:
            return menuBg;
    }
}
