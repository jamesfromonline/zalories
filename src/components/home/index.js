import React from 'react'
import { useStateValue } from '../../state'
import Header from '../header'
import Calories from '../calories/Calories'

const Home = () => {
    const [{ user }] = useStateValue()

    return (
        <>
            <Header />
            <Calories />
        </>
    )
}

export default Home