import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

const ErrorCard = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Server Not Reached</Card.Title>
                <Card.Text>Unable to retrieve data from the server.</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ErrorCard;