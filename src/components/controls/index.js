import React from 'react'
import { useStateValue } from '../../state'
import moment from 'moment'
import firebase from '../../utils/firebase'
import Modify from '../modify/Modify'

const Controls = () => {
    const [{ modify }, dispatch] = useStateValue()

    const toggleModify = operator => dispatch({ type: 'modify', payload: { ...modify, [operator]: true } })

    return (
        <div className='app__buttons-container animate--fade-in'>
           <button onClick={() => toggleModify('subtract')}>-</button>
           <button onClick={() => toggleModify('add')}>+</button>
         </div>
    )
}

export default Controls