import { Config } from './models';

export const GetCompleteExample = (): Config => {
    return {
        strategies: [
            {
                name: "Retirement",
                symbols: [
                    { symbol: "SCHA", type: "small" },
                    { symbol: "SCHB", type: "broad" },
                    { symbol: "SCHD", type: "large" },
                    { symbol: "SCHF", type: "international" },
                    { symbol: "SCHG", type: "large" },
                    { symbol: "SCHX", type: "large" },
                ],
                allocations: [
                    { type: "fixed", amount: 5.0 },
                    { type: "small", amount: 10.0 },
                    { type: "medium", amount: 10.0 },
                    { type: "large", amount: 10.0 },
                    { type: "international", amount: 10.0 },
                    { type: "broad", amount: 10.0 },
                    { type: "cash", amount: 2.0 },
                    { type: "stock", amount: 0.0 },
                ]
            },
            {
                name: "Hodl",
                symbols: [
                    { symbol: "GME", type: "stock" },
                ],
                allocations: [
                    { type: "cash", amount: 2.0 },
                    { type: "stock", amount: 98.0 },
                ]
            },
            {
                name: "BigTechStocks",
                symbols: [
                    { symbol: "AAPL", type: "stock" },
                    { symbol: "AMZN", type: "stock" },
                    { symbol: "FB", type: "stock" },
                    { symbol: "GOOG", type: "stock" },
                    { symbol: "INTC", type: "stock" },
                    { symbol: "AMD", type: "stock" },
                    { symbol: "NVDA", type: "stock" },
                ],
                allocations: [
                    { type: "cash", amount: 2.0 },
                    { type: "stock", amount: 98.0 },
                ]
            },
        ],
        accounts: [
            { name: '401k', balance: 50500.0, strategy: 'Retirement' },
            { name: 'Brokerage 1', balance: 10000.0, strategy: 'Hodl' },
            { name: 'Brokerage 2', balance: 10000.0, strategy: 'BigTechStocks' },
        ]

    }
};

export const GetEmptyExample = (): Config => {
    return {
        strategies: [
            {
                name: "Retirement",
                symbols: [
                    { symbol: "SCHA", type: "small" },
                ],
                allocations: [
                    { type: "broad", amount: 10.0 },
                ]
            },
        ],
        accounts: [
            { name: '401k', balance: 50500.0, strategy: 'Retirement' },
        ]
    }
}


// balances:
// - name: Stonks
// balance: 1000000
// portfolio: Hodl
//     - name: 401k
// balance: 500000.00
// portfolio: Retirement
//     - name: HSA
// balance: 50000.00
// portfolio: Retirement
