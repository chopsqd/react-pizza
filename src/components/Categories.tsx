import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId} from "../redux/slices/filterSlice";

const Categories: React.FC = () => {
    const dispatch = useDispatch()
    const {categoryId} = useSelector(selectFilter)

    const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((category, idx) =>
                    <li
                        key={category}
                        onClick={() => dispatch(setCategoryId(idx))}
                        className={categoryId === idx ? 'active' : ''}
                    >{category}</li>)}
            </ul>
        </div>
    )
}

export default Categories