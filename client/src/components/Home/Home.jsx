import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { getCountries } from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard.jsx";
import "./Home.css";

export default function Home(props) {
  const [, setOrder] = useState("");

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countriesLoaded);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <>
      <NavBar setOrder={setOrder} />
      <div className="contenedorHome">
        {countries?.map((c) => (
          <div className="divPaises">
            <CountryCard name={c.name} continent={c.continent} />
          </div>
        ))}
      </div>
    </>
  );
}
