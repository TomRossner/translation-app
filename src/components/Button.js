import React from 'react';

const Button = (props) => {
    const {type, icon, onClick, title} = props
  return (
    <button className='btn' title={title} type={type} onClick={onClick}>{icon}</button>
  )
}

export default Button;