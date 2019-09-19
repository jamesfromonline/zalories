import React from "react"
import { useStateValue } from "../../state"

const Loader = () => {
  const [{ isLoading }] = useStateValue()
  if (isLoading) {
    return (
      <div className="loader__container">
        <div className="ring" />
        <h1>simplr</h1>
      </div>
    )
  } else {
    return null
  }
}

export default Loader
