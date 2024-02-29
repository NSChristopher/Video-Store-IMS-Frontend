import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

// returns list of all customers either active or inactive
export async function getCustomers(search = "", active="1") {
    try {
        return axios.get(`${API_URL}customers/?search=${search}&active=${active}/`)
            .then(response => response.data);
    } catch (error) {
        console.error("Failed to get customers.", error);
        throw new Error("Server connection error");
    }
}

// returns a single customer
export async function getCustomer(customer_id) {
    try {
        return axios.get(`${API_URL}customer/${customer_id}/`)
            .then(response => response.data);
    } catch (error) {
        console.error("Failed to get customer.", error);
        throw new Error("Server connection error");
    }
}

// creates a new customer
export async function createCustomer(first_name, last_name, email) {
    try {
        return axios.post(`${API_URL}customer/create/`,
            {
                first_name: first_name,
                last_name: last_name,
                email: email
            })
            .then(response => response.data);
    } catch (error) {
        console.error("Failed to create customer.", error);
        throw new Error("Server connection error");
    }
}

// updates a customer
export async function updateCustomer(customer_id, first_name, last_name, email) {

    try {
        return axios.put(`${API_URL}customer/${customer_id}/`,
            {
                "first_name": first_name,
                "last_name": last_name,
                "email": email
            })
            .then(response => response.data);
    } catch (error) {
        console.error("Failed to update customer.", error);
        throw new Error("Server connection error");
    }
}

// activates or deactivates a customer
export async function updateCustomerStatus(customer_id, active) {

    try {
        return axios.put(`${API_URL}customer/${customer_id}/`, {"active": active})
            .then(response => response.data);
    } catch (error) {
        console.error("Failed to update customer.", error);
        throw new Error("Server connection error");
    }
}

export async function getCustomerRentalHistory(customer_id) {
    try {
        return axios.get(`${API_URL}customer/${customer_id}/rentals/?active=0`)
            .then(response => response.data);
    } catch (error) {
        console.error("Failed to get customer rental history.", error);
        throw new Error("Server connection error");
    }
}

export async function getCustomerRentals(customer_id) {
    try {
        return axios.get(`${API_URL}customer/${customer_id}/rentals/?active=1`)
            .then(response => response.data);
    } catch (error) {
        console.error("Failed to get customer rentals.", error);
        throw new Error("Server connection error");
    }
}