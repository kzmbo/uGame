import React from 'react'
import Axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useParams, useNavigate } from 'react-router-dom'
import GameElem from '../components/GameElem'

const Dashboard = () => {
  const navigate = useNavigate()

  const { userId } = useParams()
  const { authUser, setAuth } = useContext(AuthContext)
  const [ isDisplayingPlayedGames, setGameDisplayStatus ] = useState(false)
  
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
              <h1>{index + 1}.</h1>
              <h1>{game.game_title}</h1>
            </div>
              <h1>Status: {game.game_status}</h1>
              <h1>Rating: {game.game_rating} / 10</h1>
          </div>
          <button>Edit</button>
        </div>
      )
    })
  }

  const DisplayGameWishlist = () => {
    return gamesWishlist.map((game, index) => {
      return(
        <div>
          <img src='' alt='game-screenshot' />
          <div>
            <div>
              <h1>{index + 1}.</h1>
              <h1>{game.game_title}</h1>
            </div>
              <h1>Status: {game.game_status}</h1>
              <h1>Rating: {game.game_rating} / 10</h1>
          </div>
          <button>Edit</button>
        </div>
      )
    })
  }

  return (
    <div>
        <div>
          <h1>uGame</h1>
          <div>
            <p>Signed in as {username} </p>
            <button onClick={logoutUser}>Logout</button>
          </div>
        </div>

        <div>
          <h3>Games I've Played</h3>
          <div></div>
          <h3>Games I Want To Play</h3>
        </div>

        <div>
          <label>Search Title</label>
          <input type='text' />
        </div>
        
        <div>
          {isDisplayingPlayedGames ? <DisplayGamePlayed /> : <DisplayGameWishlist />}
        </div>
        
        <div>
            <h1>Add Game</h1>
            <button>+</button>
        </div>
    </div>
  )
}

export default Dashboard