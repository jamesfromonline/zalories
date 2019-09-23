import React from "react"
import moment from "moment"
import { useStateValue } from "../../state"

const Header = () => {
  const [{ user }, dispatch] = useStateValue(),
    date = moment().format("dddd, MMMM DD YYYY")
  if (user.isAuthenticated) {
    return (
      <header className="app__header">
        <div className="app__date">{date}</div>
        <button
          className="app__header-button"
          onClick={() => dispatch({ type: "toggleModal", payload: true })}
        >
          {/* <img alt='Avatar' src={user.avatar} /> */}
          <div className="app__header--logout" />
        </button>
      </header>
    )
  } else {
    return (
      <header className="app__header app__header--login">
        <div
          className="ring"
          style={{
            width: "45px",
            height: "45px",
            marginRight: "7px",
            marginBottom: "1px",
            borderWidth: "2px",
            animation: "none"
          }}
        />
        <h1 style={{ margin: "0 0 3px 0" }}>simplr</h1>
      </header>
    )
  }
}

export default Header
