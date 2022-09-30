import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="contenedorLanding">
      <img className="logoLanding" src="https://i.ibb.co/ZGbCxNM/logo-World.png" alt="" />
      <Link className="buttonLanding" to="/home">Home</Link>
    </div>
  );
}
