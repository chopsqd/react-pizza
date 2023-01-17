import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {AppContext} from "../App";
import {setCategoryId} from '../redux/slices/filterSlice'
import {useDispatch, useSelector} from "react-redux";

const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort} = useSelector(state => state.filter)

    const {searchValue} = useContext(AppContext)
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const [orderType, setOrderType] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://63bbfb2fcf99234bfa6aa932.mockapi.io/items?limit=4&page=${currentPage}&${categoryId ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=${orderType ? 'desc' : 'asc'}${searchValue ? `&search=${searchValue}` : ''}`)
            .then(res => res.json())
            .then(json => {
                setPizzas(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort, orderType, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={categoryId} setActiveIndex={onChangeCategory}/>
                <Sort orderType={orderType} setOrderType={setOrderType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(4)].map((_, index) => <Skeleton key={index}/>)
                    : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)
                }
            </div>
            <Pagination setCurrentPage={(number) => setCurrentPage(number)}/>
        </div>
    );
};

export default Home;