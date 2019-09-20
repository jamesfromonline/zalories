import React from 'react'
import { useStateValue } from '../../state'
import ProgressBar from '../shared/progress-bar/ProgressBar'

const GoalBar = props => {
  const [{ user, modify }, dispatch] = useStateValue()

  const toggleModify = operator => dispatch({ type: 'modify', payload: { ...modify, [operator]: true } })

  let total = user.totalCalories
  if (user.dailyGoal > 0) {
    const progressBarWidth = (total / user.dailyGoal) * 100
    return (
      <div className='goal-bar__container animate--fade-in' onClick={() => toggleModify('edit')}>
        <ProgressBar progress={progressBarWidth} />
        <p>{total} / {user.dailyGoal} calories</p>
      </div>
    )
  } else {
    return (
      <div className='goal-bar__container' onClick={() => toggleModify('edit')}>
        <p>+ Add a daily intake goal</p>
      </div>
    )
  }
}

export default GoalBar
