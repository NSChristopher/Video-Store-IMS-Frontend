import axios from 'axios';

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