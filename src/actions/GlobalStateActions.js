import * as types from "../actions/types/GlobalStateActionTypes";

const SetCurrentAction = (payload) => {
    return { type: types.SET_CURRENT_ACTION, payload };
}

export {
    SetCurrentAction,
}
