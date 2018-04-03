import React from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'

class EditUserForm extends React.Component {
  editUser = (event) => {
    event.preventDefault()
    console.log('edituser **********************')
    console.log(this.props.user)
    this.props.updateUser(
      this.props.user.id,
      event.target.name.value,
      event.target.username.value,
      event.target.password.value
    )
    this.props.createNotification(`Edited ${event.target.username.value} info successfully`)
  }

  render() {
    return (
      <div>
        <h3>Edit user info</h3>
        <form onSubmit={this.editUser}>
          <div> Name <input name="name" type="text" defaultValue={this.props.user.name}/> </div>
          <div> Category <input name="username" type="text" defaultValue={this.props.user.username}/> </div>
          <div> Price <input name="password" type="password" /> </div>
          <button>Edit</button>
        </form> <br />
      </div>
    )
  }
}

export default connect(
  null,
  { updateUser, createNotification }
)(EditUserForm)