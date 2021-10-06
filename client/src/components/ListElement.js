import React from "react";
import PropTypes from 'prop-types';
import "../styles/ListElement.css"
import {FaChevronRight} from "react-icons/fa";


function ListElement(props) {
    return (
        <div className="ListElement" onClick={props.onClick}>
			{props.element.type === "films" ? props.element.title : props.element.name}
            <FaChevronRight className="ListElement-ChevronRight" />
		</div>
    )
}

ListElement.propTypes = {
    element: PropTypes.object,
}

export default ListElement;