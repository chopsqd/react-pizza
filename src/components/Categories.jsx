import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId} from "../redux/slices/filterSlice";

function Categories() {
    const dispatch = useDispatch()
    const {categoryId} = useSelector(selectFilter)
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

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