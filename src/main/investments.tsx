import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Symbol, Strategy, Account, Allocation, Result, ResultHeaders } from './models'
import { AccountView } from './account'
import StrategyView from './strategy';
import { BalanceAccount } from './balancer';
import { ResultsView } from './results';

const InvestmentsView = () => {
    const getBasicSymbol = (): Symbol => {
        return {
            symbol: 'SCHB',
            type: 'broad',
        }
    }

    const getBasicStrategy = (): Strategy => {
        return {
            name: 'Main',
            symbols: [getBasicSymbol()],
            allocations: [getBasicAllocation()],
        }
    }

    const getBasicAccount = (): Account => {
        return {
            name: '401k',
            balance: 100000.0,
            strategy: 'main',
        }
    }

    const getBasicAllocation = (): Allocation => {
        return {
            type: 'broad',
            amount: 0.0,
        }
    }

    const getBasicResult = (): Result => {
        return {
            name: 'Empty',
            symbol: 'TEST',
            type: 'whoa',
            shares: 0.0,
            sharePrice: 0.0,
            purchasePrice: 0.0,
            allocated: 0.0,
            remainder: 0.0,
            symbolAllocationPercentage: 0.0,
            groupAllocationPercentage: 0.0,
            fromBalance: 0.0,
        }
    }

    const [strategies, setStrategies] = useState([getBasicStrategy()]);
    const [accounts, setAccounts] = useState([getBasicAccount()]);
    const [results, setResults] = useState([getBasicResult()]);

    // const onSymbolChange = (strategyIndex: number, symbolIndex: number, newSymbol: Symbol) => {
    //     const newStrategies = strategies;
    //     newStrategies[strategyIndex].symbols[symbolIndex] = newSymbol;
    //     setStrategies(newStrategies);
    //     console.log(newStrategies);
    // };

    // const onStrategyNameChange = (strategyIndex: number, newName: string) => {
    //     const newStrategies = strategies;
    //     newStrategies[strategyIndex].name = newName;
    //     setStrategies(newStrategies);
    //     console.log(newStrategies);
    //     // setStrategies(strategies.map((strategy: Strategy): Strategy => {
    //     //     if (strategy.name === strategyName) {
    //     //         strategy.name = newName;
    //     //         return strategy;
    //     //     }
    //     //     return strategy;
    //     // }));
    // }

    // const onAddSymbol = (strategyIndex: number, newSymbol: Symbol) => {
    //     const newStrategies = strategies;
    //     newStrategies[strategyIndex].symbols.push(newSymbol);

    //     // TODO: this is a weird workaround to force a state update
    //     const newStrategy0 = strategies[0];
    //     newStrategies[0] = newStrategy0;

    //     setStrategies(newStrategies);
    //     console.log(newStrategies);
    // };

    // const onDelSymbol = (strategyIndex: number, symbolIndex: number) => {
    //     const newStrategies = strategies;
    //     newStrategies[strategyIndex].symbols.splice(symbolIndex, 1);
    //     setStrategies(newStrategies);
    //     console.log(newStrategies);
    // };

    const onStrategyNameChange = (e: any, idx: number) => {
        const newStrategies = [...strategies];
        newStrategies[idx].name = e.target.value;
        // leaving this here if needed
        // newStrategies[e.target.dataset.idx].name = e.target.value;
        setStrategies(newStrategies);
    }

    const addStrategy = () => {
        setStrategies([...strategies, { ...getBasicStrategy() }]);
    }

    const delStrategy = (idx: number) => {
        const newStrategies = strategies.filter((s: Strategy, i: number) => {
            if (i !== idx) {
                return s;
            }
        })

        setStrategies(newStrategies);
    }

    // const getAllocations = (strategy: Strategy): Allocation => {
    //     const allocations: Allocation[] = [getBasicAllocation()];
    //     if (strategy.symbols.length > 0) {
    //         strategy.symbols.forEach((symbol: Symbol) => {
    //             allocations[symbol.type] = 1 / strategy.symbols.length;
    //         });
    //     }
    //     return allocations;
    // }

    // const updateAllAllocations = (strategies: Strategy[]): Strategy[] => {
    //     return strategies.map((strategy: Strategy) => {
    //         // strategy.allocations = getAllocations(strategy);
    //         return strategy;
    //     })
    // }

    const onStrategySymbolAdd = (idx: number) => {
        const newStrategies = strategies.map((strategy: Strategy, i: number) => {
            // strategy.allocations = getAllocations(strategy);
            if (idx === i) {
                strategy.symbols.push(getBasicSymbol());
                return strategy
            }
            return strategy;
        });

        setStrategies(newStrategies);
    }
    const onStrategySymbolDel = (idx: number, symbolIdx: number) => {
        const newStrategies = [...strategies];
        newStrategies[idx].symbols.splice(idx, 1);
        // updateAllAllocations(newStrategies);
        setStrategies(newStrategies);
    }
    const onStrategySymbolChange = (idx: number, symbolIdx: number, newSymbol: Symbol) => {
        const newStrategies = [...strategies];
        newStrategies[idx].symbols[symbolIdx] = newSymbol;
        // updateAllAllocations(newStrategies);
        setStrategies(newStrategies);
    }

    const onAllocationTypeChange = (idx: number, allocationIndex: number, newType: string) => {
        const newStrategies = [...strategies];
        newStrategies[idx].allocations[allocationIndex].type = newType;
        setStrategies(newStrategies);
    }

    const onAllocationAmountChange = (idx: number, allocationIndex: number, newAmount: number) => {
        const newStrategies = [...strategies];
        newStrategies[idx].allocations[allocationIndex].amount = newAmount;
        setStrategies(newStrategies);
    }

    const onAllocationAdd = (idx: number) => {
        const newStrategies = [...strategies];
        newStrategies[idx].allocations.push(getBasicAllocation());
        setStrategies(newStrategies);
    }

    const onAllocationDel = (idx: number, allocationIndex: number) => {
        const newStrategies = [...strategies];
        newStrategies[idx].allocations.splice(allocationIndex, 1);
        setStrategies(newStrategies);
    }

    const onAcctNameChange = (idx: number, newName: string) => {
        const newAccounts = [...accounts];
        newAccounts[idx].name = newName;
        setAccounts(newAccounts);
    }

    const onAcctBalanceChange = (idx: number, newBalance: number) => {
        const newAccounts = [...accounts];
        newAccounts[idx].balance = newBalance;
        setAccounts(newAccounts);
    }

    const onAcctStrategyChange = (idx: number, newStrategy: string) => {
        const newAccounts = [...accounts];
        newAccounts[idx].strategy = newStrategy;
        setAccounts(newAccounts);
    }

    const onAcctAdd = (idx: number) => {
        const newAccounts = [...accounts];
        newAccounts.splice(idx, 0, getBasicAccount());
        setAccounts(newAccounts);
    }

    const onAcctDel = (idx: number) => {
        const newAccounts = [...accounts];
        newAccounts.splice(idx, 1);
        setAccounts(newAccounts);
    }

    const getStrategies = (): string[] => {
        const strategiesObj: any = {};
        strategies.forEach((strategy: Strategy) => {
            strategiesObj[strategy.name] = strategy.name;
        });
        return Object.keys(strategiesObj);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>
                        Step 1. Create a Strategy
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        An investment strategy can be the same across different accounts. For example, you might have a 401k, HSA, and Roth IRA all with long-term growth as the goal, with the <b>same exact investments</b>, but just across different accounts. This is one specific investment <i>strategy</i>.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        strategies.map((_strategy: Strategy, j: number): JSX.Element => {
                            return (
                                <StrategyView
                                    key={`strategyview-${j}`}
                                    idx={j}
                                    strategies={strategies}
                                    onStrategyNameChange={onStrategyNameChange}
                                    onStrategyAdd={addStrategy}
                                    onStrategyDel={delStrategy}
                                    onStrategySymbolAdd={onStrategySymbolAdd}
                                    onStrategySymbolDel={onStrategySymbolDel}
                                    onStrategySymbolChange={onStrategySymbolChange}
                                    onAllocationTypeChange={onAllocationTypeChange}
                                    onAllocationAmountChange={onAllocationAmountChange}
                                    onAllocationAdd={onAllocationAdd}
                                    onAllocationDel={onAllocationDel}
                                ></StrategyView>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>
                        Step 2. Set up Accounts
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        Next, you can create any number of accounts that you want, each with its own balance. Then, you can choose a strategy from above to assign to it.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        accounts.map((_account: Account, idx: number) => {
                            return (
                                <AccountView
                                    key={`accountview-${idx}`}
                                    accounts={accounts}
                                    idx={idx}
                                    onAcctNameChange={onAcctNameChange}
                                    onAcctBalanceChange={onAcctBalanceChange}
                                    onAcctStrategyChange={onAcctStrategyChange}
                                    onAcctAdd={onAcctAdd}
                                    onAcctDel={onAcctDel}
                                    getStrategies={getStrategies}
                                />
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>
                        Step 3. Get results
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={() => {
                        let balancedResults: Result[] = [];
                        accounts.forEach((account: Account) => {
                            strategies.forEach((strategy: Strategy) => {
                                if (strategy.name.toLowerCase() === account.strategy.toLowerCase()) {
                                    const r = BalanceAccount(account, strategy, [{ price: 50.0 }]);
                                    console.log(r);
                                    balancedResults = [...balancedResults, ...r];
                                }
                            })
                        })
                        console.log(balancedResults);
                        setResults([...balancedResults]);
                    }}>
                        Balance
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* <ResultsView results={results} /> */}
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                {
                                    ResultHeaders.map((header: string, i: number): JSX.Element => {
                                        return (
                                            <td key={`results-header-${i}`}>{header}</td>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                results.map((result: Result, i: number): JSX.Element => {
                                    return (
                                        <tr key={`results-row-${i}`}>
                                            <td>{i + 1}</td>
                                            <td>{result.name}</td>
                                            <td>{result.symbol}</td>
                                            <td>{result.type}</td>
                                            <td>{result.shares}</td>
                                            <td>{result.sharePrice}</td>
                                            <td>{result.purchasePrice}</td>
                                            <td>{result.allocated}</td>
                                            <td>{result.remainder}</td>
                                            <td>{result.symbolAllocationPercentage}</td>
                                            <td>{result.groupAllocationPercentage}</td>
                                            <td>{result.fromBalance}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default InvestmentsView;
