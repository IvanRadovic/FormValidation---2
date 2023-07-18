import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import DefaultInput from './UI/DefaultInput.component';

let renderCount = 0;


const YoutubeForm = () => {
  
  const form = useForm({
    defaultValues:{
        username:"",
        email:"",
        channel:"",
        social:{
          twitter:"",
          facebook:"",
        },
        phoneNumbers:[ "","" ],
        phNumbers:[{ number: ""}]        
  }

    /* --- For fetching user ---  */
    // const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    // const data = await response.json();
    // return {
    //   username: 'Batman',
    //   email:data.email,
    //   channel:'f'
    // }
    
  })

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name:'phNumbers',
    control:control,
  })

  const onSubmit = (data) => {
    console.log('Form submitted', data);
  }
  
  renderCount++;
  return (
    <div>
        <h1>Youtube form ({renderCount/2})</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DefaultInput
               label="Username"
               name="username"
               register={register}
               error={errors.username}
            />

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
                  },
                  validate:{
                    notAdmin: (fieldValue) => {
                      return fieldValue !== "admin@example.com" || "Enter a different email address"
                    },

                    notBlackListed: (fieldValue) => {
                      return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                    }
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

            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <input 
                type='text'
                id='twitter'  
                {...register("social.twitter")}  
              />
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facbook</label>
              <input 
                type='text'
                id='facebook'  
                {...register("social.facebook")}  
              />
            </div>

            <div className="form-control">
              <label htmlFor="primary-phone">Primary phone</label>
              <input 
                type='text'
                id='primary-phone'   
                {...register("phoneNumbers.0")}   
              />
            </div>

            <div className="form-control">
              <label htmlFor="secondary-phone">Secondary phone</label>
              <input 
                type='text'
                id='secondary-phone'   
                {...register("phoneNumbers.1")}   
              />
            </div>

            <div>
              <label htmlFor="List">List of phone numbers</label>
              <div>
                  {fields.map((field, index) => (
                  <div className="form-control" key={field.id}>
                    <input
                      type="text"
                      {...register(`phone.${index}.number`)}
                    />

                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type='button' onClick={() => append({ number: ""})}>Add phone phone</button>
              </div>
            </div>

            <button>Submit</button>
        </form>
        <DevTool control={control} />
    </div>
  )
}

export default YoutubeForm;