import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://127.0.0.1:8000/';

export const createRental = (filmId, customerId, staffId = 1) => {
    try {
        return axios.post(`${API_URL}film/rent/`,
            {
                film_id: filmId,
                customer_id: customerId,
                staff_id: staffId
            });
    } catch (error) {
        console.error("Failed to create rental.", error);
        throw new Error("Server connection error");   
    }
}

export const returnRental = async (customer_id, rentalId) => {
    try {
        const response = await axios.put(`${API_URL}customer/${customer_id}/return/`,
            {
                rental_id: rentalId
            });
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        let errorMessage = "Failed to return rental due to a server connection error.";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
        throw error;
    }
}