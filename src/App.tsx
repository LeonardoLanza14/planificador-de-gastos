import DarkModeButton from "./components/DarkModeButton"
import BudgetForm from "./components/BudgetForm"
import { useBuget } from "./hooks/useBudget"
import { useEffect, useMemo } from "react"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {

  const { state } = useBuget()

  //Una vez que cambie el budget, se ejecuta la funcion isValidBudget
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="relative bg-blue-600 dark:bg-[#2b2a2a] py-8 shadow-lg max-h-72">
        <h1 className=" uppercase md:text-center text-left ml-5 md:left-0 font-black text-2xl md:text-4xl text-white">
          planificador de gastos
        </h1>

        <div className=" absolute md:right-8 right-2 top-8">
          <DarkModeButton />
        </div>
      </header>


      <div className=" max-w-3xl mx-auto bg-white dark:bg-[#2b2a2a] shadow-lg dark:shadow-black rounded-lg mt-10 p-10">

        {isValidBudget ?
          <BudgetTracker />
          :
          <BudgetForm />

        }

      </div>
      {isValidBudget && (

        <main className=" max-w-3xl mx-auto py-10">

          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />

        </main>

      )}


    </>
  )
}

export default App
