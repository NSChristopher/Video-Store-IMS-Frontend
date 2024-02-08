import React, { useEffect, useState } from 'react';
import { getTopFilms } from '../services/FilmService';
import { getTopActors } from '../services/ActorService';
import dvdImage from '../assets/dvd.jpg';
import actorImage from '../assets/actor.jpg';
import FilmCard from './FilmCard';
import ActorCard from './ActorCard';
import ErrorCard from './ErrorCard';
import { Row, Col } from 'react-bootstrap';
const Home = () => {
    const [films, setFilms] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        getTopFilms()
            .then(films => setFilms(films))
            .catch(() => setFilms([])); // Set films to an empty array if there is an error

        getTopActors()
            .then(actors => setActors(actors))
            .catch(() => setActors([])); // Set actors to an empty array if there is an error
    }, []);

    return (
        <div style={{ padding: '20px' }}>

            <h2>Top Films</h2>
            <div class="container p2" style={{ padding: '20px' }}>
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
            <h2>Top Actors</h2>
            <div class="container" style={{ padding: '20px' }}>
                <Row xs={1} md={5} className="g-4">
                    {actors.length > 0 ? (
                        actors.map(actor => (
                            <Col key={actor.actor_id}>
                                <ActorCard actor={actor} actorImage={actorImage} />
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
    );
};

export default Home;
