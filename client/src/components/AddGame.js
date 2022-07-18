import React, { useContext } from 'react'
import { DisplayAddGame } from '../context/DisplayAddGame'
import './../style/AddGamePage.css';

const AddGame = () => {
    const { displayAddGame, setDisplayAddGame} = useContext(DisplayAddGame)

    const addToPlayed = () => {
        return(
            <div>

            </div>
        )
    }

    const addToWishlish = () => {
        return(
            <div>

            </div>
        )
    }



    return (
        <div className='fixed inset-0 bg-white opacity-90 w-full h-screen'>
                <button className='exit-btn' onClick={(e) => {
                    e.preventDefault()
                        setDisplayAddGame(false)
                    }}>
                        Exit
                </button>
            <div className='flex items-center justify-center h-screen'>
                <button className='select-btn'>Add to Played</button>
                <p className='border border-black h-24'></p>
                <button className='select-btn'>Add to Wishlist</button>
            </div>
          
        </div>
    )
}

export default AddGame