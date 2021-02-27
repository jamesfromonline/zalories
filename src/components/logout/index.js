import React from 'react'
import Footer from '../footer'
import { useStateValue } from '../../state'
import { auth } from '../../utils/firebase'

const LogOut = props => {
  const [{ user, isModalActive }, dispatch] = useStateValue()

  const toggleModal = () => dispatch({ type: 'toggleModal', payload: false })

  const handleLogOut = () => {
    auth.signOut()
      .then(() => {
        dispatch({
          type: 'user',
          payload: {
            ...user,
            isAuthenticated: false
          }
        })
        toggleModal()
      })
  }

  const showLogout = isModalActive ? 'logout__container' : 'hidden'
  return (
    <div className={showLogout}>
      <div className='logout__top-bar'>
        <button onClick={toggleModal}>
          <i className='fa fa-backspace' />
        </button>
      </div>
      <div className='login__links'>
        <button className='logout__button'
          onClick={handleLogOut}
          title='Log Out'>
          Log Out
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default LogOut
