import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';


export async function getTopActors() {
    try {
        return axios.get(`${API_URL}topactors/`)
            .then(response => response.data);
    } catch (error) {
        console.error("Failed to get top actors.", error);
        throw new Error("Server connection error");
    }
}

export async function getActor(actor_id) {
    try {
        return axios.get(`${API_URL}actor/${actor_id}/`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Failed to get actor with id ${actor_id}.`, error);
        throw new Error("Server connection error");
    }
}