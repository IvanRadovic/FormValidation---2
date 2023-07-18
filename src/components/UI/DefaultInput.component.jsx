import React from 'react'

const DefaultInput = ({name, label, register, error}) => {
  return (
    <div className="form-control">
        <label htmlFor={name}>{label}</label>
        <input 
            type="text"
            id={name}
            {...register(name)}
        />
        {error && <p className='error'>{error.message}</p>}
    </div>
  )
}

export default DefaultInput