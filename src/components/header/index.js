import React from 'react'
import moment from 'moment'
import { useStateValue } from '../../state'

const Header = () => {
    const [{ user }, dispatch] = useStateValue(),
          date = moment().format('dddd, MMMM DD YYYY')
    return (
        <header className="app__header">
            <div className='app__date'>{date}</div>
                <button className='app__avatar' onClick={() => dispatch({ type: 'toggleModal', payload: true })}>
                <img alt='Avatar' src={user.avatar} />
            </button>
        </header>
    )
}

export default Header