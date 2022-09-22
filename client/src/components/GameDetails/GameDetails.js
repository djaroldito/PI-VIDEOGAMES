/* eslint-disable react-hooks/exhaustive-deps */
import {React, useEffect} from 'react'
import { useDispatch, useSelector}from 'react-redux'
import { getVideogameDetail, clean } from '../../actions/actions'
import Navbar from '../NavBar/NavBar'
import photo from '../../img/created.jpg'
import { NavLink } from 'react-router-dom'
import './gamedetail.css'

export default function GameDetails(props) {
    const dispatch = useDispatch()
    let gameDetails = useSelector((state)=>state.gameDetails)
    const {idVideogame} = props.match.params;

    // useEffect(() => {
    // dispatch(getVideogameDetail(idVideogame));}
    // return dispatch(clean()){}
    
    // ,[])

    useEffect(() => {
      dispatch(getVideogameDetail(idVideogame));
      return ()=> dispatch(clean())
    }, [dispatch, idVideogame]);
  
    return (
      <div className="container-detail">
        <Navbar />
        <div className="details-div">
          {gameDetails ? (
            <div>
              <h3 className="title">{gameDetails.name}</h3>
              {gameDetails.background_image ? (
                <div className="div-img">
                  <img src={gameDetails.background_image} alt="Videogame"></img>
                </div>
              ) : (
                <div className="div-img">
                  <img src={photo} alt="Videogame"></img>
                </div>
              )}
              {
                <p>
                  <strong>Release Date</strong>:{" "}
                  {`${gameDetails.releaseDate || "None"}`}
                </p>
              }
              <p>
                <strong>Rating</strong>: ★ {`${gameDetails.rating}`}
              </p>
              {gameDetails.description &&
              gameDetails.genres &&
              gameDetails.platforms ? (
                <div className="div-descr">
                  {
                    <p className="descripcion">
                      {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                    </p>
                  }
                  {
                    <p>
                      <strong>Genres</strong>:{" "}
                      {`${gameDetails.genres.join(", ")}`}
                    </p>
                  }
                  {
                    <p>
                      <strong>Platforms</strong>:{" "}
                      {`${
                        typeof gameDetails.platforms === "string"
                          ? gameDetails.platforms
                          : gameDetails.platforms.join(", ")
                      }`}
                    </p>
                  }

                  <NavLink to="/videogames">
                    <button>Volver</button>
                  </NavLink>
                </div>
              ) : (
                <h1>Cargando</h1>
              )}
            </div>
          ) : (
            <h1>Cargando</h1>
          )}
        </div>
      </div>
    );
}


