import React, { useContext } from 'react'
import { DisplayAddGame } from '../context/DisplayAddGame'

const AddGame = () => {
    const { displayAddGame, setDisplayAddGame} = useContext(DisplayAddGame)

  return (
    <div className='fixed inset-0 bg-white opacity-90 w-full h-screen'>
        <button onClick={(e) => {
            e.preventDefault()
            setDisplayAddGame(false)
        }}>
            Exit
        </button>
    </div>
  )
}

export default AddGame