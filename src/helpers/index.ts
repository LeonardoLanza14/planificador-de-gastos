export function formatCurrenncy(amount: number) {
    return new Intl.NumberFormat('es-es', { style: 'currency', currency: 'EUR' }).format
        (amount)
}

export function formatDate(date: string): string {
    const dateObj = new Date(date)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}