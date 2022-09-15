import React from "react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Pagina de espera</h1>
      <NavLink to="/countries">Home</NavLink>
    </div>
  );
}
