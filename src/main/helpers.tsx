export const asCurrency = (amount: number): string => {
    if (amount) {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    return "";
}
export const asPercentage = (amount: number): string => {
    if (amount) {
        return `${amount.toFixed(2)}%`;
    }
    return "";
}
