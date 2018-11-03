import React, { Component } from 'react'
import './App.scss'
import moment from 'moment'
import firebase, { auth } from './utils/firebase'
import Calories from './components/calories/Calories'
import Login from './components/login/Login'
import LogOut from './components/logout/LogOut'
import Loader from './components/loader/Loader'
import Modify from './components/modify/Modify'
import GoalBar from './components/goal-bar/GoalBar'

class App extends Component {
  state={
    auth: false,
    user: {
      username: null,
      avatar: null
    },
    uid: null,
    data: [[]],
    toggle_add: false,
    toggle_subtract: false,
    toggle_change_goal: false,
    total_cals: 0,
    daily_cals_goal: 0,
    date: null,
    auth_status_checked: false,
    toggle_logout: false
  }

  componentDidMount () {
    this.setState({ auth_status_checked: false })
    this.handlePreviousLogin()
    document.addEventListener('keydown', this.detectKeyDown)
  }

  handlePreviousLogin() {
    auth.onAuthStateChanged(async user => {
      try {
        if (user) {
          const userInfo = await user
          this.setState({
            auth: true,
            uid: userInfo.uid,
            username: userInfo.displayName,
            avatar_url: userInfo.photoURL
          })
          this.getExistingUserData()
          this.authStatusChecked()
        } else {
          this.setState({ auth: false })
          this.authStatusChecked()
        }
      }
      catch(e) {
        console.error('Error fetching previous auth: ', e)
      }
    })
  }

  getExistingUserData = () => {
    firebase.database().ref('/users/' + this.state.uid).once('value').then(snapshot => {
      try {
        const data = snapshot.val()
        console.log(data)
        if (data) {
          console.log('first shit ran')
          if (!data.hasOwnProperty('data')) data.data = []
          this.setState({
            avatar_url: data.avatar_url,
            daily_cals_goal: data.daily_cals_goal,
            data: data.data,
            uid: data.uid,
            username: data.username
          })
        } else {
          console.log('second shit ran')
          if (this.state.auth) {
            firebase.database()
                    .ref(`/users/${this.state.uid}/`)
                    .set(JSON.parse(JSON.stringify(this.state)))
          } else {
            console.log('no user data')
          }
        }
      }
      catch(e) {
        console.error(e)
      }
    })
  }

  authStatusChecked = () => this.setState({ auth_status_checked: true })

  setUserData = () => {
    firebase.database().ref('/users/' + this.state.uid).once('value').then(async snapshot => {
      try {
        const data = await snapshot.val()
        if (data) {
          // do stuff
        } else {
          if (this.state.auth) {
            firebase.database().ref(`/users/${this.state.uid}/`).set(JSON.parse(JSON.stringify(this.state)))
          }
        }
      }
      catch(e) {
        console.error(e)
      }
    })
  }

  handleLogIn = source => {
      auth.signInWithPopup(source)
      .then(async result => {
        try {
          const user = await result.additionalUserInfo.profile
          if (source === 'twitter') {
            this.setState({
              auth: true,
              user: {
                username: user.name,
                avatar: user.profile_image_url_https
              },
              uid: user.id
            })
          } else {
            this.setState({
              auth: true,
              user: {
                username: user.name,
                avatar: user.picture
              },
              uid: user.id
            })
          }

          // this.getExistingUserData()
        }
        catch(e) {
          console.error('Error logging in: ', e)
        }
      })
      this.loginIsToggled = false
    }

  handleLogOut = () => {
    auth.signOut()
    .then(() => {
      this.setState({
        auth: false,
        user: {},
        toggle_logout: false
      })
      this.closeModal()
    })
  }

  toggleAddCalories = () => this.setState({ toggle_add: !this.state.toggle_add })
  toggleSubtractCalories = () => this.setState({ toggle_subtract: !this.state.toggle_subtract })
  toggleChangeGoal = () => this.setState({ toggle_change_goal: !this.state.toggle_change_goal})
  toggleLogOut = () => this.setState({ toggle_logout: !this.state.toggle_logout})

  closeModal = () => {
    this.setState({
      toggle_add: false,
      toggle_subtract: false,
      toggle_change_goal: false
    })
  }

  addCalories = amount => {
    const current_cals = this.state.total_cals
    const updated_cals = current_cals + amount
    let user_data = Object.values(this.state.data)
    const data = {
      timestamp: moment().unix(),
      previous_cals: current_cals === 0 ? 0 : current_cals - amount,
      updated_cals_total: updated_cals
    }
    user_data.push(data)
    this.setState({data: user_data})
    console.log(this.state.data)
    firebase.database()
            .ref(`/users/${this.state.uid}`)
            .child('data')
            .set(user_data)
  }

  subtractCalories = amount => {
    const current_cals = this.state.total_cals
    const updated_cals = current_cals - amount
    let user_data = Object.values(this.state.data)
    const data = {
      timestamp: moment().unix(),
      previous_cals: current_cals === 0 ? 0 : current_cals - amount,
      updated_cals_total: updated_cals
    }
    user_data.push(data)
    this.setState({ data: user_data })
    firebase.database().ref(`/users/${this.state.uid}`).child('data').set(user_data)
  }

  changeGoal = amount => {
    this.setState({ daily_cals_goal: amount })
    firebase.database().ref(`/users/${this.state.uid}`).child('daily_cals_goal').set(amount)
    this.toggleChangeGoal()
  }

  detectKeyDown = e => {
    console.log(e.key)
    switch( e.key ) {
      case '=':
        this.toggleAddCalories()
        break
      case '-':
        this.toggleSubtractCalories()
        break
      case 'Escape':
        this.setState({
          toggle_add: false,
          toggle_subtract: false,
          toggle_logout: false,
          toggle_change_goal: false
        })
        break
      case 'g':
        this.toggleChangeGoal()
        break
      default:
        break
    }
  }

  render() {
    const current_date = moment().format('dddd, MMMM YYYY')
    const toggle_add = this.state.toggle_add
    const toggle_subtract = this.state.toggle_subtract
    const toggle_change = this.state.toggle_change_goal
    return (
      <div className="app__wrapper">

        {
          this.state.auth
          ? (
            toggle_add || toggle_subtract || toggle_change
              ? (
                <header className="app__header">
                  <a style={{ opacity: '0' }}>x</a>
                  <div className={toggle_add || toggle_subtract ? 'app__title' : 'hidden'}>
                    { toggle_add ? 'Add Calories' : toggle_subtract ? 'Subtract Calories' : null }
                  </div>
                  <div className={toggle_change ? 'app__title' : 'hidden'}>
                    Change Daily Goal
                  </div>
                  <a onClick={this.closeModal}>
                    <i className='fa fa-backspace' />
                  </a>
                </header>
              )
              : (
                <header className="app__header">
                  <div className='app__date'>{current_date}</div>
                  <button className='app__avatar' onClick={this.toggleLogOut}>
                    <img src={this.state.avatar_url} />
                  </button>
                </header>
              )
          )
          : (
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
        {
          this.state.auth_status_checked
            ? this.state.auth
              ? <Calories data={this.state.data} daily_cals_goal={this.state.daily_cals_goal} auth={this.state.auth} />
              : <Login handleLogIn={this.handleLogIn} />
            : <Loader />
        }

        {
          this.state.toggle_logout
            ? <LogOut handleLogOut={this.handleLogOut} toggleLogOut={this.toggleLogOut} />
            : null
        }
        {
          this.state.auth
            ? (
              <GoalBar daily_cals_goal={this.state.daily_cals_goal}
                       changeGoal={this.changeGoal}
                       toggle_change={this.toggleChangeGoal}
                       data={this.state.data} />
            ) : null
        }

        <div className={this.state.auth ? 'app__buttons-container animate--fade-in' : 'hidden'}>
          <a onClick={this.toggleSubtractCalories}>-</a>
          <a onClick={this.toggleAddCalories}>+</a>
        </div>

        <Modify add={toggle_add}
                subtract={toggle_subtract}
                change_goal={toggle_change}
                toggleChange={this.toggleChangeGoal}
                changeGoal={this.changeGoal}
                data={this.state.data}
                add_cals={this.addCalories}
                subtract_cals={this.subtractCalories}
                closeModal={this.closeModal} />




      </div>
    )
  }
}

export default App
