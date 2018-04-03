import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'

class RegisterForm extends React.Component {
  addUser = (event) => {
    event.preventDefault()

    this.props.createUser(
      event.target.name.value,
      event.target.username.value,
      event.target.password.value
    )

    this.props.createNotification(`User ${event.target.username.value} created successfully`)
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.addUser}>
          <div> Username <input type="username" name="username" required/> </div>
          <div> Name <input type="text" name="name" required/> </div>
          <div> Password <input type="password" name="password" minLength="8" required/> </div>
          <button> Create user </button>
        </form>
      </div>
    )
  }
}

export default connect(
  null, { createUser, createNotification }
)(RegisterForm)