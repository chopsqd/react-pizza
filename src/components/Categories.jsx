function Categories({activeIndex, setActiveIndex}) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((category, idx) =>
                    <li
                        key={category}
                        onClick={() => setActiveIndex(idx)}
                        className={activeIndex === idx ? 'active' : ''}
                    >{category}</li>)}
            </ul>
        </div>
    )
}

export default Categories