import React from 'react'
import { Link } from 'react-router-dom'
import './videogame.css'
import photo from '../../img/created.jpg'


export default function Videogame({id,name,rating,genres,image}) {
    
    return (
      <div className="container-game">
        <div className="title-game">{name}</div>
              <div className="game-div">
          {image ? (
            <img src={`${image}`} alt="Videogame" className="Img"></img>
          ) : (
            <img src={photo} alt="Videogame" className="Img"></img>
          )}
        </div>
        <div className="infoRating">
          {
            <p>
              <strong>Rating</strong>: ★ {`${rating}`}
            </p>
          }
        </div>
        <div className="infoContGenres">
          {
            <p className="">
              <strong>Genres :</strong>{" "}
              {`${
                typeof genres === "string"
                  ? genres
                  : genres.join(", ")
              }`}
            </p>
          }
        </div>
        <div className="div-button">
          {id && (
            <Link to={`/videogame/${id}`}>
              <button className="Link">Details</button>
            </Link>
          )}
         </div>
      </div>
    );
}