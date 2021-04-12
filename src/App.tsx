import React from 'react';
import s from './App.module.css';
import Authorization from "./components/Authorization/Authorization";
import {useDispatch, useSelector} from "react-redux";
import {InitialStateType, logOut} from "./redux/user-reduser";
import {logOutCompanies} from "./redux/houses-reducer";
import ListOfHouses from "./components/ListOfHouses/ListOfHouses";
import {AppRootStateType} from "./redux/store";

function App() {

    let data = useSelector<AppRootStateType, InitialStateType>(state => state.User)
    const dispatch = useDispatch()
    const logOutHandler = () => {
        localStorage.clear()
        dispatch(logOut())
        dispatch(logOutCompanies())

    }
    return (
        <div className={s.App}>
            <div className={s.header}>
                {data.isAuth ? <div className={s.name}>{data.currentUser}
                    <button className={s.btn} onClick={logOutHandler}> Log out</button>
                </div> : <div></div>}
            </div>
            {data.isAuth ? <ListOfHouses/> : <Authorization error={data.error}/>}
        </div>
    );
}

export default App;
