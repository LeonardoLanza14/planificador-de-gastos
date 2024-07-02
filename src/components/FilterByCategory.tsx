import { categories } from "../data/categories"
import { useBuget } from "../hooks/useBudget"
import { ChangeEvent } from "react"

const FilterByCategory = () => {

    const { dispatch } = useBuget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: { id: e.target.value } })

    }

    return (
        <>
            <div className=" bg-white dark:bg-[#2b2a2a] dark:shadow-black shadow-md rounded-lg p-10">
                <form>
                    <div className=" flex flex-col md:flex-row md:items-center dark:text-slate-200 gap-5">
                        <label htmlFor="category">Filtrar Gastos</label>
                        <select
                            id="category"
                            className=" bg-slate-100 dark:bg-[#6f6e6e] p-3 flex-1 rounded"
                            onChange={handleChange}
                        >
                            <option value="">--Todas las categorias--</option>
                            {categories.map(category => (
                                <option value={category.id}
                                    key={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FilterByCategory