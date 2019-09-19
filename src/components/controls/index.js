import React from 'react'
import { useStateValue } from '../../state'

const Controls = () => {
    const [{ isModalActive }, dispatch] = useStateValue()

    return (
        <div className='app__buttons-container animate--fade-in'>
           <button>-</button>
           <button>+</button>
         </div>
    )
}

export default Controls