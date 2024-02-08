import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFilm, getFilmOnHand } from '../services/FilmService';
import { useParams } from 'react-router-dom';
import RentalForm from './RentalForm';

const Film = () => {
    const [film, setFilm] = useState({});
    const [onHand, setOnHand] = useState(0);
    const {film_id} = useParams();

    useEffect(() => {
        getFilm(film_id).then(filmData => setFilm(filmData[0])).catch(() => setFilm({}));
        getFilmOnHand(film_id).then(onHandData => setOnHand(onHandData[0].on_hand)).catch(() => setOnHand(0));

    }, [film_id]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Film Details:</h2>
            <div class="container p-2">
                <h3>{film.title}</h3>
                <p>{film.description}</p>
                <p>Release Year: {film.release_year}</p>
                <p>Rating: {film.rating}</p>
                <p>Category: {film.category}</p>
                <p>DVD's Available: {onHand}</p>
            </div>
            <h2>Rent a DVD:</h2>
            <div class="container p-2">
                <RentalForm filmId={film_id}/>
            </div>
        </div>
    );
}

export default Film;
