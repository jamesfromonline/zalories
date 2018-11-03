import React from 'react'

const ProgressBar = props => {
  return (
    <div className='progress-bar__bar'
          style={{
            width: props.progress + '%',
            background: props.progress > 0 && props.progress <= 33.333
                                ? '#8ffdfc'
                                : props.progress > 33.333 && props.progress <= 50
                                ? '#8fc1fc'
                                : props.progress > 51 && props.progress <= 66.6666
                                ? '#c363a5'
                                : props.progress > 67 && props.progress <= 80
                                ? '#c43f9a'
                                : props.progress > 81 && props.progress <= 100
                                ? '#db1c87'
                                : props.progress >= 100
                                ? '#f04100'
                                : null
          }} />
  )
}

export default ProgressBar
