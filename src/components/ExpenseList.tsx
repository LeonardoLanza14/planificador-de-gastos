import { useBuget } from "../hooks/useBudget"
import { useMemo } from "react";
import { ExpenseDetail } from "./ExpenseDetail";

const ExpenseList = () => {
    const { state } = useBuget();

    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <>
            <div className=" mt-">
                {isEmpty ?
                    <p className=" text-gray-800 dark:text-slate-200 text-2xl font-bold">Aun no hay gastos</p>
                    : (
                        <>
                            <p className="text-gray-800 dark:text-slate-200 text-2xl font-bold my-5">Listado de gastos</p>
                            {filteredExpenses.map(expense => (
                                <ExpenseDetail
                                    key={expense.id}
                                    expense={expense}
                                />
                            ))}
                        </>
                    )}

            </div>
        </>
    )
}

export default ExpenseList