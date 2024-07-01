import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export const useBuget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('Debe envolver la aplicacion en un BudgetProvider')
    } else {
        return context;
    }
}