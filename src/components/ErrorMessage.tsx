import { PropsWithChildren } from "react"


const ErrorMessage = ({ children }: PropsWithChildren) => {
    return (
        <>
            <p className="bg-red-600 p-2 text-white font-bold text-md rounded-xl text-center">{children}</p>
        </>
    )
}

export default ErrorMessage