import React, { createContext, useContext, useReducer } from "react"

export const StateContext = createContext()

export const initialState = {
  user: {
    isAuthenticated: false,
    uid: '',
    username: '',
    avatar: '',
    totalCalories: 0,
    dailyGoal: 0
  },
  modify: {
    add: false,
    subtract: false,
    edit: false
  },
  isModalActive: false,
  isLoading: false
}

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
