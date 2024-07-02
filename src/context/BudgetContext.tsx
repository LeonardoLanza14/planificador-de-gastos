import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { budgetReducer, initialState, BudgetState, BudegtActions } from "../reducers/budget-reducer"
//Bugdegt es el presupuesto

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudegtActions>,
    totalExpenses: number,
    reminingBudget: number
}
type BudgetProvidersProps = {
    children: ReactNode
}



//Context
//Context es la accion de tener un estado global
export const BudgetContext = createContext<BudgetContextProps>(null!)

//Provider
//Son los datos que tendra ese context
export const BudgetProvider = ({ children }: BudgetProvidersProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)


    //Presupuesto que hemos gastado
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    //Disponible
    const reminingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                reminingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>

    )
}