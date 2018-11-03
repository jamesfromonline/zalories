import React from 'react'
import ProgressBar from '../shared/progress-bar/ProgressBar'

const GoalBar = props => {
  let total = 0
  if (props.daily_cals_goal > 0 && props.data) {
    props.data.map(item => total += item.updated_cals_total)
    const progress_width = (total / props.daily_cals_goal) * 100
    return (
      <div onClick={props.toggle_change}
           className='goal-bar__container animate--fade-in'>
        <ProgressBar progress={progress_width} />
        <p>{total} / {props.daily_cals_goal} calories</p>
      </div>
    )
  } else {
    return (
      <div onClick={props.toggle_change} className='goal-bar__container'>
        <p>+ Add a daily intake goal</p>
      </div>
    )
  }
}

export default GoalBar
