import React from 'react'
import ProgressRing from '../shared/progress-ring/ProgressRing'
import Loader from '../loader/Loader'

const Calories = props => {
  let total = 0
  if (props.data) {
    props.data.map(item => total += item.updated_cals_total)
    const progress_width = (total / props.daily_cals_goal) * 100
    let cal_total = Object.values(props.data)
    if (cal_total.length > 0) {
      let total = 0
      cal_total.map(cals => total += cals.updated_cals_total)
      return (
        <div className='calories__container animate--fade-in'>
          <ProgressRing progress={progress_width}
                        goal={props.daily_cals_goal}/>
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
}

export default Calories
