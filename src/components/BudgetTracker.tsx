//Este compoente nos dice cuanto definimos, cuanto gastamos y cuanto nos queda.
import { AmountDisplay } from "./AmountDisplay"
import { useBuget } from "../hooks/useBudget"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

const BudgetTracker = () => {

    const { state, totalExpenses, reminingBudget, dispatch } = useBuget();

    //porcentaje para la progressbar
    //Total gastado entre presupuesto, por cien, el toFixed es pa redondear los decimales
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className=" flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? "#DC2626" : "#3b82f6",
                        trailColor: "rgba(245, 245, 245, 0.5)",
                        textSize: 10,
                        textColor: percentage === 100 ? "#DC2626" : "#3b82f6"

                    })}
                    text={`${percentage}% Gastado`}


                />
            </div>

            <div className=" flex flex-col justify-center items-center gap-8">
                <button className="bg-pink-600 dark:bg-pink-600 w-full p-2 rounded-md text-white uppercase font-bold m-5"
                    onClick={() => dispatch({ type: 'reset-app' })}
                >
                    Reset App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={reminingBudget}

                />
                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}

                />

            </div>

        </div>
    )
}

export default BudgetTracker