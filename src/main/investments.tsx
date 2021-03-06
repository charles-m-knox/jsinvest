import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Config, Symbol, Strategy, Account, Allocation, Result, ResultHeaders } from './models'
import { AccountView } from './account'
import StrategyView from './strategy';
import { BalanceAccount } from './balancer';
import { ResultsView } from './results';
import { GetQuotes } from './quote';
import Collapse from 'react-bootstrap/Collapse'
import * as yaml from 'yaml';
import { asCurrency, asPercentage } from './helpers';

// const yaml = require('js-yaml');

const InvestmentsView = () => {
    const getBasicSymbol = (): Symbol => {
        return {
            symbol: 'SCHB',
            type: 'broad',
        }
    }

    const getBasicStrategy = (): Strategy => {
        return {
            name: 'AggressiveRetirement',
            symbols: [getBasicSymbol()],
            allocations: [getBasicAllocation()],
        }
    }

    const getBasicAccount = (): Account => {
        return {
            name: '401k',
            balance: 100000.0,
            strategy: 'AggressiveRetirement',
        }
    }

    const getBasicAllocation = (): Allocation => {
        return {
            type: 'broad',
            amount: 100.0,
        }
    }

    const getBasicResult = (): Result => {
        return {
            name: 'AggressiveRetirement',
            symbol: 'SCHB',
            type: 'broad',
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

    const getConfig = (accts: Account[], strats: Strategy[]): Config => {
        const conf: Config = {
            accounts: accts,
            strategies: strats,
        };

        return conf;
    }

    const setStrategies = (newStrategies: Strategy[]) => {
        setStrategiesState(newStrategies);
        const newStrategiesYaml = yaml.stringify(getConfig(accounts, newStrategies), yaml.defaultOptions);
        setExportStr(newStrategiesYaml);
    }

    const setAccounts = (newAccounts: Account[]) => {
        setAccountsState(newAccounts);
        const newStrategiesYaml = yaml.stringify(getConfig(newAccounts, strategies), yaml.defaultOptions);
        setExportStr(newStrategiesYaml);
    }

    const setConfig = (config: Config, configYamlStr: string) => {
        setStrategiesState(config.strategies);
        setAccountsState(config.accounts);
        setExportStr(configYamlStr);
    }

    const setExportStrSimple = () => {
        const conf: Config = {
            accounts: accounts,
            strategies: strategies,
        };
        const configYamlStr = yaml.stringify(conf, yaml.defaultOptions);
        setExportStr(configYamlStr);
    }

    const getResultsAsCSV = (results: Result[]): string => {
        const csvRows = [`#,${ResultHeaders.join(',')}`];
        results.forEach((result: Result, i: number) => {
            csvRows.push([
                i + 1,
                `"${result.name}"`,
                `"${result.symbol}"`,
                `"${result.type}"`,
                `"${result.shares}"`,
                `"${asCurrency(result.sharePrice)}"`,
                `"${asCurrency(result.purchasePrice)}"`,
                `"${asCurrency(result.allocated)}"`,
                `"${asCurrency(result.remainder)}"`,
                `"${asPercentage(result.symbolAllocationPercentage)}"`,
                `"${asPercentage(result.groupAllocationPercentage)}"`,
                `"${asCurrency(result.fromBalance)}"`,
            ].join(','));
        });
        return csvRows.join('\n');
    }

    const [strategies, setStrategiesState] = useState([getBasicStrategy()]);
    const [accounts, setAccountsState] = useState([getBasicAccount()]);
    const [results, setResults] = useState([getBasicResult()]);
    const [importStr, setImportStr] = useState('');
    const [exportStr, setExportStr] = useState('');

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

    const [importExportOpen, setImportExportOpen] = useState(false);
    const [step1Open, setStep1Open] = useState(true);
    const [step2Open, setStep2Open] = useState(false);
    const [step3Open, setStep3Open] = useState(false);
    const [tableOpen, setTableOpen] = useState(false);

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Invest smarter and faster!</h1>
                <p>
                    Use this simple tool to quickly allocate your financial accounts according to portfolios that you set up.
                </p>
                <p>
                    <Button variant="primary" className="mr-3"
                        aria-controls="import-export-opener"
                        aria-expanded={importExportOpen} onClick={() => {
                            setExportStrSimple();
                            if (!importExportOpen) {
                                setStep1Open(false);
                                setStep2Open(false);
                                setStep3Open(false);
                                setTableOpen(false);
                            }
                            setImportExportOpen(!importExportOpen);
                        }}>Import/export</Button>
                </p>
            </Jumbotron>
            <Container>
                <Collapse in={importExportOpen}>
                    <Row>
                        <Col>
                            <Row>
                                <Col style={{ cursor: 'pointer' }} onClick={() => {
                                    setImportExportOpen(!importExportOpen);
                                }}>
                                    <h2>
                                        Import/export
                                    </h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>
                                        You can also import/export using the below options.
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="import-textarea">
                                        <Form.Label>Paste in here to Import</Form.Label>
                                        <Form.Control as="textarea" rows={6}
                                            value={importStr}
                                            onChange={(e: any) => {
                                                setImportStr(e.target.value);
                                            }} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="export-textarea">
                                        <Form.Label>Copy from here to Export</Form.Label>
                                        <Form.Control as="textarea" rows={6}
                                            readOnly={true}
                                            onChange={(e: any) => {
                                                console.log(e.target.value);
                                            }}
                                            value={exportStr}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button className="mb-3" onClick={() => {
                                        const config = yaml.parse(importStr, yaml.defaultOptions);
                                        if (config) {
                                            setConfig(config, importStr);
                                            setImportExportOpen(false);
                                            setStep1Open(true);
                                            setStep2Open(true);
                                            setStep3Open(true);
                                            setTableOpen(false);
                                        }
                                    }}>
                                        Import
                                    </Button>
                                </Col>
                                <Col>
                                    {/* <Button className="mb-3 mr-3" onClick={() => {
                                        setExportStrSimple();
                                    }}>
                                        Export
                                    </Button> */}
                                    <Button className="mb-3" onClick={() => {
                                        navigator.clipboard.writeText(exportStr);
                                        setImportExportOpen(false);
                                        setStep1Open(true);
                                        setStep2Open(true);
                                        setStep3Open(true);
                                    }}>
                                        Copy to Clipboard
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Collapse>
                <Row>
                    <Col style={{ cursor: 'pointer' }} onClick={() => {
                        setStep1Open(!step1Open);
                    }}>
                        <h2>
                            Step 1. Create a Strategy
                        </h2>
                    </Col>
                </Row>
                <Collapse in={step1Open}>
                    <Row>
                        <Col>
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
                                    <Button className="mb-3"
                                        onClick={() => {
                                            setStep1Open(false)
                                            setStep2Open(!step2Open)
                                            setStep3Open(false)
                                        }}>
                                        Next step
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Collapse>
                <Row>
                    <Col style={{ cursor: 'pointer' }} onClick={() => {
                        setStep2Open(!step2Open);
                    }}>
                        <h2>
                            Step 2. Set up Accounts
                        </h2>
                    </Col>
                </Row>
                <Collapse in={step2Open}>
                    <Row>
                        <Col>
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
                                    <Button className="mb-3"
                                        onClick={() => {
                                            setStep1Open(false)
                                            setStep2Open(false)
                                            setStep3Open(true)
                                        }}>
                                        Final step
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Collapse>
                <Row>
                    <Col style={{ cursor: 'pointer' }} onClick={() => {
                        setStep3Open(!step3Open);
                    }}>
                        <h2>
                            Step 3. Get results
                        </h2>
                    </Col>
                </Row>
                <Collapse in={step3Open}>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <p>
                                        Just click the "Balance" button to query the Yahoo Finance servers to get quotes for each symbol from above. A table below will populate, and you can copy the results as CSV, so that they can be pasted into your favorite spreadsheet processor.
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button className="mb-3" onClick={() => {
                                        let balancedResults: Result[] = [];
                                        // todo: refactor
                                        const allSymbols: any = {};
                                        strategies.forEach((strategy: Strategy) => {
                                            strategy.symbols.forEach((symbol: Symbol) => {
                                                allSymbols[symbol.symbol] = symbol.symbol;
                                            });
                                        });
                                        GetQuotes(Object.keys(allSymbols)).then((quotes) => {
                                            if (Array.isArray(quotes)) {
                                                accounts.forEach((account: Account) => {
                                                    strategies.forEach((strategy: Strategy) => {
                                                        if (strategy.name.toLowerCase() === account.strategy.toLowerCase()) {
                                                            // const r = BalanceAccount(account, strategy, [{ price: 50.0 }]); // for testing
                                                            const r = BalanceAccount(account, strategy, quotes);
                                                            console.log(r);
                                                            balancedResults = [...balancedResults, ...r];
                                                        }
                                                    })
                                                })
                                                console.log(balancedResults);
                                                setResults([...balancedResults]);
                                                setTableOpen(true);
                                                return;
                                            }
                                            console.error(`did not receive quotes from backend: ${JSON.stringify(quotes)}`);
                                        });
                                    }}>
                                        Balance
                                    </Button>

                                </Col>
                            </Row>
                            <Collapse in={tableOpen}>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col className="mb-3">
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
                                                                        <td>{asCurrency(result.sharePrice)}</td>
                                                                        <td>{asCurrency(result.purchasePrice)}</td>
                                                                        <td>{asCurrency(result.allocated)}</td>
                                                                        <td>{asCurrency(result.remainder)}</td>
                                                                        <td>{asPercentage(result.symbolAllocationPercentage)}</td>
                                                                        <td>{asPercentage(result.groupAllocationPercentage)}</td>
                                                                        <td>{asCurrency(result.fromBalance)}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button className="mb-3 mr-3" onClick={() => {
                                                    navigator.clipboard.writeText(getResultsAsCSV(results));
                                                }}>
                                                    Copy as CSV
                                                </Button>
                                                <Button className="mb-3 mr-3" onClick={() => {
                                                    setStep1Open(true)
                                                    setStep2Open(false)
                                                    setStep3Open(false)
                                                }}>
                                                    Back to top
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Collapse>
                        </Col>
                    </Row>
                </Collapse>
            </Container>
        </React.Fragment>

    );
}

export default InvestmentsView;
