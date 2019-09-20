import React from 'react'
import { useStateValue } from '../../state'
import ProgressBar from '../shared/progress-bar'

const GoalBar = props => {
  const [{ user, modify }, dispatch] = useStateValue()

  const toggleModify = operator =>
    dispatch({ type: 'modify', payload: { ...modify, [operator]: true } })

  if (user.dailyGoal > 0) {
    const progressBarWidth = (user.totalCalories / user.dailyGoal) * 100
    return (
      <div className='goal-bar__container animate--fade-in'
           onClick={() => toggleModify('edit')}>
        <ProgressBar progress={progressBarWidth} />
        <p>{user.totalCalories} / {user.dailyGoal} calories</p>
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
