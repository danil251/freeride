import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setLogin} from "../../redux/user-reduser";
import s from './Authorization.module.css'

type PropsType = {
    error: string
}

function Authorization (props: PropsType) {
    const [email, setEmail] = useState<string>('superuser@mail.ru')
    const [password, setPassword] = useState<string>('11111111')
    const dispatch = useDispatch()

    const login = () => {
        dispatch(setLogin(email, password))
    }
    return (
        <div className={s.form}>
            <input className={s.input} type="email" onChange={(e) => {setEmail(e.currentTarget.value)}} value={email}/>
            <input className={s.input} type="password" onChange={(e) => {setPassword(e.currentTarget.value)}} value={password}/>
            <div className={s.error}>{props.error? props.error: ''}</div>
            <button className={s.logIn} onClick={login}>Log in</button>
        </div>
    );
};

export default Authorization;