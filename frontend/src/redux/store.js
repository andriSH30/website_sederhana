const { createStore } = require('redux');

const initialState = {
    dataUser: {
        token: null,
    }
}

const reducer = (state = initialState, action) => {
    if(action.type === "LOGIN"){
        return {
            ...state,
            dataUser: action.payload
        }
    }
    if(action.type === "LOGOUT"){
        return {
            ...state,
            dataUser: action.payload
        }
    }
    return state;
}

const store = createStore(reducer);

export default store;