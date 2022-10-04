import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";
import Loading from "../Loading/Loading";
import "./CountryDetail.css";

export default function CountryDetail(props) {
  const dispatch = useDispatch();
  let { name, id, flag, capital, subregion, area, poblacion, activities } =
    useSelector((state) => state.countryDetail);
  let buscado = props.match.params.id;
  const [loading, setLoading] = useState(false);

  const km2 = (numero) => {
    let resultado = "";
    let str = String(numero);
    let j = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      if (j % 3 === 0 && j !== 0) {
        resultado = "." + resultado;
      }
      resultado = str[i] + resultado;
      j++;
    }
    resultado += " km";
    return (
      <h2 className="datos">
        {resultado}
        <sup>2</sup>
      </h2>
    );
  };

  const population = (numero) => {
    let resultado = "";
    let str = String(numero);
    let j = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      if (j % 3 === 0 && j !== 0) {
        resultado = "." + resultado;
      }
      resultado = str[i] + resultado;
      j++;
    }
    return <h2 className="datos">{resultado}</h2>;
  };

  useEffect(() => {
    dispatch(getCountryDetail(buscado));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, "700");
  }, [buscado, dispatch]);

  return (
    <div>
      <img
        className="logoWorldDetail"
        src="https://i.ibb.co/W5sCty9/logo-World-Espejo.png"
        alt="logo-World"
        border="0"
      />
      <Link to={"/home"}>
        <img
          className="arrowBack"
          src="https://cdn-icons-png.flaticon.com/512/507/507257.png"
          alt=""
        />
      </Link>
      <div className="contenedor">
        {loading ? (
          <div className="loadingCountry">
            <Loading />
          </div>
        ) : (
          <div className="contenedorDetail">
            <div className="headDetail">
              <div className="divNombreId">
                <p className="nombrePais">{name}</p>
                <p className="id">({id})</p>
              </div>
              <img className="banderita" src={flag} alt="Country flag" />
            </div>
            <hr className="hrDetail" />
            <div className="contenedorDatos">
              <div className="divsTituloDato">
                <h2 className="titulos">Capital:</h2>
                <h2 className="datos">{capital}</h2>
              </div>
              <div className="divsTituloDato">
                <h2 className="titulos">Subregion:</h2>
                <h2 className="datos">{subregion}</h2>
              </div>
              <div className="divsTituloDato">
                <h2 className="titulos">Area:</h2>
                {km2(area)}
              </div>
              <div className="divsTituloDato">
                <h2 className="titulos">Population:</h2>
                {population(poblacion)}
              </div>
            </div>
            <hr className="hrActivities" />

            {Array.isArray(activities) && activities.length ? (
              <>
                <h2 className="noActivities">Activities:</h2>
                <div className="contenedorActividad">
                  <h3>Activity:</h3>
                  <h3>Dificulty:</h3>
                  <h3>Duration:</h3>
                  <h3>Seasons:</h3>
                </div>
              </>
            ) : (
              <></>
            )}
            {Array.isArray(activities) && activities.length ? (
              activities.map((a) => {
                return (
                  <Activity
                    name={a.name}
                    key={a.id}
                    dificulty={a.dificulty}
                    duration={a.duration}
                    seasons={a.seasons}
                  />
                );
              })
            ) : (
              <h4 className="noActivities"> No activities on this country </h4>
            )}
          </div>
        )}
      </div>
      <br />
      <br />
      <footer className="footerHome footerDetail">
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

function Activity({ name, dificulty, duration, seasons }) {
  return (
    <div className="contenedorActividad">
      <p className="nameActivity">{name}</p>

      <span className="divStars">
        {Array.apply(null, Array(dificulty)).map(() => {
          return (
            <img
              className="estrellitas"
              src="https://cdn-icons-png.flaticon.com/512/786/786432.png"
              alt="star"
            />
          );
        })}
      </span>

      <p className="durationActivity">{duration + " hrs"}</p>

      <div className="seasonsIconos">
        {seasons.map((s) => {
          if (s.name === "SUMMER") {
            return (
              <img
                className="seasonsIcons"
                src="https://cdn-icons-png.flaticon.com/512/2698/2698194.png"
                alt="sun"
              />
            );
          }
          if (s.name === "WINTER") {
            return (
              <img
                className="seasonsIcons"
                src="https://cdn-icons-png.flaticon.com/512/2530/2530064.png"
                alt="snow flake"
              />
            );
          }
          if (s.name === "AUTUMN") {
            return (
              <img
                className="seasonsIcons"
                src="https://cdn-icons-png.flaticon.com/512/3471/3471417.png"
                alt="autumn leaf"
              />
            );
          }
          if (s.name === "SPRING") {
            return (
              <img
                className="seasonsIcons"
                src="https://cdn-icons-png.flaticon.com/512/1762/1762755.png"
                alt="flower"
              />
            );
          }
        })}
      </div>
    </div>
  );
}
