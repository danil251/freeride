import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCompanies, fetchHouses, InitialStateType} from "../../redux/houses-reducer";
import {AppRootStateType} from "../../redux/store";
import s from './ListOfHouses.module.css'


function ListOfHouses() {

    let data = useSelector<AppRootStateType, InitialStateType>(state => state.Companies)
    let [id, setId] = useState<string>()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCompanies())

    }, [dispatch])

    let click = (e: ChangeEvent<HTMLSelectElement>) => {
        let tar = e.currentTarget.value
        setId(tar)
        dispatch(fetchHouses(tar, 1, 10))
    }
    let pagination = (page: number) => {
        dispatch(fetchHouses(id, page, 10))
    }


    let item = data.companies.map(m => <option value={m.id} key={m.id}>{m.name}</option>)
    let house = data.houses.map(m => {
        let date = new Date(m.createdAt)
        let formDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
        return <div className={s.select}
                    key={m.id}>id: {m.id} address: {m.address} reestrFlatCount: {m.reestrFlatCount} createdAt: {formDate}</div>
    })

    let pages = [];
    // @ts-ignore
    for (let i = 1; i <= data.links.lastPage; i++) {
        pages.push(i)
    }

    return (
        <div className={s.container}>
            <span>Name of the company: </span>
            <select onChange={click}>
                {item}
            </select>
            {house}
            {data.links.objectsCount !== 0 ? pages.map(p => <span key={p}
                                                                  className={data.links.currentPage === p ? `${s.active} ${s.link}` : s.link}
                                                                  onClick={() => pagination(p)}>{p}</span>) :
                <div className={s.error}>Nothing found</div>}
        </div>
    );
};

export default ListOfHouses;