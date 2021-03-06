import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

export interface JumboViewProps {
    header: string;
    body: string;
}

const JumboView = function (props: JumboViewProps) {
    const {
        header,
        body,
    } = props;

    return (
        <Jumbotron>
            <h1>{header}</h1>
            <p>
                {body}
            </p>
            <p>
                <Button variant="primary">Learn more</Button>
            </p>
        </Jumbotron>
    );
}

export default JumboView;
