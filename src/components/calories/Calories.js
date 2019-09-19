import React, { useEffect } from "react"
import { useStateValue } from "../../state"
import firebase from "../../utils/firebase"
import ProgressRing from "../shared/progress-ring/ProgressRing"
import Loader from "../loader/Loader"

// const Calories = props => {
//   let total = 0
//   if (props.data) {
//     props.data.map(item => total += item.updated_cals_total)
//     const progress_width = (total / props.daily_cals_goal) * 100
//     let cal_total = Object.values(props.data)
//     if (cal_total.length > 0) {
//       let total = 0
//       cal_total.map(cals => total += cals.updated_cals_total)
//       return (
//         <div className='calories__container animate--fade-in'>
//           <ProgressRing progress={progress_width}
//                         goal={props.daily_cals_goal}/>
//           <p className='calories__text'>
//             I have consumed <span>{!total ? 0 : total}</span> calories today.
//           </p>
//         </div>
//       )
//     } else {
//       return (
//         <div className='calories__container'>
//           <p className='calories__text'>
//             I have consumed <span>0</span> calories today.
//           </p>
//         </div>
//       )
//     }
//   } else {
//     return <Loader />
//   }
// }

const Calories = () => {
  const [{ user }, dispatch] = useStateValue()

  const getExistingUserData = () => {
    firebase.database().ref('/users/' + user.uid).once('value').then(snapshot => {
      try {
        const data = snapshot.val()
        if (data) {
          if (!data.hasOwnProperty('data')) data.data = []
          dispatch({
            type: "user",
            payload: {
              ...user,
              avatar: data.avatar,
              dailyGoal: data.dailyGoal,
              data: data.data,
            }
          })
          console.log('success: ', data)
        } else {
          if (user.isAuthenticated) {
            firebase.database()
                    .ref(`/users/${user.uid}/`)
                    .set(JSON.parse(JSON.stringify(user)))
          } else {
            console.log('No user data.')
          }
        }
      }
      catch(e) {
        console.error(e)
      }
    })
  }

  useEffect(() => {
    getExistingUserData()
  }, [user.isAuthenticated])


  if (user.isAuthenticated) {
      let total = 0
      if (user.data) {
        user.data.map(item => total += item.updatedCalories)
        const progressBarWidth = (total / user.dailyGoal) * 100
        let userData = Object.values(user.data)
        if (userData.length > 0) {
          let total = 0
          userData.map(cals => total += cals.updatedCalories)
          return (
            <div className='calories__container animate--fade-in'>
              <ProgressRing progress={progressBarWidth}
                            goal={user.dailyGoal}/>
              <p className='calories__text'>
                I have consumed <span>{!total ? 0 : total}</span> calories today.
              </p>
            </div>
          )
        } else {
          return (
            <div className='calories__container'>
              <p className='calories__text'>
                I have consumed <span>0</span> calories today.
              </p>
            </div>
          )
        }
      } else {
        return <Loader />
      }
  } else {
    return null
  }
}

export default Calories
