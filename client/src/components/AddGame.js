

import React, { useContext, useState } from 'react'
import { DisplayAddGame } from '../context/DisplayAddGame'
import Axios from 'axios' 
import './../style/AddGamePage.css';
import Autocomplete from 'react-autocomplete'

const AddGame = () => {
    const { displayAddGame, setDisplayAddGame} = useContext(DisplayAddGame)
    const [gameTitle, setGameTitle] = useState('')

    const game_response = async () => {
        if (gameTitle.length === 0) return
        await Axios.get(`https://api.rawg.io/api/games/${gameTitle}?key=c65af6735319413f81c8009fee466c76`)
    }
    

    const AddToPlayed = () => {
        return(
            <div className='grid grid-cols-1 place-content-center'>
                <label className='text-field-label-game'>Game Title</label>
                {/* <input type="text" className='text-field-add-game w-3/4' /> */}
                <Autocomplete 
                    getItemValue={(item) => item.name}
                    items={game_response}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    value={value}
                    onChange={(e) => value = e.target.value}
                    onSelect={(val) => value = val}
                />
                <label className='text-field-label-game'>Rating (X / 10)</label>
                <input type="text" className='text-field-add-game w-1/5' />
                <label className='text-field-label-game'>Hours Played</label>
                <input type="text" className='text-field-add-game w-1/5' />
                <label className='text-field-label-game'>Status: </label>
                <select class="status-dropmenu" name="status">
                    <option value="Currently Playing">Currently Playing</option>
                    <option value="Completed">Completed</option>
                    <option value="In Process">In Process</option>
                    <option value="Dropped">Dropped</option>
                </select>
                <button className='add-game-btn'>Add Game!</button>
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