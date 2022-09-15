import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderCountries } from "../../redux/actions";
import {
  ALPHA_ASC,
  ALPHA_DESC,
  POP_ASC,
  POP_DESC,
} from "../../redux/constants";

export default function NavBar({ setOrder }) {
  const dispatch = useDispatch();

  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderCountries(e.target.value));
    setOrder(e.target.value);
  }

  return (
    <React.Fragment>
      <h1>soy NavBar</h1>
      <label htmlFor="order">order by</label>
      <select name="order" onChange={(e) => handleOrder(e)}>
        <option> --- </option>
        <option value={ALPHA_ASC}>a-z</option>
        <option value={ALPHA_DESC}>z-a</option>
        <option value={POP_ASC}>population asc</option>
        <option value={POP_DESC}>population desc</option>
      </select>
    </React.Fragment>
  );
}
