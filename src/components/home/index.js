import React from 'react'
import { useStateValue } from '../../state'
import Header from '../header'
import Calories from '../calories/Calories'
import GoalBar from '../goal-bar/GoalBar'
import Controls from '../controls'

const Home = () => {
    const [{ user }] = useStateValue()

    return (
        <>
            <Header />
            <Calories />
            <GoalBar />
            <Controls />
        </>
    )
}

export default Home