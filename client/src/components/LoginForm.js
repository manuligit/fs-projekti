import React from 'react'

const LoginForm = ({ login }) => {
  const onSubmit = async (event) => {
    event.preventDefault()
    let credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    login(credentials)
  }


  return (
    <div>
      <h3>Login to app</h3>
      <form onSubmit={onSubmit}>
        <div> Username <input name="username" type="text"/> </div>
        <div> Password <input name="password" type="password"/> </div>
        <button>Login</button>
      </form> <br />
    </div>
  )
}

export default LoginForm