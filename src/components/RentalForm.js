import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRental } from '../services/RentalService';

const RentalForm = ({ filmId }) => {
    const [customerId, setCustomerId] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError('');
        setSuccessMessage('');
        
        if (!customerId) {
            setError('Please input your customer ID');
            return;
        }

        const parsedCustomerId = parseInt(customerId, 10);
        const parsedFilmId = parseInt(filmId, 10); 

        if (isNaN(parsedCustomerId) || isNaN(parsedFilmId)) {
            setError('Customer ID and Film ID must be numbers');
            return;
        }

        try {
            await createRental(parsedFilmId, parsedCustomerId);
            setSuccessMessage('Rented successfully!');
        } catch (error) {
            setError('Rental failed. Please try again later.');

        }
    }

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="customerId" className="form-label">Customer ID</label>
                        <input type="text" className="form-control" id="customerId" value={customerId} onChange={e => setCustomerId(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Rent</button>
                </form>
            </div>
        </div>
    );
};

export default RentalForm;