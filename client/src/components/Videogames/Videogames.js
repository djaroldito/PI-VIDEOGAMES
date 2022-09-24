import React, {useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import Videogame from '../VideoGame/Videogame'
import Pagination from '../Pagination/Pagination'
import FilteredBy from '../FilterBy/FilterBy'
import './videogames.css'
import { getAllGames, getGenres } from '../../actions/actions'
import notFound from '../../img/llorando.gif'
import loading from '../../img/conecting.gif'

export default function Videogames() {

 console.log('se ejetuto el constructor')
  let allGames = useSelector((state) => state.filtered);//me traigo el estado global
  const dispatch = useDispatch()//meto el metodo en una variable
  const [currentPage, setCurrentPage] = useState(1)

    const [cardPerPage] = useState(15)

    //* indices de la paginación:
    const indexOfLastCard = currentPage * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage;

    var currentCards; //"cards" que se deben mostrar en la pantalla

    // en caso de que al buscar un juego en particular no encuentra ninguno
    if(typeof allGames === 'string'){
        currentCards = allGames
    }else {
        currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard) //uso los indices para "fraccionar que juegos muestro"
    }
    
    const paginate = (pageNumber) => {
         setCurrentPage(pageNumber)
    }

    useEffect (() => {
      console.log('se monto')
      if (allGames.length === 0 ){
        dispatch(getAllGames())//despacho la accion al reducer
        dispatch(getGenres())}
        },[allGames.length, dispatch]) 
       
        useEffect (() => {
    return()=>console.log('se desmonto') },[]) //indico que quiero que haga una vez desmontado

    return (
      <div className="container">
        <NavBar />
        <SearchBar />
        <FilteredBy />
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="games-div">
          {currentCards.length >= 1 ? (
            currentCards.map((g) => (
              <Videogame
                key={g.id}
                name={g.name}
                rating={g.rating}
                genres={g.genres}
                image={g.background_image}
                id={g.id}
              />
            ))
          ) : typeof currentCards === "string" ? (
            <div>
              <img className="nonono" src={notFound} alt=""></img>
            </div>
          ) : (
            <div>
              <img className="loading" src={loading} alt=""></img>
            </div>
          )}
        </div>
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    );
}




