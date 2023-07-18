import React from 'react'
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;


const YoutubeForm = () => {
  
  const form = useForm({
    
  })

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log('Form submitted', data);
  }
  
  renderCount++;
  return (
    <div>
        <h1>Youtube form ({renderCount/2})</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='form-control'>
              <label htmlFor="username">Username</label>
              <input 
                type='text' 
                id='username' 
                { ...register("username", {
                  required:{
                    value:true,
                    message:'Your username is required'
                  }
                } )} 
              />
              <p className='error'>{errors.username?.message}</p>
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input 
                type='email'
                id='email' 
                {...register("email", { 
                  pattern:{
                    value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message:"Invalid email format",
                  }
                })}  
              />
              <p className='error'>{errors.email?.message}</p>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <input 
                type='text'
                id='channel' 
                {...register("channel", {
                  required:{
                    value:true,
                    message:'Channel is required'
                  }
                })}  
              />
              <p className='error'>{errors.channel?.message}</p>
            </div>

            <button>Submit</button>
        </form>
        <DevTool control={control} />
    </div>
  )
}

export default YoutubeForm;