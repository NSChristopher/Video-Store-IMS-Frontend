import React, { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
import { getCustomerRentalHistory, getCustomerRentals } from '../services/CustomerService';
import { returnRental } from '../services/RentalService';

const CustomerRentalHistory = ({ customer_id }) => {
    const [rentalHistory, setRentalHistory] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const fetchRentals = useCallback(async () => {
        const rentals = await getCustomerRentals(customer_id).catch(() => {
            alert('Error fetching rentals'); // TODO replace with better error messaging
            return [];
        });
        setRentals(rentals);
    }, [customer_id]);

    const fetchRentalHistory = useCallback(async () => {
        const history = await getCustomerRentalHistory(customer_id).catch(() => {
            alert('Error fetching rental history'); // TODO replace with better error messaging
            return [];
        });
        setRentalHistory(history);
    }, [customer_id]);

    useEffect(() => {
        fetchRentals();
        fetchRentalHistory();
    }, [customer_id, updateTrigger, fetchRentals, fetchRentalHistory]);

    const returnCustomerRental = async (rentalId) => {
        await returnRental(customer_id, rentalId).catch(() => {
            alert('Error returning rental'); // TODO replace with better error messaging
        });
        setUpdateTrigger(updateTrigger + 1);
    }

    return (
        <div>
            <h2>Current Rentals:</h2>
            <div class="container p-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Film Title</th>
                            <th>Rental Date</th>
                            <th>Return</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentals.map((rental, index) => (
                            <tr key={index}>
                                <td>{rental.title}</td>
                                <td>{rental.rental_date}</td>
                                <td>
                                    <Button onClick={() => returnCustomerRental(rental.rental_id)}>Return</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <h2>Rental History:</h2>
            <div class="container p-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Film Title</th>
                            <th>Rental Date</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentalHistory.map((rental, index) => (
                            <tr key={index}>
                                <td>{rental.title}</td>
                                <td>{rental.rental_date}</td>
                                <td>{rental.return_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default CustomerRentalHistory;