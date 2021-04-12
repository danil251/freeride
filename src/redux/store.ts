import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {userReducer} from "./user-reduser";
import {housesReducer} from "./houses-reducer";

const rootReducer = combineReducers({
    User: userReducer,
    Companies: housesReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
