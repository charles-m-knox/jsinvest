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
import { GetCompleteExample, GetEmptyExample } from './example';

const InvestmentsView = () => {
    const getBasicSymbol = (): Symbol => {
        return {
            symbol: 'SCHB',
            type: 'broad',
        }
    }

    const getBasicStrategy = (): Strategy => {
        return {
            name: `AggressiveRetirement`,
            symbols: [getBasicSymbol()],
            allocations: [getBasicAllocation()],
        }
    }

    const getBasicAccount = (): Account => {
        return {
            name: '401k',
            balance: 100000.0,
            strategy: `AggressiveRetirement`,
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
            name: 'AggressiveRetirement1',
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
        if (configYamlStr) {
            setExportStr(configYamlStr);
        }
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
    const [useYahooDirect, setUseYahooDirect] = useState(false);

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
        <Container fluid style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Jumbotron >
                <h1>Invest faster!</h1>
                <p>
                    Use this tool to balance your financial accounts according to strategies that you set up. If you have multiple financial accounts, but the same financial strategies across many of them and need to split share prices across different account balances, this is for you.
                </p>
                <p>
                    This tool was written by <a href="https://charlesmknox.com" rel="noopener noreferer">charles-m-knox</a>. View the source code on <a href="https://github.com/charles-m-knox/jsinvest" rel="noopener noreferer">GitHub here</a>. If you want to send me a tip, <a href="https://charlesmknox.com/about/#ways-to-support-me-directly" rel="noopener noreferer">visit the "about" page on my site here</a>. I do not store any data about your interactions with this site.
                </p>
                <p>
                    <Button variant="primary" className="mr-3 mb-3"
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
                    <Button variant="primary" className="mr-3 mb-3"
                        aria-controls="load-example" onClick={() => {
                            const example = GetCompleteExample();
                            setConfig(example, "");
                            setStep1Open(true);
                            setStep2Open(false);
                            setStep3Open(false);
                            setTableOpen(false);
                            setImportExportOpen(false);
                        }}>Load Example</Button>
                    <Button variant="primary" className="mr-3 mb-3"
                        aria-controls="load-example" onClick={() => {
                            const example = GetEmptyExample();
                            setConfig(example, "");
                            setStep1Open(true);
                            setStep2Open(false);
                            setStep3Open(false);
                            setTableOpen(false);
                            setImportExportOpen(false);
                        }}>Reset</Button>
                </p>
            </Jumbotron>
            <Container style={{ paddingLeft: '15px', paddingRight: '15px' }}>
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
                                        <Form.Label>Paste here to Import:</Form.Label>
                                        <Form.Control as="textarea" rows={6}
                                            value={importStr}
                                            onChange={(e: any) => {
                                                setImportStr(e.target.value);
                                            }} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="export-textarea">
                                        <Form.Label>Export:</Form.Label>
                                        <Form.Control as="textarea" rows={6}
                                            readOnly={true}
                                            onChange={(e: any) => {
                                                // console.log(e.target.value);
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
                                        // setImportExportOpen(false);
                                        // setStep1Open(true);
                                        // setStep2Open(true);
                                        // setStep3Open(true);
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
                            Step 1. Strategies
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
                                <Col>
                                    <Button
                                        className="mb-3"
                                        variant="outline-primary"
                                        onClick={addStrategy}>
                                        Add strategy
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
                                    <Button className="mb-3 mr-3" onClick={() => {
                                        let balancedResults: Result[] = [];
                                        // todo: refactor
                                        const allSymbols: any = {};
                                        strategies.forEach((strategy: Strategy) => {
                                            strategy.symbols.forEach((symbol: Symbol) => {
                                                allSymbols[symbol.symbol] = symbol.symbol;
                                            });
                                        });
                                        GetQuotes(Object.keys(allSymbols), useYahooDirect).then((quotes) => {
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
                                    <Button className="mb-3 mr-3" variant="outline-secondary"
                                        onClick={() => {
                                            setUseYahooDirect(!useYahooDirect);
                                        }}>
                                        {useYahooDirect ? 'Use Proxy (default)' : 'Use Direct Query'}
                                    </Button>
                                </Col>
                            </Row>
                            <Collapse in={useYahooDirect}>
                                <Row>
                                    <Col>
                                        <span className="text-muted small">
                                            Warning: When directly connecting to Yahoo's API through the browser, CORS manipulation is needed. Requests will fail unless you know what you're doing. If this sounds scary, just press the "Use Proxy (default)" button.<br /><br />
                                            I have provided a proxy using an AWS API gateway and Lambda function that will query the Yahoo Finance servers and allow this website as an origin only.
                                        </span>
                                        {/* {useYahooDirect ? (
                                            <span className="text-muted small">
                                                Warning: CORS extension is needed.
                                            </span>
                                        ) : (
                                                <span className="text-muted small">

                                                </span>
                                            )} */}
                                    </Col>
                                </Row>
                            </Collapse>
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
        </Container>
    );
}

export default InvestmentsView;
