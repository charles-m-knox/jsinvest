import { Account, Allocation, Strategy, Symbol, Result } from './models';

// const getStrategyForSymbol = (strategies: Strategy[], symbolName: string): Strategy | null => {
//     const result = strategies.filter((strategy: Strategy) => {
//         const strategySearchResults = strategy.symbols.filter((symbol: Symbol) => {
//             if (symbol.symbol === symbolName) {
//                 return symbol
//             }
//         })
//     })
//     if (results.length === 1) {
//         return results[0]
//     }
//     return null
// }

const getAllocation = (strategy: Strategy, allocationType: string): Allocation => {
    const results = strategy.allocations.filter((allocation: Allocation, i: number) => {
        if (allocation.type === allocationType) {
            console.log(allocation);
            return allocation;
        }
    })

    if (results.length === 1) {
        return results[0];
    }
    console.warn('matched multiple or no allocations, should only have found one');
    return { type: '', amount: 0.0 };
}

export const BalanceAccount = (account: Account, strategy: Strategy, quotes: any): Result[] => {
    // first, group symbols according to their classification
    // https://github.com/charles-m-knox/goinvest/blob/main/helpers/helpers.go#L21-L28
    const results: Result[] = [];
    const groups: any = {};
    strategy.symbols.forEach((symbol: Symbol, i: number) => {
        if (!groups[symbol.type]) {
            groups[symbol.type] = {};
        }
        groups[symbol.type][symbol.symbol] = {};
    });

    console.log(groups);

    // now that symbols are all grouped, proceed to apply allocations
    Object.keys(groups).forEach((group: string, i: number) => {
        // Need to retrieve the allocation percentage for a group by its name
        // strategy -> allocations -> group
        const groupAllocation = getAllocation(strategy, group);
        if (groupAllocation.type) {
            // example: if 3 symbols are "large", and the "large" group gets 30%
            // of $10k, groupAllocationAmount = 3000
            const groupAllocationAmount = (groupAllocation.amount / 100.0) * account.balance;

            // example: if 3 symbols are "large", and the "large" group gets 30%
            // of $10k, allocPercentageFromTotal = 10%
            const allocPercentageFromTotal = groupAllocation.amount / (Object.keys(groups[group]).length)

            // example: if 3 symbols are "large", and the "large" group gets 30%
            // of $10k, allocPerSymbol = 1000
            const allocPerSymbol = groupAllocationAmount / (Object.keys(groups[group]).length)

            console.log(groupAllocationAmount, allocPercentageFromTotal, allocPerSymbol);
            Object.keys(groups[group]).forEach((symbol: string, j: number) => {
                quotes.forEach((quote: any, k: number) => {
                    // if (quote.symbol === symbol) {
                    const shares = Math.floor(allocPerSymbol / quote.price);
                    const totalAllocated = shares * quote.price;
                    groups[group][symbol] = {
                        shares: shares,
                        sharePrice: quote.price,
                        remainder: allocPerSymbol - totalAllocated,
                        totalAllocated: totalAllocated,
                        idealAllocation: allocPerSymbol,
                        idealGroupAllocationPercentage: groupAllocation.amount,
                        idealSymbolAllocationPercentage: allocPercentageFromTotal,
                    };
                    const newResult = {
                        name: account.name,
                        symbol: symbol,
                        type: group,
                        shares: shares,
                        sharePrice: quote.price,
                        purchasePrice: totalAllocated,
                        allocated: allocPerSymbol,
                        remainder: groups[group][symbol].remainder,
                        symbolAllocationPercentage: groups[group][symbol].idealSymbolAllocationPercentage,
                        groupAllocationPercentage: groups[group][symbol].idealGroupAllocationPercentage,
                        fromBalance: account.balance,
                    };
                    console.log(newResult);
                    results.push(newResult);
                    // }
                })
            })
            console.log(groups);
        }
    });
    return results;
}
