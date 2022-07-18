import React from 'react'
import Axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useParams, useNavigate } from 'react-router-dom'
import { DisplayAddGame } from '../context/DisplayAddGame'
import AddGame from '../components/AddGame'

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
  const gamesPlayed = authUser.user?.game_list?.games_played ?? []
  const gamesWishlist = authUser.user?.game_list?.games_wishlist ?? []

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

  const DisplayGamePlayed = () => {
    return gamesPlayed.map((game, index) => {
      return(
        <div>
          <img src='' alt='game-screenshot' />
          <div>
            <div>
              <h1>{game.game_title}</h1>
              <h1>{game.game_rating} / 10 ★</h1>
            </div>
              <h1>Status: {game.game_status}</h1>
              <h1>Hours Played: </h1>
              
          </div>
          <button>Edit</button>
        </div>
      )
    })
  }

  const DisplayGameWishlist = () => {
    return gamesWishlist.map((game, index) => {
      return(
        <div key={index} className='p-4 py-10 md:p-10'>
          <div className='dashboard-game-section'>
            <div className='dashboard-game-img-box'>
              <img src={game.game_screenshot_uri} alt='game-screenshot' className='dashboard-game-img'/>
            </div>
            
            <div className='dashboard-game-textbox relative'>
              <div className='dashboard-game-textbox-title-rating-section'>
                <h1 className='dashboard-game-title'>{game.game_title}</h1>
                <h1 className='dashboard-game-rating'>{game.game_rating} / 10 ★</h1>
              </div>
              <div className='dashboard-game-textbox-subinfo-section'>
              <h1 className='dashboard-game-subtext-heading'>Released Date: <p className='dashboard-game-subtext-info'>{game.game_release_date}</p></h1>
                <h1 className='dashboard-game-subtext-heading'>Status: <p className='dashboard-game-subtext-info'>{game.game_status}</p></h1>
                <h1 className='dashboard-game-subtext-heading'>Hours Played: <p className='dashboard-game-subtext-info'>123 hours</p></h1>
                <div>
                  <h1 className='dashboard-game-subtext-heading'>Played On: </h1>
                  {}
                </div>
              </div>
              <button className='dashboard-game-edit-btn'>Edit</button>
            </div>
          </div>
        </div>
      )
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

          {/* <div className='my-2'></div> */}

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

          {/* <div className='my-2'></div> */}

          <div className='text-center'>
            <label className='dashboard-text-field-label'>Search Titles</label>
            <input type='text' className='dashboard-text-field '/>
          </div>
        </div>

        {/* <div className='my-2'></div> */}
        
        <div className='md:game-card-md lg:game-card-lg h-full'>
          {isDisplayingPlayedGames ? <DisplayGamePlayed /> : <DisplayGameWishlist />}
        </div>
       
        {/* <div className='my-16'></div> */}
        

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