import axios from "axios";
import {
  GET_ALL_GAMES,
  SEARCH_BY_NAME,
  GET_VIDEOGAME_DETAIL,
  GET_GENRES,
  ORDER_BY,
  FILTER_BY,
} from "./constantes";


export function searchByName(name) {
  return function (dispatch) {
    return axios
      .get(`/videogames?name=${name}`)
      .then((res) => {
        console.log(res)
        dispatch({ type: SEARCH_BY_NAME, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}
//
export function getGenres() {
  return async function (dispatch) {
    try {
      var res = await axios.get('/genres');
      console.log(res)
      return dispatch({ 
        type: 'GET_GENRES', payload: res.data,
      });
    } catch (error) {
        console.log (error);
      }
    };
}
export function getVideogameDetail(id) {
  return function (dispatch) {
    axios
      .get(`/videogame/${id}`)
      .then((res) => {
        console.log(res)
        dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}
export function getAllGames() {
  return function (dispatch) {
    return axios.get("/videogames/")
      .then((res) => {
        console.log(res)
        dispatch({ type: GET_ALL_GAMES, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}

//* Ordenamiento
export function orderBy(order) {
  return function (dispatch) {
    console.log(order)
    dispatch({ type: ORDER_BY, payload: order });
  };
}

//* Filtrado
export function filterBy(order) {
  return function (dispatch) {
    console.log(order)
    dispatch({ type: FILTER_BY, payload: order });
  };
}
