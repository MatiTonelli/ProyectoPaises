import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createActivity,
} from "../../redux/actions";
import "./CreateActivity.css";

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countriesLoaded);
  const [countriesToSelect, setCountriesToSelect] = useState(countries);
  const [input, setInput] = useState({
    name: "",
    dificulty: "1",
    duration: "",
    countries: [],
    summer: false,
    winter: false,
    spring: false,
    autumn: false,
  });
  const [errors, setErrors] = React.useState({});
  const [success, setSuccess] = useState(false);

  function validate(type, input) {
    let errors = {};
    if (type === "name" || type === "all") {
      if (!input.name) {
        errors.name = "Name is required";
      } else if (input.name.length < 3) {
        errors.name = "Name is invalid";
      }
    }
    if (type === "duration" || type === "all") {
      if (!input.duration || input.duration === "00:00") {
        errors.duration = "The activity must have a duration";
      }
    }
    if (type === "seasons" || type === "all") {
      if (!input.summer && !input.winter && !input.spring && !input.autumn) {
        errors.seasons = "You must select at least one season";
      }
    }
    if (type === "countries" || type === "all") {
      if (!input.countries.length) {
        errors.countries = "You must select at least one country";
      }
    }

    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errors = validate("all", input);
    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      let seasons = [];
      if (input.summer) seasons.push("SUMMER");
      if (input.winter) seasons.push("WINTER");
      if (input.spring) seasons.push("SPRING");
      if (input.autumn) seasons.push("AUTUMN");
      dispatch(createActivity({ ...input, seasons }));
      setSuccess(true);
      setInput({
        name: "",
        dificulty: "1",
        duration: "",
        countries: [],
        summer: false,
        winter: false,
        spring: false,
        autumn: false,
      });
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(e.target.name, {
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleChangeSeasons(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.checked,
    });
    setErrors(
      validate("seasons", {
        ...input,
        [e.target.name]: e.target.checked,
      })
    );
  }

  function handleChangeCountries(e) {
    e.preventDefault();
    if (e.target.value) {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
      setCountriesToSelect(
        countriesToSelect.filter((c) => {
          return c.id !== e.target.value;
        })
      );
      document.getElementById("countriesToSelect").selectedIndex = 0;
      setErrors(
        validate("countries", {
          ...input,
          countries: [...input.countries, e.target.value],
        })
      );
    }
  }

  function deleteSelectedCountry(e) {
    e.preventDefault();
    setInput({
      ...input,
      countries: input.countries.filter((c) => {
        return c !== e.target.value;
      }),
    });
    setCountriesToSelect(
      countries
        .filter((c) => {
          return c.id === e.target.value;
        })
        .concat(countriesToSelect)
    );
    setErrors(
      validate("countries", {
        ...input,
        countries: input.countries.filter((c) => {
          return c !== e.target.value;
        }),
      })
    );
  }

  function handleClosePupup(e) {
    setSuccess(false)
  }

  return (
    <div>
      {success && (
        <div className="fondoBlur">
          <div className="popupCreated">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png"
              alt=""
            />
            <h2>Thank you!</h2>
            <p>Your details has been successfully submitted.</p>
            <Link to="/home"><button type="button" onClick={handleClosePupup}>Go home!</button></Link>
          </div>
        </div>
      )}

      <img
        className="logoWorldDetail"
        src="https://i.ibb.co/W5sCty9/logo-World-Espejo.png"
        alt="logo-World"
        border="0"
      />
      <div className="contenedorCreate">
        <Link to={"/home"}>
          <img
            className="arrowBack"
            src="https://cdn-icons-png.flaticon.com/512/507/507257.png"
            alt=""
          />
        </Link>
        <div className="contenedorForm">
          <h2 className="titulosCreate">Create an activity!</h2>

          <hr />

          <form action="" onSubmit={handleSubmit}>
            <div className="divsInputs">
              <h3>Name</h3>
              <input
                className="inputs"
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                placeholder="Name"
              />
              {errors.name && <p className="danger">{errors.name}</p>}
            </div>

            <br />
            <div className="dificultyDurationSeasons">
              <div className="divsInputs divDificultad">
                <h3 className="titulosCreate">Dificulty</h3>
                <select
                  name="dificulty"
                  onChange={handleChange}
                  className="inputs dicultyInput"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="divsInputs">
                <h3 className="titulosCreate">Duration</h3>
                <input
                  className="inputTime"
                  type="time"
                  value={input.duration}
                  name="duration"
                  onChange={handleChange}
                />
                {errors.duration && <p className="danger">{errors.duration}</p>}
              </div>

              <div className="divsInputs">
                <h3 className="titulosCreate">Seasons</h3>
                <div className="seasonsNames">
                  <label className="container">
                    <input
                      type="checkbox"
                      value={input.summer}
                      name="summer"
                      onChange={handleChangeSeasons}
                    />
                    Summer
                  </label>
                  <label className="container">
                    <input
                      type="checkbox"
                      value={input.winter}
                      name="winter"
                      onChange={handleChangeSeasons}
                    />
                    Winter
                    
                  </label>
                  <label className="container">
                    <input
                      type="checkbox"
                      value={input.spring}
                      name="spring"
                      onChange={handleChangeSeasons}
                    />
                    Spring
                    
                  </label>
                  <label className="container">
                    <input
                      type="checkbox"
                      value={input.autumn}
                      name="autumn"
                      onChange={handleChangeSeasons}
                    />
                    Autumn
                    
                  </label>
                </div>

                {errors.seasons && <p className="danger">{errors.seasons}</p>}
              </div>
            </div>
            <div className="divsInputs">
              <select
                className="inputs"
                id="countriesToSelect"
                name="countries"
                onChange={handleChangeCountries}
              >
                <option value="">--Select a country--</option>
                {countriesToSelect
                  ?.sort((a, b) => {
                    if (a.name < b.name) {
                      return -1;
                    } else {
                      return 1;
                    }
                  })
                  .map((c) => {
                    return <option value={c.id}>{c.name}</option>;
                  })}
              </select>
              {errors.countries && <p className="danger">{errors.countries}</p>}
            </div>
            {input.countries && (
              <div className="divCountriesSelected">
                {input.countries.map((c) => {
                  return (
                    <div className="countriesSelected">
                      <p className="pID">{c}</p>
                      <button
                        value={c}
                        className="botonXSelected"
                        onClick={deleteSelectedCountry}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="divsInputs">
              <button className="inputs buttonCreate">Create</button>
            </div>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <footer className="footerHome">
        <hr />
        <br />
        <div className="socials">
          <a target="_blank" href="https://github.com/MatiTonelli">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25657.png"
              alt="github logo"
              className="logos"
            />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/matias-tonelli/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3536/3536569.png"
              alt="linkedn logo"
              className="logos"
            />
          </a>
        </div>
        <hr className="hrFooter" />
        <p className="copyRight">Copyright © Matias Tonelli 2022</p>
      </footer>
    </div>
  );
}
