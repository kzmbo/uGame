import React from 'react'
import { useParams } from 'react-router-dom'

const Dashboard = () => {
  const { userId } = useParams()
  
  return (
    <div>
        this is the dashboard
    </div>
  )
}

export default Dashboard