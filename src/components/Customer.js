import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomer, updateCustomer } from '../services/CustomerService';
import { Form, Button } from 'react-bootstrap';
import CustomerRentalHistory from './CustomerRentalHistory';
import 'bootstrap/dist/css/bootstrap.min.css';

const Customer = () => {
    const [customer, setCustomer] = useState({});
    const { customer_id } = useParams();
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getCustomer(customer_id).then(customerData => setCustomer(customerData[0])).catch(() => setCustomer({}));
    }, [customer_id]);

    const handleCustomerUpdate = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        else {
            updateCustomer(customer_id, customer.first_name, customer.last_name, customer.email).then(() => 
            alert('Customer updated successfully')).catch(() => // TODO replace with better error messaging
            alert('Error updating customer')); // TODO replace with better error messaging
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
                <Form noValidate validated={validated} onSubmit={handleCustomerUpdate}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
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
                        Update
                    </Button>
                </Form>
            </div>
            <div className="row mb-3">
                <CustomerRentalHistory customer_id={customer_id} />
            </div>
        </div>
    );
};

export default Customer;


