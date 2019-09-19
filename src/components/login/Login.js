import React, { useEffect } from "react"
import { useStateValue } from "../../state"
import Footer from "../footer/Footer"
import firebase, { twitter, google, facebook, auth } from "../../utils/firebase"

const Login = props => {
  const [{ user, isLoading }, dispatch] = useStateValue()

  const checkForPreviousLogin = () => {
    auth.onAuthStateChanged(async account => {
      try {
        if (account) {
          const userInfo = await account
          dispatch({
            type: "user",
            payload: {
              isAuthenticated: true,
              uid: userInfo.uid,
              username: userInfo.displayName,
              avatar_url: userInfo.photoURL
            }
          })

          dispatch({
            type: "toggleLoader",
            payload: false
          })
        } else {
          console.log("not logged in")
        }
      } catch (e) {
        console.error("Error fetching previous auth: ", e)
      }
    })
  }

  const handleLogIn = source => {
    auth.signInWithPopup(source).then(async result => {
      try {
        const account = await result.additionalUserInfo.profile
        console.log("logged in: ", account)
        if (source === "twitter") {
          dispatch({
            type: "user",
            payload: {
              isAuthenticated: true,
              uid: account.uid,
              username: account.name,
              avatar_url: account.profile_image_url_https
            }
          })
        } else {
          dispatch({
            type: "user",
            payload: {
              isAuthenticated: true,
              uid: account.id,
              username: account.name,
              avatar_url: account.profile_image_url_https
            }
          })
        }

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
