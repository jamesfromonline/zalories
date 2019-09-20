import React from "react"
import { StateProvider, initialState } from "./state"
import { rootReducer } from './reducers'
import Loader from "./components/loader"
import Login from "./components/login"
import Div100vh from "react-div-100vh"
import Home from './components/home'
import "./App.scss"

function App() {
  return (
    <StateProvider initialState={initialState} reducer={rootReducer}>
      <Div100vh className="app">
        <main className="app__wrapper">
          <Loader />
          <Login />
          <Home />
        </main>
      </Div100vh>
    </StateProvider>
  )
}

export default App
