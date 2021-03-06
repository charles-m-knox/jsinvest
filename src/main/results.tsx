import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Result, ResultHeaders } from './models';

export interface ResultsViewProps {
    results: Result[];
}

export const ResultsView = (props: ResultsViewProps) => {
    const {
        results,
    } = props;
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    {
                        ResultHeaders.map((header: string, i: number) => {
                            <th key={`results-header-${i}`}>{header}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    results.map((result: Result, i: number) => {
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
                    })
                }
            </tbody>
        </Table>
    )
}