import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const FilmCard = ({ actor, actorImage }) => {

    return (
        <Card>
            <Card.Img variant="top" src={actorImage} />
            <Card.Body>
                <Card.Title>{actor.first_name} {actor.last_name}</Card.Title>
                <Link to={`/actor/${actor.actor_id}`} className="btn btn-primary">Actor Details</Link>
            </Card.Body>
        </Card>
    );
}

export default FilmCard;