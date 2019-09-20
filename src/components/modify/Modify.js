import React, { Component, useState, useRef } from 'react'
import { useStateValue } from '../../state'
import firebase from 'firebase'
import moment from 'moment'

const Modify = () => {
  const [disabled, setDisabled] = useState(true),
        [error, setError] = useState(false)

  const [{ user, modify }, dispatch] = useStateValue()

  const inputRef = useRef(null)

  const addCalories = amount => {
    const currentTotalCalories = user.totalCalories
    const updatedTotalCalories = currentTotalCalories + amount
    let data = Object.values(user.history)
    const updatedData = {
      timestamp: moment().unix(),
      previousTotalCalories: currentTotalCalories,
      updatedTotalCalories: updatedTotalCalories
    }
    data.push(updatedData)
    const newData = {
      ...user,
      history: data,
      totalCalories: updatedTotalCalories
    }
    dispatch({
        type: 'user',
        payload: newData
    })

    firebase.database().ref(`/users/${user.uid}`).set(newData)
    // firebase.database()
    //         .ref(`/users/${user.uid}`)
    //         .child('history')
    //         .set(data)
  }

    const subtractCalories = amount => {
      const currentTotalCalories = user.totalCalories
      const updatedTotalCalories = currentTotalCalories - amount
      let data = Object.values(user.history)
      const updatedData = {
        timestamp: moment().unix(),
        previousTotalCalories: currentTotalCalories,
        updatedTotalCalories: updatedTotalCalories
      }
      data.push(updatedData)
      const newData = {
        ...user,
        history: data,
        totalCalories: updatedTotalCalories
      }
      dispatch({
        type: 'user',
        payload: newData
      })
      firebase.database()
              .ref(`/users/${user.uid}`)
              .set(newData)
    }

  const modifyCaloricValue = e => {
    e.preventDefault()
    const totalCalories = user.totalCalories
    let value = Number(inputRef.current.value)
    let total = value + totalCalories
    if (modify.add) {
      addCalories(value)
      dispatch({
        type: 'modify',
        payload: {
          ...modify,
          add: false
        }
      })
      inputRef.current.value = ''
    } else {
      if (total > value) {
        subtractCalories(value)
        dispatch({
          type: 'modify',
          payload: {
            ...modify,
            subtract: false
          }
        })
        inputRef.current.value = ''
      } else {
        setError(true)
      }
    }
  }

  const handleInputValidation = e => {
    const value = e.target.value
    const totalCalories = user.totalCalories
    let total = value + totalCalories
    if (value.length > 0) {
      if (((modify.subtract && (value >= total)) || value < 0) || (modify.add && value < 0)) {
        setError(true)
      } else {
        setError(false)
      }
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const changeGoal = e => {
    e.preventDefault()
    editGoal(inputRef.current.value)
    dispatch({
      type: 'modify',
      payload: {
        ...modify,
        edit: false
      }
    })
  }

  const editGoal = amount => {
    dispatch({
      type: 'user',
      payload: {
        ...user,
        dailyGoal: amount
      }
    })
    firebase.database().ref(`/users/${user.uid}`).child('dailyGoal').set(amount)
    // this.getExistingUserData()
    dispatch({
      type: 'modify',
      payload: {
        ...modify,
        edit: false
      }
    })
  }

  if (modify.add || modify.subtract) {
    return (
      <div className={modify.add || modify.subtract ? 'modify__container modify--open' : 'modify__container modify--closed'}>
        <form onSubmit={modifyCaloricValue}>
          <input type='number'
                  min='0'
                  placeholder='Calories'
                  className='modify__input'
                  onChange={handleInputValidation}
                  ref={inputRef}
                  style={ error ? { borderBottom: '2px solid red' } : null } />
          <button onClick={modifyCaloricValue}
                  disabled={disabled || error}>
              GO
          </button>
          <p className={error ? 'modify__error' : 'hidden'}>
            {
              modify.add
                ? 'You can\'t add negative calories, try subtracting instead.'
                : 'You can\'t subtract negatives or more calories than you have eaten.'
            }
          </p>
        </form>
      </div>
    )
  } else if (modify.edit) {
    return (
      <div className='modify__container'>
        <form onSubmit={changeGoal}>
          <input type='number'
                min='0'
                  placeholder='Daily Calories Goal'
                  className='modify__input'
                  onChange={handleInputValidation}
                  ref={inputRef}
                  style={ error ? { borderBottom: '2px solid red' } : null } />
          <button onClick={changeGoal}
                  disabled={disabled || error}>
              GO
          </button>
          <p className={error ? 'modify__error' : 'hidden'}>
            {
              modify.add
                ? 'You can\'t add negative calories, try subtracting instead.'
                : 'You can\'t subtract negatives or more calories than you have eaten.'
            }
        </p>
        </form>
      </div>
    )
  } else {
    return null
  }
}



// class Modify extends Component {

//   state={
//     submit_disabled: true,
//     input_error: false
//   }

//   componentDidUpdate () {
//     if (this.props.add || this.props.subtract) this.refs.input.focus()
//     if (this.props.change_goal) this.refs.goal_input.focus()
//   }

//   changeCaloricValue = e => {
//     e.preventDefault()
//     const props = this.props
//     const data = props.data
//     let value = Number(this.refs.input.value)
//     let total = 0
//     data.forEach(cals => total += cals.updated_cals_total)
//     if (modify.add) {
//       addCalories(value)
//       dispatch({
//         type: 'modify',
//         payload: {
//           ...modify,
//           isActive: false
//         }
//       })
//       this.refs.input.value = ''
//     } else {
//       if (total > value) {
//         props.subtract_cals(value)
//         props.closeModal()
//         this.refs.input.value = ''
//       } else {
//         this.setState({ input_error: true })
//       }
//     }
//   }

//   handleInputValidation = e => {
//     const value = e.target.value
//     const data = this.props.data
//     let total = 0
//     data.map(item => total += item.updated_cals_total)
//     if (value.length > 0) {
//       if ((this.props.subtract && (value >= total) || value < 0) || (this.props.add && value < 0)) {
//         this.setState({ input_error: true })
//       } else {
//         this.setState({ input_error: false })
//       }
//       this.setState({ submit_disabled: false })
//     } else {
//       this.setState({ submit_disabled: true })
//     }
//   }

//   changeGoal = e => {
//     e.preventDefault()
//     this.props.changeGoal(this.refs.goal_input.value)
//     this.props.toggleChange()
//   }

//   render() {
//     const add = this.props.add
//     const sub = this.props.subtract
//     const change = this.props.change_goal
//     const closeModal = this.props.closeModal
//     const input_error = this.state.input_error

//     if (add || sub) {
//       return (
//         <div className={add || sub ? 'modify__container modify--open' : 'modify__container modify--closed'}>
//           <form onSubmit={this.changeCaloricValue}>
//             <input type='number'
//                    min='0'
//                    placeholder='Calories'
//                    className='modify__input'
//                    onChange={this.handleInputValidation}
//                    ref={inputRef}
//                    style={ input_error ? { borderBottom: '2px solid red' } : null } />
//             <button onClick={this.changeCaloricValue}
//                     disabled={this.state.submit_disabled || this.state.input_error}>
//                 GO
//             </button>
//             <p className={input_error ? 'modify__error' : 'hidden'}>
//               {
//                 add
//                   ? 'You can\'t add negative calories, try subtracting instead.'
//                   : 'You can\'t subtract negatives or more calories than you have eaten.'
//               }
//             </p>
//           </form>
//         </div>
//       )
//     } else if (change) {
//       return (
//         <div className='modify__container'>
//           <form onSubmit={this.changeGoal}>
//             <input type='number'
//                    min='0'
//                    placeholder='Daily Calories Goal'
//                    className='modify__input'
//                    onChange={this.handleInputValidation}
//                    ref='goal_input'
//                    style={ input_error ? { borderBottom: '2px solid red' } : null } />
//             <button onClick={this.changeGoal}
//                     disabled={this.state.submit_disabled || this.state.input_error}>
//                 GO
//             </button>
//             <p className={input_error ? 'modify__error' : 'hidden'}>
//               {
//                 add
//                   ? 'You can\'t add negative calories, try subtracting instead.'
//                   : 'You can\'t subtract negatives or more calories than you have eaten.'
//               }
//             </p>
//           </form>
//         </div>
//       )
//     } else {
//       return null
//     }
//   }
// }

export default Modify
