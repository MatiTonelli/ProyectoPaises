import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getActivities,
  orderCountries,
} from "../../redux/actions";
import {
  ALPHA_ASC,
  ALPHA_DESC,
  POP_ASC,
  POP_DESC,
} from "../../redux/constants";
import "./NavBar.css";

export default function NavBar({ setOrder, setPage, filters, setFilters }) {
  const dispatch = useDispatch();

  const activities = useSelector((state) => state.activitiesLoaded);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderCountries(e.target.value));
    setOrder(e.target.value);
    setPage(1);
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
  }

  function handleFilterByActivity(e) {
    e.preventDefault();
    let copiaFilters = [...filters];
    copiaFilters[2] = e.target.value;
    setFilters(copiaFilters);
    setPage(1);
  }

  function handleFilterByContinent(e) {
    e.preventDefault();
    let copiaFilters = [...filters];
    copiaFilters[1] = e.target.value;
    setFilters(copiaFilters);
    setPage(1);
  }

  useEffect(() => {
    let copiaFilters = [...filters];
    copiaFilters[0] = search;
    setFilters(copiaFilters);
  }, [search]);

  return (
    <div className="contenedorNavBar">
      <img
        className="logoWorld"
        src="https://i.ibb.co/ZGbCxNM/logo-World.png"
        alt="logo-World"
        border="0"
      />
      <div>
        <img
          className="searchIcon iconosNav"
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt=""
        />
        <input
          type="text"
          className="searchInput"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="contenedorFiltersAndCreate">
        <div>
          <img
            className="iconosNavFilters"
            src="https://cdn-icons-png.flaticon.com/512/117/117221.png"
            alt=""
          />
          <select name="order" className="selects selectOrder" onChange={handleOrder}>
            <option value=""> --No order-- </option>
            <option value={ALPHA_ASC}>Alphabetical ↿↾</option>
            <option value={ALPHA_DESC}>Alphabetical ⇃⇂</option>
            <option value={POP_ASC}>Population ↿↾</option>
            <option value={POP_DESC}>Population ⇃⇂</option>
          </select>
          <Link className="createButton" to="/createActivity"><img className="createHomeButton" src="https://cdn-icons-png.flaticon.com/512/2420/2420290.png" alt="" /></Link>
        </div>
        <hr />
        <div className="filterBy">
          <img className="iconosNavFilters filtros" src="https://cdn-icons-png.flaticon.com/512/2676/2676824.png" alt="" />
          <select
            name="filter"
            className="selects"
            onChange={handleFilterByContinent}
          >
            <option value=""> --All continents-- </option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select
            name="activity"
            className="selects"
            onChange={handleFilterByActivity}
          >
            <option value=""> --Any activity-- </option>
            {activities?.map((a) => {
              return <option value={a.id}>{a.name}</option>;
            })}
          </select>
        </div>
        
      </div>
    </div>
  );
}
