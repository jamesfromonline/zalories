import React from "react"
import { useStateValue } from "../../state"

const Loader = () => {
  const [{ isLoading }] = useStateValue()
  if (isLoading) {
    return (
      <div className="loader__container">
        <div className="ring" />
      </div>
    )
  } else {
    return null
  }
}

export default Loader
