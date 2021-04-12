import {Dispatch} from 'redux'
import {API} from "../api/api";


const initialState: InitialStateType = {
    currentUser: '',
    isAuth: false,
    error: ''
}

export const userReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER':
            return {...state, currentUser: action.user, isAuth: true, error: ''}
        case 'LOG-OUT' :
            return {...state, currentUser: '', isAuth: false}
        case "ERROR":
            return {...state, error: 'Invalid email / password'}
        default:
            return {...state}
    }
}


export const setUser = (user: string) => ({type: 'SET-USER', user} as const)
export const logOut = () => ({type: 'LOG-OUT'} as const)
export const error = () => ({type: 'ERROR'} as const)

export const setLogin = (username: string, password: string) => (dispatch: Dispatch) => {

    API.getUser(username, password).then(response => {
        dispatch(setUser(response.data.data.user.firstName))
        localStorage.setItem('token', response.data.data.token.access)
    }).catch(() => {
        dispatch(error())
        console.log('error')
    })


}

export type InitialStateType = {
    currentUser: string
    isAuth: boolean
    error: string
}

export type SetUserActionType = ReturnType<typeof setUser>
export type LogOutActionType = ReturnType<typeof logOut>
export type errorActionType = ReturnType<typeof error>


type ActionsType =
    | SetUserActionType
    | LogOutActionType
    | errorActionType

