import React from "react";
import PropTypes from 'prop-types';
import "../styles/DetailCard.css"
import { FaArrowLeft } from "react-icons/fa";

function DetailCard(props) {
    const cardByType = {
        "people" : <PeopleDetailCard element={props.element} />,
        "planets"  : <PlanetDetailCard element={props.element} />,
        "films" : <FilmDetailCard element={props.element} />,
        "species" : <SpeciesDetailCard element={props.element} />,
        "vehicles": <VehicleDetailCard element={props.element} />,
        "starships": <StarshipDetailCard element={props.element} />,
    }
    return (
        <div className="DetailCard">
            <FaArrowLeft className="DetailCard-ArrowLeft" onClick={() => props.setSelectedElement(null)}/> 
			{cardByType[props.element.type]}
		</div>
    )
}

DetailCard.propTypes = {
    element: PropTypes.object,
}

export default DetailCard;

function PeopleDetailCard(props) {
    return (
        <>
        <h2> People </h2>
        <ul>
            <li> Name : {props.element.name} </li>
            <li> Gender : {props.element.gender} </li>
            <li> Hair color : {props.element.hair_color} </li>
            <li> Height : {props.element.height} cm </li>
            <li> Mass : {props.element.mass} </li>
            <li> Skin Color : {props.element.skin_color} </li>
        </ul>
        </>
    )
}

function PlanetDetailCard(props) {
    return (
        <>
        <h2> Planet </h2>
        <ul>
            <li> Name : {props.element.name} </li>
            <li> Climate : {props.element.climate} </li>
            <li> Gravity : {props.element.gravity} </li>
            <li> Orbital period : {props.element.orbital_period} </li>
            <li> Population : {props.element.population} </li> 
            <li> Rotation period : {props.element.rotation_period} </li> 
            <li> Water surface : {props.element.surface_water} </li>
            <li> Terrain : {props.element.terrain} </li>
        </ul>
        </>
    )
}

function FilmDetailCard(props) {
    return (
        <>
        <h2> Film </h2>
        <ul>
            <li> Title : {props.element.title} </li>
            <li> Episode : {props.element.episode_id} </li>
            <li> Director : {props.element.director} </li>
            <li> Producer : {props.element.producer} </li>
            <li> Release date : {props.element.release_date} </li>
            <li> Opening Crawl : {props.element.opening_crawl} </li>
        </ul>
        </>
    )
}

function SpeciesDetailCard(props) {
    return (
        <>
        <h2> Species </h2>
        <ul>
            <li> Name : {props.element.name} </li>
            <li> Average height : {props.element.average_height} </li>
            <li> Average lifespan : {props.element.average_lifespan} </li>
            <li> Classification : {props.element.classification} </li>
            <li> Designation : {props.element.designation} </li>
            <li> Eye colors : {props.element.eye_colors} </li>
            <li> Hair colors : {props.element.hair_colors} </li>
            <li> Language : {props.element.language} </li>
            <li> Skin color : {props.element.skin_color} </li>
        </ul>
        </>
    )
}

function VehicleDetailCard(props) {
    return (
        <>
        <h2> Vehicle </h2>
        <ul>
            <li> Name : {props.element.name} </li>
            <li> Cargo capacity : {props.element.cargo_capacity} </li>
            <li> Consumables : {props.element.consumables} </li>
            <li> Cost in credits : {props.element.cost_in_credits} </li>
            <li> Crew : {props.element.crew} </li>
            <li> Length : {props.element.length}</li>
            <li> Model : {props.element.model} </li>
            <li> Passengers : {props.element.passengers} </li> 
        </ul>
        </> 
    )
}

function StarshipDetailCard(props) {
    return (
        <>
        <h2> Starship </h2>
        <ul>
            <li> Name : {props.element.name} </li>
            <li> Model : {props.element.model} </li>
            <li> Starship class : {props.element.starship_class} </li>
            <li> Manufacturer : {props.element.manufacturer} </li>
            <li> Cost in credits : {props.element.cost_in_credits} </li>
            <li> Length : {props.element.length} </li>
            <li> Crew : {props.element.crew} </li>
            <li> Passengers : {props.element.passengers} </li>
            <li> Max atmosphering speed : {props.element.max_atmosphering_speed} </li>
            <li> Hyperdrive rating : {props.element.hyperdrive_rating} </li>
        </ul>
        </> 
    )
}