import React from 'react'
import Footer from '../footer/Footer'
import firebase, { twitter, google, facebook, auth } from '../../utils/firebase'

const Login = props => {
  const login = props.handleLogIn
  return (
    <div className='login__container'>
      <div className='login__links'>
        {/* <h2>log in</h2> */}
        <a className='login__link'
          onClick={() => login(google)}
          title='Sign in with Google'>
          <i className='fab fa-google' />
        </a>
        {/* <a className='login__link'
          onClick={() => login(facebook)}
          title='Sign in with Facebook'>
          <i className='fab fa-facebook' />
        </a> */}
        <a className='login__link'
          onClick={() => login(twitter)}
          title='Sign in with Twitter'>
          <i className='fab fa-twitter' />
        </a>
      </div>
      <Footer />
    </div>
  )
}

export default Login
