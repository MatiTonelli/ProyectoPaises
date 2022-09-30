import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Paginate.css"

export default function Paginate({ setPage, page, cantPaisesTotal }) {
  let pages;
  if(cantPaisesTotal<10){
    pages = 1
  } else {
    pages = cantPaisesTotal % 10 === 0 ? cantPaisesTotal / 10 + 1 : Math.ceil(cantPaisesTotal/10)
  }
  let arrayPages = []
  for (let i = 1; i <= pages; i++) {
    arrayPages.push(i)
  }
  function handleClick(e) {
    e.preventDefault();
    if (e.target.value === "retroceder") {
      setPage(page - 1);
    } else if (e.target.value === "avanzar") {
      setPage(page + 1);
    } else {
      setPage(parseInt(e.target.value));
    }
  }

  return (
    <div className="contenedorPaginate">
      <button disabled={page === 1} value="retroceder" className="button arrowButtons" onClick={handleClick}>
        {"↑"}
      </button>

      {arrayPages.map((p) => (
        <button className={ p === page ? "button currentButtonPage" : "button normalButtonPage" } value={p} onClick={handleClick}>
          {p}
        </button>
      ))}

      <button disabled={page === pages} className="button arrowButtons" value="avanzar" onClick={handleClick}>
        {"↓"}
      </button>
    </div>
  );
}
