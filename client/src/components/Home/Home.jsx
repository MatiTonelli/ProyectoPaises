import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import {
  filterByContinent,
  filterBySearch,
  getCountries,
  orderCountries,
} from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard.jsx";
import "./Home.css";
import Paginate from "../Paginate/Paginate";
import Loading from "../Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const countriesToShow = useSelector((state) => state.countriesToShow);
  const [order, setOrder] = useState("");
  const [filters, setFilters] = useState(["", "", ""]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const countriesPerPage = page === 1 ? 9 : 10;
  const countriesOfCurrentPage =
    page === 1
      ? countriesToShow.slice(
          page * countriesPerPage - countriesPerPage,
          page * countriesPerPage
        )
      : countriesToShow.slice(
          page * countriesPerPage - countriesPerPage - 1,
          page * countriesPerPage - 1
        );

  useEffect(() => {
    dispatch(getCountries(filters[0], filters[2]));
    setLoading(true);
    setTimeout(() => {
      if (filters[1]) {
        dispatch(filterByContinent(filters[1]));
      }
      if (order) {
        dispatch(orderCountries(order));
      }
      setOrder(order);
      setLoading(false);
    }, "1500");
  }, [filters]);

  return (
    <div className="contenedorHome">
      <NavBar
        setOrder={setOrder}
        setPage={setPage}
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="countriesAndPaginate">
          <Paginate
            setPage={setPage}
            page={page}
            cantPaisesTotal={countriesToShow.length}
          />
          <div className="contenedorCountries">
            {countriesOfCurrentPage.length?countriesOfCurrentPage.map((c) => (
              <Link to={`/country/${c.id}`}>
                <div className="divPaises">
                  <CountryCard
                    flag={c.flag}
                    name={c.name}
                    continent={c.continent}
                  />
                </div>
              </Link>
            )):(<h1>Countries not found!</h1>)}
          </div>
        </div>
      )}
      <br /><br /><br />
      <footer className="footerHome">
        <hr />
        <br />
        <div className="socials">
          <a target="_blank" href="https://github.com/MatiTonelli"><img src="https://cdn-icons-png.flaticon.com/512/25/25657.png" alt="github logo" className="logos"/></a>
          <a target="_blank" href="https://www.linkedin.com/in/matias-tonelli/"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536569.png" alt="linkedn logo" className="logos" /></a>
        </div>
        <hr className="hrFooter"/>
        <p className="copyRight">Copyright © Matias Tonelli 2022</p>
      </footer>
    </div>
  );
}
