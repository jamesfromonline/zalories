import React, { useEffect } from "react"
import { useStateValue } from "../../state"
import firebase from "../../utils/firebase"

const Calories = () => {
  const [{ user }, dispatch] = useStateValue()

  const getExistingUserData = () => {
    dispatch({
      type: 'toggleLoader',
      payload: true
    })
    firebase.database()
            .ref('/users/' + user.uid)
            .once('value')
            .then(snapshot => {
      try {
        const data = snapshot.val()
        if (data) {
          dispatch({
            type: "user",
            payload: {
              ...user,
              avatar: data.avatar,
              dailyGoal: data.dailyGoal,
              history: data.history,
              totalCalories: data.totalCalories
            }
          })
          dispatch({
            type: 'toggleLoader',
            payload: false
          })
        } else {
          firebase.database()
                  .ref(`/users/${user.uid}/`)
                  .set(JSON.parse(JSON.stringify(user)))
          dispatch({
            type: 'toggleLoader',
            payload: false
          })
        }
      }
      catch(e) {
        console.error(e)
      }
    })
  }

  useEffect(() => {
    getExistingUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user.isAuthenticated) {
    return (
      <div className='calories__container animate--fade-in'>
        <p className='calories__text'>
          I have consumed <span>{user.totalCalories}</span> calories today.
        </p>
      </div>
    )
  } else {
    return null
  }
}

export default Calories
