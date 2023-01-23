import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = useState<{
        imageUrl: string
        title: string
        price: number
    }>()

    const fetchOnePizza = async () => {
        try {
            const {data} = await axios.get(`https://63bbfb2fcf99234bfa6aa932.mockapi.io/items?id=${id}`)

            if(!data.length) {
                alert('Пицца не найдена!')
                navigate('/')
            }

            setPizza(data[0])
        } catch(error: any) {
            alert(`Ошибка при получении пиццы! (${error.message})`)
            navigate('/')
        }
    }

    useEffect(() => {
        fetchOnePizza()
    }, [])

    if(!pizza) {
        return <div className={"container"} style={{textAlign: "center", margin: 100}}>
            <h2>Загрузка...</h2>
        </div>
    }

    return (
        <div className={"container"} style={{display: "flex"}}>
            <img width={500} height={500} src={pizza.imageUrl} alt={pizza.title}/>
            <div>
                <h2>{pizza.title}</h2>
                <h4>{pizza.price} ₽</h4>
            </div>
        </div>
    );
};

export default FullPizza;