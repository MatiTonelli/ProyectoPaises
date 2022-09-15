import React, { Component } from "react";
import "./CountryCard.css";

function CountryCard(props) {
  return (
    <div className="contenedorCard">
      <h1>{props.name}</h1>
      <h2>{props.continent}</h2>
    </div>
  );
}

export default CountryCard;
