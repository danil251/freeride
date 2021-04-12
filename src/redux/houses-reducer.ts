import {Dispatch} from 'redux'
import {API} from "../api/api";


const initialState: InitialStateType = {
    companies: [],
    houses: [],
    links: {}

}

export const housesReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-COMPANIES":
            return {...state, companies: action.companies}
        case "SET-HOUSES":
            return {...state, houses: action.houses.data, links: action.houses.links}
        case 'LOG-OUT':
            return  {...state, companies: [], houses: [], links: {}}
        default:
            return {...state}
    }
}


export const setCompanies = (companies: Array<comp>) => ({type: 'SET-COMPANIES', companies} as const)
export const setHouses = (houses: any) => ({type: 'SET-HOUSES', houses} as const)
export const logOutCompanies = () => ({type: 'LOG-OUT'} as const)


export const fetchCompanies = () => (dispatch: Dispatch) => {
    API.getCompanies().then(response => {
        dispatch(setCompanies(response.data.data))
    }).catch(() => {
        console.log('error')
    })
}

export const fetchHouses = (id: string | undefined, page: number, perPage: number) => (dispatch: Dispatch) => {
    API.getHouse(id, page, perPage).then(response => {
        dispatch(setHouses(response.data))
    }).catch(() => {
        console.log('error')
    })
}

interface comp {
    id: string

    [key: string]: any
}

interface house {
    id: string
    createdAt: string
    address: string
    reestrFlatCount: string

    [key: string]: any
}

export type links = {
    currentPage?: number
    lastPage?: number | undefined
    nextPage?: number | null
    objectsCount?: number
    prevPage?: number
}
export type InitialStateType = {
    companies: Array<comp>
    houses: Array<house>
    links: links
}

export type SetCompaniesActionType = ReturnType<typeof setCompanies>
export type SetHousesActionType = ReturnType<typeof setHouses>
export type LogOutActionType = ReturnType<typeof logOutCompanies>


type ActionsType =
    | SetCompaniesActionType
    | SetHousesActionType
    | LogOutActionType

