

import React, { useContext, useState } from 'react'
import { DisplayAddGame } from '../context/DisplayAddGame'
import Axios from 'axios' 
import './../style/AddGamePage.css';
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const AddGame = () => {
    const navigate = useNavigate()

    const { authUser } = useContext(AuthContext)

    const { displayAddGame, setDisplayAddGame} = useContext(DisplayAddGame)

    const [endpointMsg, setEndpointStatus] = useState('')

    const addGameURI = 'http://localhost:4000/addplayedgame'

    const addGameToDB = async (gameTitle, gameStatus, gameRating, gameHoursPlayed) => {
        console.log('running')
        if (gameTitle.length === 0 || gameStatus === null || gameRating === null || gameHoursPlayed === null) return setEndpointStatus('Unable to add game. Please fill in all The fields')
        await Axios.get(`https://api.rawg.io/api/games/${gameTitle}?key=c65af6735319413f81c8009fee466c76`, {
            withCredentials: false
        })
        .then(async (response) => {
            if (response.status !== 200) return setEndpointStatus('Unable to add game. Please fill in all The fields')
            if (response.status === 404) return setEndpointStatus('Unable to find game. Please Try Again.') 
            let game = response.data

            await Axios.post(addGameURI, {
                userID: authUser.userID,
                game: {
                    game_title: game.name,
                    game_status: gameStatus,
                    game_rating: gameRating,
                    game_screenshot_uri: game.background_image,
                    game_release_date: game.released,
                    game_hours_played: gameHoursPlayed
                }
            })
            .then((response) => {
                console.log(response)
                setEndpointStatus('Successfully Added Game to library.') 
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
                return setEndpointStatus('Unable to find game. Please Try Again.') 
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }


    const AddToPlayed = () => {
        const [gameTitle, setGameTitle] = useState('')
        const [gameStatus, setGameStatus] = useState(null)
        const [gameRating, setGameRating] = useState(0)
        const [gameHoursPlayed, setGameHoursPlayed] = useState(0)
        return(
            <div className='grid grid-cols-1 place-content-center'>
                <form>
                    <label className='text-field-label-game'>Game Title</label>
                    <input type="text" className='text-field-add-game w-3/4' onChange={e => setGameTitle(e.target.value)} />

                    <label className='text-field-label-game'>Rating (X / 10)</label>
                    <input type="text" className='text-field-add-game w-1/5' onChange={e => setGameRating(e.target.value)} />

                    <label className='text-field-label-game'>Hours Played</label>
                    <input type="text" className='text-field-add-game w-1/5' onChange={e => setGameHoursPlayed(e.target.value)}/>

                    <label className='text-field-label-game'>Status: </label>
                    <select className="status-dropmenu" onChange={e => setGameStatus(e.target.value)} name="status">
                        <option value="Currently Playing">Currently Playing</option>
                        <option value="Completed">Completed</option>
                        <option value="In Process">In Process</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                    <button className='add-game-btn' onClick={(e) => {
                            e.preventDefault()
                            addGameToDB(gameTitle, gameStatus, gameRating, gameHoursPlayed)
                        }}>Add Game!</button>
                </form>
                
                <h1 className='mx-auto text-xl'>{endpointMsg}</h1>
            </div>
        )
    }

    const AddToWishlish = () => {
        return(
            <div>

            </div>
        )
    }



    return (
        <div className='fixed inset-0 bg-white opacity-95 w-full h-screen'>
            <div className='flex justify-end p-4 md:p-7'>
                <button className='exit-btn' onClick={(e) => {
                    e.preventDefault()
                        setDisplayAddGame(false)
                    }}>
                        Exit
                </button>
            </div>
                
            <div className='flex items-center justify-center'>
                <button className='select-btn'>Add to Played</button>
                <p className='border border-black h-24'></p>
                <button className='select-btn'>Add to Wishlist</button>
            </div>
            <p className='my-4'></p>
            <div>
                <AddToPlayed />
            </div>
          
        </div>
    )
}

export default AddGame