import React from 'react'
import { useStateValue } from '../../state'
import Header from '../header'
import Calories from '../calories'
import GoalBar from '../goal-bar'
import Controls from '../controls'
import Modify from '../modify'
import LogOut from '../logout'

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


//   detectKeyDown = e => {
//     switch( e.key ) {
//       case ']':
//         this.toggleAddCalories()
//         break
//       case '[':
//         this.toggleSubtractCalories()
//         break
//       case 'Escape':
//         this.setState({
//           toggle_add: false,
//           toggle_subtract: false,
//           toggle_logout: false,
//           toggle_change_goal: false
//         })
//         break
//       case 'g':
//         this.toggleChangeGoal()
//         break
//       default:
//         break
//     }
//   }