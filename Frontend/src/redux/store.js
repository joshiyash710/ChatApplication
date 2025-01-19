import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user.slice.js';
import messageReducer from './message.slice.js'
import socketReducer from './socket.slice.js'
const store = configureStore({
    reducer : {
        user : userReducer,
        message : messageReducer,
        socket : socketReducer
    }
})

export default store;