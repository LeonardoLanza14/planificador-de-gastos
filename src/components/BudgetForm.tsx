import { useMemo, useState, FormEvent } from "react"
import { useBuget } from "../hooks/useBudget"

const BudgetForm = () => {
  const [budget, setBudget] = useState(0)
  const { dispatch } = useBuget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value)
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Esto escribe en el budget que declaramos en el reducer, el de tipo number
    dispatch({ type: 'add-budget', payload: { budget } })
  }

  return (
    <>
      <form className=" space-y-5" onSubmit={handleSubmit}>
        <div className=" flex flex-col space-y-5">
          <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center uppercase dark:text-[#03DAC6]">
            Define Tu Presupuesto
          </label>

          <input
            id="budget"
            type="number"
            className="w-ful bg-white border-[1px] rounded-lg border-gray-200 p-2"
            name="budget"
            placeholder="Define tu presupuesto"
            value={budget}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          value='definir presupuesto'
          className=" uppercase bg-blue-600 dark:bg-[#03DAC6] hover:bg-blue-700 dark:hover:bg-[#59d7cbdf] cursor-pointer w-full p-2 disabled:opacity-20 text-white font-black"
          disabled={isValid}
        />


      </form>

    </>
  )
}

export default BudgetForm