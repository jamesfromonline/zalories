import React from 'react'
import Footer from '../footer/Footer'

const LogOut = props => {
  return (
    <div className='logout__container'>
      <div className='logout__top-bar'>
        <button onClick={props.toggleLogOut}>
          <i className='fa fa-backspace' />
        </button>
      </div>
      <div className='login__links'>
        <button className='logout__button'
          onClick={() => props.handleLogOut()}
          title='Sign in with Google'>
          Log Out
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default LogOut
