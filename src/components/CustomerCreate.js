import React, { useState } from 'react';
import { createCustomer } from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerCreate = () => {
    const [customer, setCustomer] = useState({});
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleCustomerCreate = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            createCustomer(customer.first_name, customer.last_name, customer.email).then(() => {
                navigate('/customers');
            });
        }
        setValidated(true);
    };

    const handleFirstNameChange = (e) => {
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            first_name: e.target.value
        }));
    };

    const handleLastNameChange = (e) => {
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            last_name: e.target.value
        }));
    };

    const handleEmailChange = (e) => {
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            email: e.target.value
        }));
    };

    return (
        <div className="container" style={{ padding: '20px' }}>
            <h2>Customer</h2>
            <div className="row mb-3 mt-3">
                <Form noValidate validated={validated} onSubmit={handleCustomerCreate}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text"
                            maxLength={25}
                            placeholder="First Name" 
                            value={customer.first_name} 
                            onChange={handleFirstNameChange} 
                            required 
                            className={customer.first_name ? '' : 'is-invalid'} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a first name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text"
                            maxLength={25}
                            placeholder="Last Name" 
                            value={customer.last_name} 
                            onChange={handleLastNameChange} 
                            required 
                            className={customer.last_name ? '' : 'is-invalid'} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a last name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Email" 
                            value={customer.email} 
                            onChange={handleEmailChange} 
                            required 
                            className={customer.email ? '' : 'is-invalid'} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default CustomerCreate;


