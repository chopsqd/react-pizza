import React, {useContext, useEffect} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {AppContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {fetchPizzas} from "../redux/slices/pizzaSlice";

const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort, currentPage, orderType} = useSelector(state => state.filter)
    const {items, status} = useSelector(state => state.pizza)

    const {searchValue} = useContext(AppContext)

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
                ? <div style={{margin: 100, 'text-align': 'center'}}>
                    <h2>Ошибка при загрузке данных с сервера, попробуйте позже 😕</h2>
                </div>
                : <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(4)].map((_, index) => <Skeleton key={index}/>)
                        : items.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)
                    }
                </div>
            }
            <Pagination />
        </div>
    );
};

export default Home;