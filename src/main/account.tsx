import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Account } from './models'


export interface AccountViewProps {
    accounts: Account[];
    idx: number;
    onAcctNameChange: (idx: number, newName: string) => void;
    onAcctBalanceChange: (idx: number, newBalance: number) => void;
    onAcctStrategyChange: (idx: number, newStrategy: string) => void;
    onAcctAdd: (idx: number) => void;
    onAcctDel: (idx: number) => void;
    getStrategies: () => string[];
}

export const AccountView = function (props: AccountViewProps) {
    const {
        accounts,
        idx,
        onAcctNameChange,
        onAcctBalanceChange,
        onAcctStrategyChange,
        onAcctAdd,
        onAcctDel,
        getStrategies,
    } = props;

    return (
        <div className="mb-3">
            <Form>
                <Row>
                    <Col sm={4}>
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
                                id={`accounts-${idx}-name`}
                                value={accounts[idx].name}
                                onChange={(e: any): void => {
                                    onAcctNameChange(idx, e.target.value);
                                }} />
                        </InputGroup>
                    </Col>
                    <Col sm={4}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Balance
                        </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="401k"
                                data-idx={idx}
                                data-balance={accounts[idx].balance}
                                id={`accounts-${idx}-balance`}
                                value={accounts[idx].balance}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>): void => {
                                    e.target.value = accounts[idx].balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                                }}
                                onChange={(e: any): void => {
                                    const balanceAsNumbers = e.target.value.replace(/[^0-9.-]+/g, "");
                                    console.log(balanceAsNumbers);
                                    if (balanceAsNumbers === '') {
                                        onAcctBalanceChange(idx, 0.0);
                                        return;
                                    }
                                    const newAmount = Number.parseFloat(balanceAsNumbers);
                                    if (Number.isNaN(newAmount)) {
                                        return;
                                    }
                                    onAcctBalanceChange(idx, newAmount);
                                }} />
                        </InputGroup>
                    </Col>
                    <Col sm={4}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Strategy
                        </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select"
                                id={`accounts-${idx}-strategy`}
                                value={accounts[idx].strategy}
                                onChange={(e: any): void => {
                                    onAcctStrategyChange(idx, e.target.value);
                                }}>
                                {
                                    getStrategies().map((strategy: string, i: number): JSX.Element => {
                                        return (
                                            <option key={`account-${idx}-strategy-option-${i}`}>{strategy}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                            {/* <Form.Control
                                type="text"
                                placeholder="401k"
                                data-idx={idx}
                                id={`accounts-${idx}-strategy`}
                                value={accounts[idx].strategy}
                                onChange={(e: any): void => {
                                    onAcctStrategyChange(idx, e.target.value);
                                }} /> */}
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            onClick={() => {
                                onAcctAdd(idx);
                            }}>
                            Add account
                </Button>
                    </Col>
                    <Col>
                        <Button variant="danger"
                            onClick={() => {
                                onAcctDel(idx);
                            }}>
                            Delete account
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>

    )
}
