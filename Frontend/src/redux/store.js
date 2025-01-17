import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user.slice.js';
import messageReducer from './message.slice.js'
const store = configureStore({
    reducer : {
        user : userReducer,
        message : messageReducer
    }
})

export default store;