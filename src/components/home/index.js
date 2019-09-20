import React from 'react'
import { useStateValue } from '../../state'
import Header from '../header'
import Calories from '../calories/Calories'
import GoalBar from '../goal-bar/GoalBar'
import Controls from '../controls'
import Modify from '../modify/Modify'
import LogOut from '../logout/LogOut'

const Home = () => {
    const [{ user }] = useStateValue()

    if (user.isAuthenticated) {
        return (
            <>
                <Header />
                <Calories />
                <GoalBar />
                <Controls />
                <Modify />
                <LogOut />
            </>
        )
    } else {
        return null
    }
}

export default Home