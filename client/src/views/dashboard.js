import React from 'react'
import Axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useParams, useNavigate } from 'react-router-dom'
import { DisplayAddGame } from '../context/DisplayAddGame'
import { DisplayEditGame } from '../context/DisplayEditGame'
import AddGame from '../components/AddGame'
import GamePlayed from '../components/GamePlayed'
import GameWishlist from '../components/GameWishlist'
import EditGame from '../components/EditGame'

const Dashboard = () => {
  const navigate = useNavigate()

  // Places userid in url when on dashboard
  const { userId } = useParams()

  /*
    authUser : {
      userID (String),
      sid (String),
      user ({..} see user.js in server/models/)
    }
  */
  const { authUser, setAuth } = useContext(AuthContext)

  // True if the dashboard is displaying Played Games or False when displaying Wishlist
  const [ isDisplayingPlayedGames, setGameDisplayStatus ] = useState(true)
  
  // True when the page for adding games is displayed
  const [ displayAddGame, setDisplayAddGame ] = useState(false)

  // String for the search filter
  const [ searchEntry, setSearchEntry ] = useState('')
  
  // Info for the game that is going to be edited 
  const [ displayEditGame, setDisplayEditGame ] = useState({
    display: false,
    gameID: '',
    gameTitle: '',
    gameRating: null,
    gameHoursPlayed: null,
    gameStatus: null
  })

  // User's ID
  const uid = authUser?.userID
  // Session ID
  const sid = authUser?.sid
  // Username
  const username = authUser.user?.username
  // List of games that the user played
  let gamesPlayed = authUser.user?.game_list?.games_played ?? []
  // List of games that the user wants to play (wishlist)
  let gamesWishlist = authUser.user?.game_list?.games_wishlist ?? []
  // List of games that contains the letters from the search filter
  let gameSearch = []

  // Logs the user out of the dashboard and deletes the session
  const logoutUser = async () => {
    await Axios.post('http://localhost:4000/logout')
    .then((response) => {
      setAuth({})
      navigate(`/login`, {replace: true})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // Filters the games from the played list
  const filterGamesPlayed = () => {
    gamesPlayed.filter((elem) => {
      if (searchEntry === '') return elem
      if (elem.game_title.toLowerCase().includes(searchEntry.toLowerCase())) return elem
    }).map((val, key) => {
      gameSearch.push(val)
    })
    return (
      <GamePlayed GamesPlayed={gameSearch} />
    )
  }

  // Filters the games from the wishlist list
  const filterGamesWishlist = () => {
    gamesWishlist.filter((elem) => {
      if (searchEntry === '') return elem
      if (elem.game_title.toLowerCase().includes(searchEntry.toLowerCase())) return elem
    }).map((val, key) => {
      gameSearch.push(val)
    })
    return (
      <GameWishlist GamesWishlist={gameSearch} />
    )
  }

  // Uses styles from ./../styles/Dashboard.css
  return (
    <DisplayEditGame.Provider value={{displayEditGame, setDisplayEditGame}}>
      <DisplayAddGame.Provider value={{displayAddGame, setDisplayAddGame}}>
        <div className='bg-dashboard relative'>
          <div className='bg-white pb-5 w-full overflow-hidden'>
            <div className='dashboard-header'>
              <h1 className='dashboard-header-logo'>uGame</h1>
              <div className='dashboard-header-logout-section'>
                <p className='dashboard-header-signin-status '>Hello, {username} </p>
                <button className='dashboard-logout-btn' onClick={logoutUser}>Logout</button>
              </div>
          </div>

            <div className='my-2'></div>

            <div className='dashboard-select-section'>
              <button className={isDisplayingPlayedGames ? "btn_ACTIVE" : "dashboard-select-btn"} onClick={(e) => {
                e.preventDefault()
                setGameDisplayStatus(true)
              }}>Library</button>
              <div className='dashboard-line'></div>
              <button className={!isDisplayingPlayedGames ? "btn_ACTIVE" : "dashboard-select-btn"} onClick={(e) => {
                e.preventDefault()
                setGameDisplayStatus(false)
              }}>Wishlist</button>
            </div>

            <div className='my-2'></div>

            <div className='text-center'>
              <label className='dashboard-text-field-label'>Search Titles</label>
              <input type='text' className='dashboard-text-field ' onChange={(e) => {
                e.preventDefault()
                setSearchEntry(e.target.value)
              }}/>
            </div>
          </div>

          <div className='my-2'></div>
          
          <div className='md:game-card-md lg:game-card-lg h-full'>
            {isDisplayingPlayedGames ? filterGamesPlayed() : filterGamesWishlist()}
          </div>
        
          <div className='my-16'></div>
          

          <div className='dashboard-add-game-banner'>
              <h1 className='dashboard-add-game-text'>Add Game</h1>
              <div className='dashboard-format-add-game'>
                <button className='dashboard-add-game-btn' onClick={(e) => {
                    e.preventDefault()
                    setDisplayAddGame(true)
                  }}>+</button>
              </div>
          </div>
          {displayAddGame ? <AddGame /> : null}
          {displayEditGame.display ? <EditGame 
            gameID={displayEditGame.gameID} 
            gameTitle={displayEditGame.gameTitle}
            _gameRating={displayEditGame.gameRating}
            _gameHoursPlayed={displayEditGame.gameHoursPlayed}
            _gameStatus={displayEditGame.gameStatus}
          /> : null}
        </div>
      </DisplayAddGame.Provider>
    </DisplayEditGame.Provider>
  )
}

export default Dashboard