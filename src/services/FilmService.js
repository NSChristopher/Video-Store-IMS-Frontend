import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export async function getTopFilms() {
    try {
        const response = await axios.get(`${API_URL}/topfilms/`);
        return response.data;
    } catch (error) {
        console.error('Failed to get top films:', error);
        throw new Error("Server connection error");
    }
}

export async function getFilm(film_id) {
    try {
        const response = await axios.get(`${API_URL}/film/${film_id}/`);
        return response.data;
    } catch (error) {
        console.error(`Failed to get film: ${film_id}:`, error);
        throw new Error("Server connection error");
    }
}

export async function getActorsTopFilms(actor_id) {
    try {
        const response = await axios.get(`${API_URL}/actor/${actor_id}/topfilms/`);
        return response.data;
    } catch (error) {
        console.error(`Failed to get top frilms for actor: ${actor_id}:`, error);
        throw new Error("Server connection error");
    }
}

export async function getSearchedFilms(search) {
    try {
        const response = await axios.get(`${API_URL}/film/search/${search}/`);
        return response.data;
    } catch (error) {
        console.error(`Failed to get films with keyword: "${search}":`, error);
        throw new Error("Server connection error");
    }
}

export async function getFilmOnHand(film_id) {
    try {
        const response = await axios.get(`${API_URL}/film/${film_id}/onhand/`);
        return response.data;
    } catch (error) {
        console.error(`Failed to get on hand value for film: ${film_id}:`, error);
        throw new Error("Server connection error");
    }
}

