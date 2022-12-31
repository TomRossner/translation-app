import React from 'react';

const Button = (props) => {
    const {type, icon, onClick} = props
  return (
    <button className='btn' type={type} onClick={onClick}>{icon}</button>
  )
}

export default Button;