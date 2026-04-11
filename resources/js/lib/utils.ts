import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formartCurreny(amount: number | string): string{
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if(isNaN(num)) return "KES 0.00";
    return `KES ${num.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

export function formatDate(date: string | Date | null | undefined): string{
    if(!date) return "-";
    return new Date(date).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric"})
}