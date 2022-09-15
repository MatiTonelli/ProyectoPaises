import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries } from "../../actions";


export class Paginado extends Component {

  render() {
    return
    <React.Fragment>
        {/* <NavBar/> */}

        <h1>soy Paginado</h1>
        {/* {this.props.countries?.map(c => 
            <div>
                <CountryCard name={c.name} continent={c.continent}/>
            </div>
        )} */}
    </React.Fragment>;
  }
}

function mapStateToProps(state) {
  return {
    countries: state.countriesLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //removeMovieFavorite: (movie) => dispatch(removeMovieFavorite(movie)),
    getCountries: () => dispatch(getCountries()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginado);
