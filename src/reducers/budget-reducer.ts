import { Expense, DraftExpense, Category } from "../types";
import { v4 as uuidv4 } from 'uuid';


//Paso 1
//Definir las acciones
export type BudegtActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } | //No se le pasa nada porque solo cambia de true a false 
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] } }


//Paso 2
//Definir el state y el initialState

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0;
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}


//Paso 3
//Definir el reducer

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudegtActions
) => {
    if (action.type === 'add-budget') {

        return {
            ...state,
            budget: action.payload.budget
        }
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }
    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }
    if (action.type === 'remove-expense') {
        return ({
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        })
    }
    if (action.type === 'get-expense-id') {
        return ({
            ...state,
            editingId: action.payload.id,
            modal: true
        })
    }
    if (action.type === 'update-expense') {
        return ({
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id
                ? action.payload.expense
                : expense),
            modal: false,
            editingId: '',
        })
    }
    if (action.type === 'reset-app') {
        return ({
            ...state,
            budget: 0,
            expenses: []
        })
    }
    if (action.type === 'add-filter-category') {
        return ({
            ...state,
            currentCategory: action.payload.id
        })
    }

    return state
}
