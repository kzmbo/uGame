import React, { useState, useContext } from 'react'

const GamePlayed = ({ GamesPlayed }) => {
    let gid = []
    const [test, setTest] = useState(false)

    return GamesPlayed.map((game, index) => {
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
                    <h1 className='dashboard-game-rating'>{game.game_rating} / 10 ★</h1>
                </div>
                <div className='dashboard-game-textbox-subinfo-section'>
                <h1 className='dashboard-game-subtext-heading'>Released Date: <p className='dashboard-game-subtext-info'>{game.game_release_date}</p></h1>
                    <h1 className='dashboard-game-subtext-heading'>Status: <p className='dashboard-game-subtext-info'>{game.game_status}</p></h1>
                    <h1 className='dashboard-game-subtext-heading'>Hours Played: <p className='dashboard-game-subtext-info'>{game.game_hours_played}</p></h1>
                </div>
                
                <button className='dashboard-game-edit-btn' onClick={() => {
                        console.log(gid[index])
                        setTest(prev => !prev)
                    }}>Edit</button>
                </div>
                {<>{test ? <>dasf</> : <>fgsd</> }</>}
            </div>
            </div>
        )
        }
    )
}

export default GamePlayed