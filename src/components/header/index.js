import React from 'react'

const Header = () => {

    return (
        <header className="app__header app__header--login">
            <div className="ring"
                style={{
                    width: '45px',
                    height: '45px',
                    marginRight: '7px',
                    marginBottom: '1px',
                    borderWidth: '2px',
                    animation: 'none'
                }}/>
            <h1 style={{ margin: '0 0 3px 0' }}>simplr</h1>
        </header>
    )
}

export default Header