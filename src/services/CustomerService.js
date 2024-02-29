import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://127.0.0.1:8000/';

// returns list of all customers either active or inactive
export async function getCustomers(search = "", active = "1") {
    try {
        const response = await axios.get(`${API_URL}customers/?search=${search}&active=${active}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// returns a single customer
export async function getCustomer(customer_id) {
    try {
        const response = await axios.get(`${API_URL}customer/${customer_id}/`);
        return response.data;
    } catch (error) {
        let errorMessage = "Failed to get customer due to a server connection error.";
        toast.error(errorMessage);
        throw error;
    }
}

// creates a new customer
export async function createCustomer(first_name, last_name, email) {
    try {
        const response = await axios.post(`${API_URL}customer/create/`,
            {
                first_name: first_name,
                last_name: last_name,
                email: email
            });
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        let errorMessage = "Failed to create customer due to a server connection error.";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
        throw error;
    }
}

// updates a customer
export async function updateCustomer(customer_id, first_name, last_name, email) {

    try {
        const response = await axios.put(`${API_URL}customer/${customer_id}/`,
            {
                "first_name": first_name,
                "last_name": last_name,
                "email": email
            });
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        let errorMessage = "Failed to update customer due to a server connection error."
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
        throw error;
    }
}

// activates or deactivates a customer
export async function updateCustomerStatus(customer_id, active) {

    try {
        const response = await axios.put(`${API_URL}customer/${customer_id}/`, {"active": active});
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        let errorMessage = "Failed to update customer due to a server connection error."
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
        throw error;
    }
}

export async function getCustomerRentalHistory(customer_id) {
    try {
        return axios.get(`${API_URL}customer/${customer_id}/rentals/?active=0`)
            .then(response => response.data);
    } catch (error) {
        let errorMessage = "Failed to get customer rental history due to a server connection error.";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
        throw error;
    }
}

export async function getCustomerRentals(customer_id) {
    try {
        return axios.get(`${API_URL}customer/${customer_id}/rentals/?active=1`)
            .then(response => response.data);
    } catch (error) {
        let errorMessage = "Failed to get customer rentals due to a server connection error.";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
        throw error;
    }
}