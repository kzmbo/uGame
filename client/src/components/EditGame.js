import React, { useContext, useState } from 'react'
import Axios from 'axios' 
import './../style/AddGamePage.css';
import { DisplayEditGame } from '../context/DisplayEditGame'
import { AuthContext } from '../context/AuthProvider';

const EditGame = ( {gameID, gameTitle, _gameRating, _gameHoursPlayed, _gameStatus} ) => {

    /*
        authUser : {
            userID (String),
            sid (String),
            user ({..} see user.js in server/models/)
        }
    */
    const { authUser } = useContext(AuthContext)

    /*
      displayEditGame:  {
            display: false,
            gameID: '',
            gameTitle: '',
            gameRating: null,
            gameHoursPlayed: null,
            gameStatus: null
        }
    */
    const { displayEditGame, setDisplayEditGame} = useContext(DisplayEditGame)

    // Displays the status of editing a game
    const [ endpointMsg, setEndpointStatus ] = useState('')

    // URI for editing played games
    const editPlayedGameURI = `${process.env.REACT_APP_SERVER_URI}/api/editplayedgame`
    // URI for deleting played games
    const deletePlayedGameURI = `${process.env.REACT_APP_SERVER_URI}/api/deleteplayedgame`

    // Deletes Played Games from the DB
    const deleteGameFromDB = async (gameID, userID) => {
        await Axios.delete(deletePlayedGameURI, {data: {
            userID: userID,
            gameID: gameID
        }})
        .then((response) => {
            if (response.status !== 200) return setEndpointStatus('Unable to remove game. Please Try Again.')
            setEndpointStatus('Successfully Removed Game from library.') 
            window.location.reload()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // Adds changes to a played game
    const editGameToPlayedDB = async (gameStatus, gameRating, gameHoursPlayed) => {
        console.log(gameStatus)
        if (gameStatus === null || gameRating === null || gameHoursPlayed === null) return setEndpointStatus('Unable to add game. Please fill in all The fields')
        await Axios.put(editPlayedGameURI, {
            userID: authUser.userID,
            gameID: gameID,
            gameStatus: gameStatus,
            gameRating: gameRating,
            gameHoursPlayed: gameHoursPlayed
        })
        .then((response) => {
            if (response.status !== 200) return setEndpointStatus('Unable to edit game. Please check all The fields')
            setEndpointStatus('Successfully Edited Game from library.') 
            window.location.reload()
        })
        .catch((error) => {
            console.log(error)
            return setEndpointStatus('Unable to edit game. Please Try Again.') 
        })
    }

    // Conponent for fields and buttons
    // Styles can be found "./../AddGamePage.css"
    const EditToPlayed = () => {
        const [gameStatus, setGameStatus] = useState(_gameStatus)
        const [gameRating, setGameRating] = useState(_gameRating)
        const [gameHoursPlayed, setGameHoursPlayed] = useState(_gameHoursPlayed)
        return(
            <div className='grid grid-cols-1 place-content-center'>
                <form>
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
                    <button className='delete-game-btn' onClick={(e) => {
                        e.preventDefault()
                        deleteGameFromDB(gameID, authUser.userID)
                    }}>Delete Game</button>
                    <button className='add-game-btn' onClick={(e) => {
                            e.preventDefault()
                            editGameToPlayedDB(gameStatus, gameRating, gameHoursPlayed)
                        }}>Edit Game!</button>
                </form>
                
                <h1 className='mx-auto text-xl'>{endpointMsg}</h1>
            </div>
        )
    }

    // Styles can be found "./../AddGamePage.css"
    return (
        <div className='fixed inset-0 bg-white opacity-95 w-full h-screen'>
            <div className='flex justify-end p-4 md:p-7'>
                <button className='exit-btn' onClick={(e) => {
                    e.preventDefault()
                        setDisplayEditGame(false)
                    }}>
                        Exit
                </button>
            </div>
                
            <div className=''>
                <h1 className='edit-header'>Edit Game:</h1>
                <p className='edit-header-game-title'>{gameTitle}</p>
            </div>
            <p className='my-4'></p>
            <div>
                <EditToPlayed /> 
            </div>
          
        </div>
    )
}

export default EditGame