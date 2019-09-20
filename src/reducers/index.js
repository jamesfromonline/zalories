export const rootReducer = (state, action) => {
    switch (action.type) {
      case "user":
        return {
          ...state,
          user: action.payload
        }
      case "toggleLoader":
        return {
          ...state,
          isLoading: action.payload
        }
      case "toggleModal":
        return {
          ...state,
          isModalActive: action.payload
        }
      case "modify":
        return {
          ...state,
          modify: action.payload
        }
      default:
        return state
    }
  }