import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import { getActor } from '../services/ActorService';
import { getActorsTopFilms } from '../services/FilmService';
import { useParams } from 'react-router-dom';
import dvdImage from '../assets/dvd.jpg';
import FilmCard from './FilmCard';
import ErrorCard from './ErrorCard';

const Actor = () => {
    const [actor, setActor] = useState({});
    const { actor_id } = useParams();

    const [films, setFilms] = useState([]);

    useEffect(() => {
        getActor(actor_id).then(actorData => setActor(actorData[0]));
        getActorsTopFilms(actor_id).then(filmsData => setFilms(filmsData));
    }, [actor_id]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Actor Details</h2>
            <div>

                <h3>{actor.first_name} {actor.last_name}</h3>

                <h3>Actors Top 5 Rented Films</h3>
                <div class="container" style={{ padding: '20px' }}>
                    <Row xs={1} md={5} className="g-4">
                        {films.length > 0 ? (
                            films.map(film => (
                                <Col key={film.film_id}>
                                    <FilmCard film={film} dvdImage={dvdImage} />
                                </Col>
                            ))
                        ) : (
                            Array.from({ length: 5 }).map((_, index) => (
                                <Col key={index}>
                                    <ErrorCard />
                                </Col>
                            ))
                        )}
                    </Row>
                </div>
            </div>
        </div>
    );
}
export default Actor;