import React from "react"

const Footer = () => {
  const date = new Date()
  return (
    <div className="footer__container">
      <p>&copy; ZALORIES {date.getFullYear()}</p>
    </div>
  )
}

export default Footer
