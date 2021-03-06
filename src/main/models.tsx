/**
 * An Allocation is a definition for string-number pairs.
 * Example: { 'small': 10.0, 'medium': 10.0 }
 * TODO: implement this correctly
 *
 * @export
 * @interface Allocation
 */
export interface Allocation {
    type: string;
    amount: number;
}

export interface Account {
    name: string;
    balance: number;
    strategy: string;
}

export interface Symbol {
    symbol: string;
    type: string;
}

export interface Strategy {
    name: string;
    symbols: Symbol[];
    allocations: Allocation[];
}

export interface Result {
    name: string;                       // "Name",
    symbol: string;                     // "Symbol",
    type: string;                       // "Type",
    shares: number;                     // "Shares",
    sharePrice: number;                 // "Share Price",
    purchasePrice: number;              // "Purchase Price",
    allocated: number;                  // "Allocated",
    remainder: number;                  // "Remainder",
    symbolAllocationPercentage: number; // "Symbol Allocation %",
    groupAllocationPercentage: number;  // "Group Allocation %",
    fromBalance: number;                // "From Balance",
}

export const ResultHeaders = [
    "Name",
    "Symbol",
    "Type",
    "Shares",
    "Share Price",
    "Purchase Price",
    "Allocated",
    "Remainder",
    "Symbol Allocation %",
    "Group Allocation %",
    "From Balance",
]

export interface Config {
    accounts: Account[];
    strategies: Strategy[];
}
