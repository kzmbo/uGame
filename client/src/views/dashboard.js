import React from 'react'
import Axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useParams, useNavigate } from 'react-router-dom'
import { DisplayAddGame } from '../context/DisplayAddGame'
import AddGame from '../components/AddGame'
import GamePlayed from '../components/GamePlayed'
import GameWishlist from '../components/GameWishlist'

const Dashboard = () => {
  const navigate = useNavigate()

  const { userId } = useParams()
  const { authUser, setAuth } = useContext(AuthContext)
  const [ isDisplayingPlayedGames, setGameDisplayStatus ] = useState(false)
  const [ displayAddGame, setDisplayAddGame ] = useState(false)
  const [ displayEditGame, setDisplayEditGame ] = useState(false)

  const uid = authUser?.userID
  const sid = authUser?.sid
  const username = authUser.user?.username
  let gamesPlayed = authUser.user?.game_list?.games_played ?? []
  let gamesWishlist = authUser.user?.game_list?.games_wishlist ?? []

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

  return (
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
              setGameDisplayStatus(prev => !prev)
            }}>Library</button>
            <div className='dashboard-line'></div>
            <button className={!isDisplayingPlayedGames ? "btn_ACTIVE" : "dashboard-select-btn"} onClick={(e) => {
              e.preventDefault()
              setGameDisplayStatus(prev => !prev)
            }}>Wishlist</button>
          </div>

          <div className='my-2'></div>

          <div className='text-center'>
            <label className='dashboard-text-field-label'>Search Titles</label>
            <input type='text' className='dashboard-text-field '/>
          </div>
        </div>

        <div className='my-2'></div>
        
        <div className='md:game-card-md lg:game-card-lg h-full'>
          {isDisplayingPlayedGames ? <GamePlayed GamesPlayed={gamesPlayed} /> : <GameWishlist GamesWishlist={gamesWishlist} />}
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
      </div>
    </DisplayAddGame.Provider>
    
  )
}

export default Dashboard