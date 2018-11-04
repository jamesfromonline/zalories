import React, { Component } from 'react'

class Modify extends Component {

  state={
    submit_disabled: true,
    input_error: false
  }

  componentDidUpdate () {
    if (this.props.add || this.props.subtract) this.refs.input.focus()
    if (this.props.change_goal) this.refs.goal_input.focus()
  }

  changeCaloricValue = e => {
    e.preventDefault()
    const props = this.props
    const data = props.data
    let value = Number(this.refs.input.value)
    let total = 0
    data.forEach(cals => total += cals.updated_cals_total)
    if (props.add) {
      props.add_cals(value)
      props.closeModal()
      this.refs.input.value = ''
    } else {
      if (total > value) {
        props.subtract_cals(value)
        props.closeModal()
        this.refs.input.value = ''
      } else {
        this.setState({ input_error: true })
      }
    }
  }

  handleInputValidation = e => {
    const value = e.target.value
    const data = this.props.data
    let total = 0
    data.map(item => total += item.updated_cals_total)
    if (value.length > 0) {
      if ((this.props.subtract && (value >= total) || value < 0) || (this.props.add && value < 0)) {
        this.setState({ input_error: true })
      } else {
        this.setState({ input_error: false })
      }
      this.setState({ submit_disabled: false })
    } else {
      this.setState({ submit_disabled: true })
    }
  }

  changeGoal = e => {
    e.preventDefault()
    this.props.changeGoal(this.refs.goal_input.value)
    this.props.toggleChange()
  }

  render() {
    const add = this.props.add
    const sub = this.props.subtract
    const change = this.props.change_goal
    const closeModal = this.props.closeModal
    const input_error = this.state.input_error

    if (add || sub) {
      return (
        <div className={add || sub ? 'modify__container modify--open' : 'modify__container modify--closed'}>
          <form onSubmit={this.changeCaloricValue}>
            <input type='number'
                   min='0'
                   placeholder='Calories'
                   className='modify__input'
                   onChange={this.handleInputValidation}
                   ref='input'
                   style={ input_error ? { borderBottom: '2px solid red' } : null } />
            <button onClick={this.changeCaloricValue}
                    disabled={this.state.submit_disabled || this.state.input_error}>
                GO
            </button>
            <p className={input_error ? 'modify__error' : 'hidden'}>
              {
                add
                  ? 'You can\'t add negative calories, try subtracting instead.'
                  : 'You can\'t subtract negatives or more calories than you have eaten.'
              }
            </p>
          </form>
        </div>
      )
    } else if (change) {
      return (
        <div className='modify__container'>
          <form onSubmit={this.changeGoal}>
            <input type='number'
                   min='0'
                   placeholder='Daily Calories Goal'
                   className='modify__input'
                   onChange={this.handleInputValidation}
                   ref='goal_input'
                   style={ input_error ? { borderBottom: '2px solid red' } : null } />
            <button onClick={this.changeGoal}
                    disabled={this.state.submit_disabled || this.state.input_error}>
                GO
            </button>
            <p className={input_error ? 'modify__error' : 'hidden'}>
              {
                add
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
}

export default Modify
