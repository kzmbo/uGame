import React from 'react'

const GameWishlist = ({ GamesWishlist }) => {
    return GamesWishlist.map((game, index) => {
        return(
          <div key={index} className='p-4 py-10 md:p-10'>
            <div className='dashboard-game-section'>
              <div className='dashboard-game-img-box'>
                <img src={game.game_screenshot_uri} alt='game-screenshot' className='dashboard-game-img'/>
              </div>
              
              <div className='dashboard-game-textbox relative'>
                <div className='dashboard-game-textbox-title-rating-section'>
                  <h1 className='dashboard-game-title'>{game.game_title}</h1>
                </div>
                <div className='dashboard-game-textbox-subinfo-section'>
                    <h1 className='dashboard-game-subtext-heading'>Released Date: <p className='dashboard-game-subtext-info'>{game.game_release_date}</p></h1>
                    <div>
                        <h1 className='dashboard-game-subtext-heading'>Available On: </h1>
                        {}
                    </div>
                </div>

              </div>
            </div>
          </div>
        )
      }
    )
}

export default GameWishlist