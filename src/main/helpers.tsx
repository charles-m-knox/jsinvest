export const asCurrency = (amount: number): string => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
export const asPercentage = (amount: number): string => {
    return `${amount.toFixed(2)}%`;
}
