import React, {useEffect} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useSelector} from "react-redux";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";
import {selectFilter} from "../redux/slices/filterSlice";
import {useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const {categoryId, sort, currentPage, orderType, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    useEffect(() => {
        dispatch(fetchPizzas({categoryId, sort, currentPage, orderType, searchValue}))

        window.scrollTo(0, 0)
    }, [categoryId, sort, orderType, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error'
                ? <div style={{margin: 100, textAlign: 'center'}}>
                    <h2>Ошибка при загрузке данных с сервера, попробуйте позже 😕</h2>
                </div>
                : <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(4)].map((_, index) => <Skeleton key={index}/>)
                        : items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza}/>)
                    }
                </div>
            }
            <Pagination />
        </div>
    );
};

export default Home;