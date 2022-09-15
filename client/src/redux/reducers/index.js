import { ORDER_COUNTRIES, GET_COUNTRIES, ALPHA_ASC, ALPHA_DESC, POP_ASC, POP_DESC } from "../constants"
const initialState = {
    countriesLoaded: [],
    countryDetail: {}
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countriesLoaded: action.payload
            }
        case ORDER_COUNTRIES:
            return {
                ...state,
                countriesLoaded: state.countriesLoaded.sort((a, b) => {
                    switch(action.payload) {
                        case ALPHA_ASC:
                            if(a.name < b.name){
                                return -1
                            } else {
                                return 1
                            }
                        case ALPHA_DESC:
                            if(a.name < b.name){
                                return 1
                            } else {
                                return -1
                            }
                        case POP_ASC:
                            if(a.poblacion < b.poblacion){
                                return -1
                            } else {
                                return 1
                            }
                        case POP_DESC:
                            if(a.poblacion < b.poblacion){
                                return 1
                            } else {
                                return -1
                            }
                    }
                })
            }
        default:
            return state
    }

}


export default rootReducer;