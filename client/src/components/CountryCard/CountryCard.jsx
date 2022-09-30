import React from "react";
import "./CountryCard.css";


function CountryCard(props) {
  return (
    <div className="contenedorCard">
      <img className="bandera" src={props.flag} alt="" />
      <div className="texto">
        <h1>{props.name}</h1>
        <hr className="hr"/>
        <h5>{props.continent}</h5>
      </div>
    </div>
  );
}

export default CountryCard;
