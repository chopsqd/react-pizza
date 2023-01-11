import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = ({searchValue}) => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности', sortProperty: 'rating'
    })
    const [orderType, setOrderType] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://63bbfb2fcf99234bfa6aa932.mockapi.io/items?limit=4&page=${currentPage}&${categoryId ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${orderType ? 'desc' : 'asc'}${searchValue ? `&search=${searchValue}` : ''}`)
            .then(res => res.json())
            .then(json => {
                setPizzas(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, orderType, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={categoryId} setActiveIndex={setCategoryId}/>
                <Sort selected={sortType} setSelected={setSortType} orderType={orderType} setOrderType={setOrderType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(4)].map((_, index) => <Skeleton key={index}/>)
                    : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)
                }
            </div>
        </div>
    );
};

export default Home;