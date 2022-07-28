import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import Axios from 'axios'

// URL for deleting games from the wishlist library
const deleteWishlistGameURI = 'http://localhost:4000/deletewishlistgame'

// API endpoint for deleting games from the wishlist library
const deleteGameFromDB = async (gameID, userID) => {
    await Axios.delete(deleteWishlistGameURI, {data: {
        userID: userID,
        gameID: gameID
    }})
    .then((response) => {
        if (response.status !== 200) return 
        window.location.reload()
    })
    .catch((error) => {
        console.log(error)
    })
}

// Prints out all of the available platforms for that particular game
const RenderPlatforms = ({platforms}) => {
  return platforms.map((plat, i) => {
    return (
      <p className='text-lg px-1 font-normal' key={i}>{plat}</p>
    )
  })
}

// Maps out all of the games from the wishlist and displays a card
// Styles can be found in './../style/GameCard.css'
const GameWishlist = ({ GamesWishlist }) => {
    let gid = []
    const { authUser, setAuth } = useContext(AuthContext)
    
    return GamesWishlist.map((game, index) => {
      gid.push(game._id)
        return(
          <div key={index} className='p-4 py-10 md:p-10'>
            <div className='dashboard-game-section'>
              <div className='dashboard-game-img-box'>
                <img src={game.game_screenshot_uri} alt='game-screenshot' className='dashboard-game-img'/>
              </div>
              
              <div className='dashboard-game-textbox relative'>
                <div className='dashboard-game-textbox-title-rating-section'>
                  <h1 className='dashboard-game-title'>{game.game_title}</h1>
                  <h1 className='dashboard-game-rating w-full text-sm'>Metacritic: {game.game_metacritic} / 100</h1>
                </div>
                <div className='dashboard-game-textbox-subinfo-section'>
                    <h1 className='dashboard-game-subtext-heading'>Released Date: <p className='dashboard-game-subtext-info'>{game.game_release_date}</p></h1>
                    <div>
                        <h1 className='dashboard-game-subtext-heading'>Available On: 
                          <div className='flex justify-start px-1'>
                            {<RenderPlatforms platforms={game.game_platforms} />}
                          </div>
                        </h1>
                    </div>  
                </div>
                <button className='dashboard-game-delete-btn' onClick={(e) => {
                  e.preventDefault()
                  deleteGameFromDB(gid[index], authUser.userID)
                }}>🗑️</button>
              </div>
            </div>
          </div>
        )
      }
    )
}

export default GameWishlist