import { 
    ORDER_COUNTRIES,  
    GET_COUNTRIES, 
    GET_COUNTRY_DETAIL, 
    ALPHA_ASC, 
    ALPHA_DESC, 
    POP_ASC, 
    POP_DESC,  
    FILTER_BY_CONTINENT, 
    GET_ACTIVITIES,
        } from "../constants"

const initialState = {
    countriesLoaded: [],
    countryDetail: {},
    countriesToShow: [],
    activitiesLoaded: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countriesLoaded: action.payload,
                countriesToShow: action.payload
            }
        case ORDER_COUNTRIES:
            return {
                ...state,
                countriesToShow: state.countriesToShow.sort((a, b) => {
                    switch (action.payload) {
                        case ALPHA_ASC:
                            if (a.name < b.name) {
                                return -1
                            } else {
                                return 1
                            }
                        case ALPHA_DESC:
                            if (a.name < b.name) {
                                return 1
                            } else {
                                return -1
                            }
                        case POP_ASC:
                            if (a.poblacion < b.poblacion) {
                                return -1
                            } else {
                                return 1
                            }
                        case POP_DESC:
                            if (a.poblacion < b.poblacion) {
                                return 1
                            } else {
                                return -1
                            }
                        default:
                            return state
                    }
                })
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload
            }
        case FILTER_BY_CONTINENT:
            return {
                ...state,
                countriesToShow: state.countriesToShow.filter((c) => { return c.continent === action.payload })
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activitiesLoaded: action.payload.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1
                    } else {
                        return 1
                    }
                })
            }
        default:
            return state
    }

}


export default rootReducer;