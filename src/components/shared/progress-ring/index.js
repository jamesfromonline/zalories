import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ProgressRing = props => {
  console.log('prog', props.progress)
  return (
    <div className={props.goal > 0 ? 'progress-ring__container' : 'hidden'}>
      <CircularProgressbar
        percentage={props.progress}
        text={props.progress ? `${props.progress.toFixed(0)}%` : 0}
        initialAnimation={true}
        strokeWidth={5}
        className='progress-ring__circle-chart'
        styles={{
          path: { stroke: `${props.progress > 0 && props.progress <= 33.333
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
                              : null }`
                          },
            text: { fill: `${props.progress > 0 && props.progress <= 33.333
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
                                : null }`,
                                fontSize: '16px',
                                fontFamily: 'Arial'
                            }
        }}
      />
    </div>
  )
}

export default ProgressRing
