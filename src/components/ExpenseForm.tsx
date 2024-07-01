import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import type { DraftExpense, Value } from '../types';
import { categories } from '../data/categories';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css'
import ErrorMessage from './ErrorMessage';
import { useBuget } from '../hooks/useBudget';


const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const { dispatch, state, reminingBudget } = useBuget()


    //En caso de que editingId cambie
    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense);
            setPreviousAmount(editingExpense.amount);
        }

    }, [state.editingId])


    //Cambiar la fecha
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        //Esto hace que si estamos escribiendo en amount nos devuelva un true, si no false
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            //Si estamos escribiendo en amount, el value sera un numero 
            [name]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //validar
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        //Verificar que no me pase del limite del presupuesto
        if ((expense.amount - previousAmount) > reminingBudget) {
            setError('Ese gasto se sale del presupuesto')
            return
        }

        //Agregar o actualizar un nuevo gasto 

        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }


        //Reiniciar formulario
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)


    }


    return (
        <>
            <form className='space-y-5' onSubmit={handleSubmit}>
                <legend
                    className=' uppercase text-center text-2xl text-gray-800 border-blue-500 font-black border-b-4 py-2'
                >
                    {state.editingId ? 'Editar cambios' : 'Nuevo gasto'}
                </legend>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor="expenseName"
                        className=' text-xl'
                    >
                        Nombre del gasto
                    </label>
                    <input
                        type="text"
                        placeholder='Nombre del gasto'
                        id='expenseName'
                        name='expenseName'
                        className='bg-slate-100 p2'
                        value={expense.expenseName}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor="amount"
                        className=' text-xl'
                    >
                        Cantidad
                    </label>
                    <input
                        type="number"
                        placeholder='Añade la cantidad del gasto Ej. 300'
                        id='amount'
                        name='amount'
                        className='bg-slate-100 p2'
                        value={expense.amount}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor="category"
                        className=' text-xl'
                    >
                        Categoria:
                    </label>
                    <select
                        id='category'
                        name='category'
                        className='bg-slate-100 p2'
                        value={expense.category}
                        onChange={handleChange}

                    >
                        <option value="">--seleccione--</option>
                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor="amount"
                        className=' text-xl'
                    >
                        Fecha Gasto:
                    </label>
                    <DatePicker
                        className=" bg-slate-100 p-2 border-0"
                        value={expense.date}
                        onChange={handleChangeDate}
                    />
                </div>

                <input
                    type="submit"
                    className=' bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
                    value={state.editingId ? 'Actualizar' : 'Registrar gasto'}
                />
            </form>

        </>
    )
}

export default ExpenseForm