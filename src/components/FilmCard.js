import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const FilmCard = ({ film, dvdImage }) => {

    return (
        <Card>
            <Card.Img variant="top" src={dvdImage} />
            <Card.Body>
                <Card.Title>{film.title}</Card.Title>
                <Card.Text>{film.category}</Card.Text>
                <Link to={`/film/${film.film_id}`} className="btn btn-primary">Film Details</Link>
            </Card.Body>
        </Card>
    );
}

export default FilmCard;