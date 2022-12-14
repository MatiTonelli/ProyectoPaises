import axios from 'axios'
import { GET_COUNTRIES, GET_COUNTRY_DETAIL, ORDER_COUNTRIES, CREATE_ACTIVITY, GET_ACTIVITIES, FILTER_BY_CONTINENT } from '../constants'

export function getCountries(name, activityId) {
    return async function (dispatch) {
        let json;
        if(name && activityId){
            json = await axios.get(`/countries/?name=${name}&activityId=${activityId}`)
        } else if(name){
            json = await axios.get(`/countries/?name=${name}`)
        } else if(activityId){
            json = await axios.get(`/countries/?activityId=${activityId}`)
        } else {
            json = await axios.get("/countries")
        }
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

export function orderCountries(data) {
    return {
        type: ORDER_COUNTRIES,
        payload: data,
    }
}


export function filterByContinent(continent) {
    return {
        type: FILTER_BY_CONTINENT,
        payload: continent
    }
}


export function createActivity(data) {
    return async function (dispatch) {
        try {
            await axios.post("/activities", data)
            return dispatch({
                type: CREATE_ACTIVITY,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }

    }
}

export function getCountryDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`/countries/${id}`)
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        try {
            let json = await axios.get(`/activities`)
            return dispatch({
                type: GET_ACTIVITIES,
                payload : json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
