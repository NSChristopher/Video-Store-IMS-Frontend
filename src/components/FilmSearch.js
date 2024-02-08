import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from 'react-bootstrap';
import { getSearchedFilms } from '../services/FilmService';
import dvdImage from '../assets/dvd.jpg';
import { Link } from 'react-router-dom';

const FilmSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [films, setFilms] = useState([]);

    const handleSearch = async () => {

        setFilms([]);

        const searchedFilms = await getSearchedFilms(searchTerm).catch(() => {
            alert('Error fetching films');
            return [];
        });

        if (searchedFilms.length === 0) {
            alert('No films found with that search term.');
        }

        setFilms(searchedFilms);
    };

    return (
        <div class="container" style={{ padding: '20px' }}>
            <h2>Search</h2>
            <div class="mb-5">
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>

            <Row xs={1} md={5} className="g-4">
                {films.map(film => (
                    <Col key={film.film_id}>
                        <Card>
                            <Card.Img variant="top" src={dvdImage} />
                            <Card.Body>
                                <Card.Title>{film.title}</Card.Title>
                                <Card.Text>{film.category}</Card.Text>
                                {/* Button */}
                                <Link to={`/film/${film.film_id}`} className="btn btn-primary">Film Details</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default FilmSearch;
