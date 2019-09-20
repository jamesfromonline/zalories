import React, { useEffect } from "react"
import { useStateValue } from "../../state"
import Header from "../header"
import Footer from "../footer"
import { twitter, google, auth } from "../../utils/firebase"

const Login = () => {
  const [{ user }, dispatch] = useStateValue()

  const checkForPreviousLogin = () => {
    auth.onAuthStateChanged(async account => {
      try {
        if (account) {
          const userInfo = await account
          // console.log(userInfo)
          dispatch({
            type: "user",
            payload: {
              ...user,
              isAuthenticated: true,
              uid: auth.currentUser.uid,
              username: userInfo.displayName,
              avatar: userInfo.photoURL
            }
          })
        }
        dispatch({
          type: "toggleLoader",
          payload: false
        })
      } catch (e) {
        console.error("Error fetching previous auth: ", e)
      }
    })
  }

  const handleLogIn = source => {
    auth.signInWithPopup(source).then(async result => {
      try {
        const account = await result.additionalUserInfo.profile
        console.log(await account)
        dispatch({
          type: "user",
          payload: {
            ...user,
            isAuthenticated: true,
            uid: auth.currentUser.uid,
            username: account.name,
            avatar: account.profile_image_url_https
          }
        })
        dispatch({
          type: "toggleLoader",
          payload: true
        })
      } catch (e) {
        console.error("Error logging in: ", e)
      }
    })
  }

  useEffect(() => {
    dispatch({
      type: "toggleLoader",
      payload: true
    })
    checkForPreviousLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user.isAuthenticated) {
    return (
      <div className="login__container">
        <Header />
        <div className="login__links">
          <a
            className="login__link"
            onClick={() => handleLogIn(google)}
            title="Sign in with Google"
          >
            <i className="fab fa-google" />
          </a>
          <a
            className="login__link"
            onClick={() => handleLogIn(twitter)}
            title="Sign in with Twitter"
          >
            <i className="fab fa-twitter" />
          </a>
        </div>
        <Footer />
      </div>
    )
  } else {
    return null
  }
}

export default Login
