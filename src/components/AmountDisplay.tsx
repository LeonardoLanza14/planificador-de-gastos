import { formatCurrenncy } from "../helpers";

type AmountDisplayProps = {
    label?: string;
    amount: number;
}

export const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {

    return (
        <>
            <div>
                <p className=" text-2xl text-blue-600 dark:text-[#03DAC6] font-bold uppercase">
                    {label} {" "}
                    <span className=" font-black text-gray-800 dark:text-slate-200">
                        {formatCurrenncy(amount)}
                    </span>
                </p>

            </div>
        </>
    )
}
