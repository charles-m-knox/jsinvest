import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Symbol, Strategy, Allocation } from './models'

export interface StrategyViewProps {
    idx: number;
    strategies: Strategy[]; // strategies state directly passed in
    onStrategyNameChange: (e: any, idx: number) => void;
    onStrategyAdd: () => void;
    onStrategyDel: (idx: number) => void;
    onStrategySymbolAdd: (idx: number) => void;
    onStrategySymbolDel: (idx: number, symbolIdx: number) => void;
    onStrategySymbolChange: (idx: number, symbolIdx: number, newSymbol: Symbol) => void;
    onAllocationTypeChange: (idx: number, allocationIndex: number, newType: string) => void;
    onAllocationAmountChange: (idx: number, allocationIndex: number, newAmount: number) => void;
    onAllocationAdd: (idx: number) => void;
    onAllocationDel: (idx: number, allocationIndex: number) => void;
}

const StrategyView = function (props: StrategyViewProps) {
    const {
        idx,
        strategies,
        onStrategyNameChange,
        onStrategyAdd,
        onStrategyDel,
        onStrategySymbolAdd,
        onStrategySymbolDel,
        onStrategySymbolChange,
        onAllocationTypeChange,
        onAllocationAmountChange,
        onAllocationAdd,
        onAllocationDel,
    } = props;

    return (
        <React.Fragment key={`strategy-${idx}`}>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Name
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="401k"
                            data-idx={idx}
                            name={`strategy-name-${idx}`}
                            id={`strategy-name-${idx}`}
                            value={strategies[idx].name}
                            onChange={(e: any) => {
                                onStrategyNameChange(e, idx);
                            }}
                        />
                        <InputGroup.Append>
                            <Button
                                className=""
                                variant="outline-secondary"
                                onClick={onStrategyAdd}>
                                Add strategy
                            </Button>
                            <Button
                                className=""
                                variant="outline-secondary"
                                disabled={strategies.length <= 1}
                                onClick={() => {
                                    onStrategyDel(idx);
                                }}>
                                -
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            {/* <Row>
                <Col sm={5}>
                    <p>
                        For the investment strategy "{strategies[idx].name}", choose the ETFs/stocks you want to invest in on the left.
                    </p>
                </Col>
                <Col sm={7}>
                    <p>
                        On the right, you can classify each ETF/stock. For example, SCHB is a broad market index ETF, so you might want to classify it as "broad". Similarly, SCHM is a medium-cap index ETF, so you could label it as "medium".
                    </p>
                </Col>
            </Row> */}
            <Row>
                <Col sm={1}></Col>
                <Col sm={11}>
                    <p className="text-muted">
                        <i><b>Symbols</b> - choose the symbols (stock/ETF names) and their allocations (grouping) here.</i>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        strategies[idx].symbols.map((symbol: Symbol, i: number): JSX.Element => {
                            return (
                                <Row key={`strategy-${idx}-symbols-${i}-row`}>
                                    <Col sm={1}></Col>
                                    <Col sm={5}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    Symbol
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                placeholder="SCHB"
                                                data-idx={idx}
                                                data-symbol-idx={i}
                                                id={`strategy-${idx}-symbols-${i}-symbol`}
                                                value={strategies[idx].symbols[i].symbol}
                                                onChange={(e: any): void => {
                                                    const newSymbol = strategies[idx].symbols[i];
                                                    newSymbol.symbol = e.target.value.toUpperCase();
                                                    onStrategySymbolChange(idx, i, newSymbol);
                                                }} />
                                        </InputGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    Type
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                placeholder="broad"
                                                data-idx={idx}
                                                data-symbol-idx={i}
                                                id={`strategy-${idx}-symbols-${i}-type`}
                                                value={strategies[idx].symbols[i].type}
                                                onChange={(e: any): void => {
                                                    const newSymbol = strategies[idx].symbols[i];
                                                    newSymbol.type = e.target.value;
                                                    onStrategySymbolChange(idx, i, newSymbol);
                                                }} />
                                            <InputGroup.Append>
                                                <Button
                                                    className=""
                                                    variant="outline-secondary"
                                                    onClick={() => {
                                                        onStrategySymbolAdd(idx);
                                                    }}>
                                                    +
                                                </Button>
                                                <Button
                                                    className=""
                                                    variant="outline-secondary"
                                                    disabled={strategies[idx].symbols.length <= 1}
                                                    onClick={() => {
                                                        onStrategySymbolDel(idx, i);
                                                    }}>
                                                    -
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Col>
            </Row>
            {/* <Row>
                <Col sm={5}>
                    <p>
                        For the investment strategy "{strategies[idx].name}", choose how you want to distribute money across the labels from above. For example, since we classified "broad" and "medium" above, we should have "broad" and "medium" entries as well.
                    </p>
                </Col>
                <Col sm={7}>
                    <p>
                        On the right, you can specify what percentage of the total money will be allocated to this category. For example, if you wanted to allocate 50% of one of your accounts to all symbols with the "broad" classification, you would put 50% in this column, and in the left column, you would put "broad".
                    </p>
                </Col>
            </Row> */}
            <Row>
                <Col sm={1}></Col>
                <Col sm={11}>
                    <p className="text-muted">
                        <i><b>Allocations</b> - choose how to group and divide the above stocks/ETFs here.</i>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        strategies[idx].allocations.map((allocation: Allocation, i: number): JSX.Element => {
                            return (
                                <Row key={`strategy-${idx}-allocations-${i}-row`}>
                                    <Col sm={1}></Col>
                                    <Col sm={5}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    Allocation
                                            </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                placeholder="broad"
                                                data-idx={idx}
                                                data-symbol-idx={i}
                                                id={`strategy-${idx}-allocations-${i}-type`}
                                                value={strategies[idx].allocations[i].type}
                                                onChange={(e: any): void => {
                                                    onAllocationTypeChange(idx, i, e.target.value);
                                                }} />
                                        </InputGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    Amount (%)
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="number"
                                                placeholder="broad"
                                                data-idx={idx}
                                                data-symbol-idx={i}
                                                id={`strategy-${idx}-allocations-${i}-amount`}
                                                value={strategies[idx].allocations[i].amount}
                                                onChange={(e: any): void => {
                                                    const newAmount = Number.parseFloat(e.target.value);
                                                    if (Number.isNaN(newAmount)) {
                                                        return;
                                                    }
                                                    onAllocationAmountChange(idx, i, newAmount);
                                                }} />
                                            <InputGroup.Append>
                                                <Button
                                                    className=""
                                                    variant="outline-secondary"
                                                    onClick={() => {
                                                        onAllocationAdd(idx);
                                                    }}>
                                                    +
                                                </Button>
                                                <Button
                                                    className=""
                                                    variant="outline-secondary"
                                                    disabled={strategies[idx].allocations.length <= 1}
                                                    onClick={() => {
                                                        onAllocationDel(idx, i);
                                                    }}>
                                                    -
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Col>
            </Row>
            {/* <Row>
                <Col>
                    <Button className="mb-3" onClick={onStrategyAdd}>
                        Add another strategy
                    </Button>
                </Col>
                <Col>
                    {strategies.length > 1 && (
                        <Button
                            className="mb-3"
                            variant="danger"
                            onClick={() => {
                                onStrategyDel(idx);
                            }}>
                            Delete this strategy
                        </Button>
                    )}
                </Col>
            </Row> */}
        </React.Fragment >
    );
}

export default StrategyView;

