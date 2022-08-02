import React, { useContext, useState } from 'react'
import { DisplayAddGame } from '../context/DisplayAddGame'
import Axios from 'axios' 
import './../style/AddGamePage.css';
import { AuthContext } from '../context/AuthProvider'


const AddGame = () => {
    
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
    const { displayAddGame, setDisplayAddGame} = useContext(DisplayAddGame)

    // Displays the status of adding a game
    const [ endpointMsg, setEndpointStatus ] = useState('')
    // True when adding played games page is on. False when adding wishlist games page is on
    const [ changeAddGameSection, setAddGameSection ] = useState(true)

    // URI for adding played games
    const addGamePlayedURI = `${process.env.REACT_APP_SERVER_URI}/addplayedgame`
    // URI for adding wishlist games
    const addGameWishlistURI = `${process.env.REACT_APP_SERVER_URI}/addgamewishlist`

    // Adds games to played DB with their props
    // Checks if game exist in the RAWG API 
    // Adds it to DB along with its release date, title, and screenshot_URI
    /* 
    Games : {
        game_title: string,
        game_status: string,
        game_rating: string,
        game_hours_played: num,
        game_platforms: [
            string
        ],
        game_release_date: string,
        game_screenshot_uri: string,
        game_metacritic: string or num
    }
    */
    const addGameToWishlistDB = async (gameTitle) => {
        if (gameTitle.length === 0) return setEndpointStatus('Unable to add game. Please fill in all The fields')
        await Axios.get(`https://api.rawg.io/api/games`, {
            withCredentials: false,
            params: {
                key: `${process.env.REACT_APP_RAWG_API_KEY}`,
                search: gameTitle
            }
        })
        .then(async (response) => {
            if (response.status !== 200) return setEndpointStatus('Unable to add game. Please fill in all The fields')
            if (response.status === 404) return setEndpointStatus('Unable to find game. Please Try Again.') 
            let gameSlug = response.data.results[0].slug
            let game = await Axios.get(`https://api.rawg.io/api/games/${gameSlug}`, {
                withCredentials: false,
                params: {
                    key: `${process.env.REACT_APP_RAWG_API_KEY}`
                }
            })
            
            let parentPlatform = []
            game.data.parent_platforms.map((nameOfPlatform) => {
                parentPlatform.push(nameOfPlatform.platform.name)
            })
         

            console.log(parentPlatform)

            await Axios.post(addGameWishlistURI, {
                userID: authUser.userID,
                game: {
                    game_title: game.data.name,
                    game_screenshot_uri: game.data.background_image,
                    game_release_date: game.data.released,
                    game_metacritic: game.data.metacritic,
                    game_platforms: parentPlatform
                }
            })
            .then((response) => {
                console.log(response)
                setEndpointStatus('Successfully Added Game to wishlist.') 
                window.location.reload()
            })
            .catch((error) => {
                console.log(error)
                return setEndpointStatus('Unable to find game. Please Try Again.') 
            })
        })
        .catch((error) => {
            console.log("here")
            console.log(error)
        })
    }

    // Adds games to played DB with their props
    // Checks if game exist in the RAWG API 
    // Adds it to DB along with its release date, title, and screenshot_URI
    /* 
    Games : {
        game_title: string,
        game_status: string,
        game_rating: string,
        game_hours_played: num,
        game_platforms: [
            string
        ],
        game_release_date: string,
        game_screenshot_uri: string,
        game_metacritic: string or num
    }
    */
    const addGameToPlayedDB = async (gameTitle, gameStatus, gameRating, gameHoursPlayed) => {
        if (gameTitle.length === 0 || gameStatus === null || gameRating === null || gameHoursPlayed === null) return setEndpointStatus('Unable to add game. Please fill in all The fields')
        await Axios.get(`https://api.rawg.io/api/games`, {
            withCredentials: false,
            params: {
                search: gameTitle,
                key: `${process.env.REACT_APP_RAWG_API_KEY}`
            }
        })
        .then(async (response) => {
            if (response.status !== 200) return setEndpointStatus('Unable to add game. Please fill in all The fields')
            if (response.status === 404) return setEndpointStatus('Unable to find game. Please Try Again.') 
            let gameSlug = response.data.results[0].slug
            let game = await Axios.get(`https://api.rawg.io/api/games/${gameSlug}`, {
                withCredentials: false,
                params: {
                    key: `${process.env.REACT_APP_RAWG_API_KEY}`, 
                }
            })
            console.log(game)

            await Axios.post(addGamePlayedURI, {
                userID: authUser.userID,
                game: {
                    game_title: game.data.name,
                    game_status: gameStatus,
                    game_rating: gameRating,
                    game_screenshot_uri: game.data.background_image,
                    game_release_date: game.data.released,
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


    // Conponent for fields and buttons
    // Styles can be found "./../AddGamePage.css"
    const AddToPlayed = () => {
        const [gameTitle, setGameTitle] = useState('')
        const [gameStatus, setGameStatus] = useState('Currently Playing')
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
                            addGameToPlayedDB(gameTitle, gameStatus, gameRating, gameHoursPlayed)
                        }}>Add Game!</button>
                </form>
                
                <h1 className='mx-auto text-xl'>{endpointMsg}</h1>
            </div>
        )
    }

    // Conponent that has a single field for the game the user wants to add
    const AddToWishlist = () => {
        const [gameTitle, setGameTitle] = useState('')
        return(
            <div className='grid grid-cols-1 place-content-center'>
                <form>
                    <label className='text-field-label-game'>Game Title</label>
                    <input type="text" className='text-field-add-game w-3/4' onChange={e => setGameTitle(e.target.value)} />

                    <button className='add-game-btn' onClick={(e) => {
                            e.preventDefault()
                            addGameToWishlistDB(gameTitle)
                        }}>Add Game!</button>
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
                        setDisplayAddGame(false)
                    }}>
                        Exit
                </button>
            </div>
                
            <div className='flex items-center justify-center'>
                <button className={changeAddGameSection ? 'select-btn_ACTIVE' : 'select-btn'} onClick={(e) => {
                        e.preventDefault()
                        setAddGameSection(true)
                    }}>Add to Played</button>
                <p className='border border-black h-24'></p>
                <button className={!changeAddGameSection ? 'select-btn_ACTIVE' : 'select-btn'} onClick={(e) => {
                        e.preventDefault()
                        setAddGameSection(false)
                    }}>Add to Wishlist</button>
            </div>
            <p className='my-4'></p>
            <div>
                {changeAddGameSection ? <AddToPlayed /> : <AddToWishlist />}
            </div>
          
        </div>
    )
}

export default AddGame