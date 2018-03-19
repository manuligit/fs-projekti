import React from 'react'

const Notification = ({ message }) => {
  if (message) {
    console.log('message', message)
    const errorStyle = {
      border: 'solid 4px',
      color: '#8AC3D4'
    }
    return (
      <div style={errorStyle}>{message}</div>
    )
  } else {
    return (
      null
    )
  }
}

export default Notification