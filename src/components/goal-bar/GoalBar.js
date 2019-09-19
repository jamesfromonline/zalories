import React from 'react'
import { useStateValue } from '../../state'
import ProgressBar from '../shared/progress-bar/ProgressBar'

const GoalBar = props => {
  const [{ user }] = useStateValue()
  let total = 0
  if (user.dailyGoal > 0 && user.data) {
    props.data.map(item => total += item.updatedGoal)
    const progressBarWidth = (total / user.dailyGoal) * 100
    return (
      <div className='goal-bar__container animate--fade-in'>
        <ProgressBar progress={progressBarWidth} />
        <p>{total} / {user.dailyGoal} calories</p>
      </div>
    )
  } else {
    return (
      <div className='goal-bar__container'>
        <p>+ Add a daily intake goal</p>
      </div>
    )
  }
}

export default GoalBar
