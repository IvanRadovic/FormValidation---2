import React, { useEffect } from 'react'
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
        phNumbers:[{ number: ""}],        
        age: 0,
        dob: new Date(),
        mode:"onBlur"
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

  const { 
    register, 
    control, 
    handleSubmit, 
    formState, 
    watch, 
    // getValues, 
    setValue,
    reset,
    trigger
   } = form;


  const { 
    errors, 
    touchedFields, 
    dirtyFields, 
    isDirty,  
    isValid, 
    isSubmitting, 
    isSubmitted,
    isSubmitSuccessful
  } = formState;

  console.log(isSubmitting, isSubmitted)

  const { fields, append, remove } = useFieldArray({
    name:'phNumbers',
    control:control,
  })

  const onSubmit = (data) => {
    console.log('Form submitted', data);
  }

  const watchUsename = watch(["username", "email", "channel"]);

  const handlerGetValues = () => {
    console.log("GetValues: " , getValues())
  }

  const handlerSetValues = () => {
    setValue("username", "username");
  }

  const onError = (errors) => {
    console.log("Errors: " , errors)
  }

  useEffect(() => {
    if(isSubmitSuccessful){
      reset()
    }
  }, [isSubmitSuccessful, reset])
  
  renderCount++; 
  return (
    <div>
        <h1>Youtube form ({renderCount/2})</h1>
        {/* <h1>WATCHED VALUE: {watchUsename}</h1> */}
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
                    },

                    emailAvailable: async (fieldValue) => {
                        const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`)
                        const data = await response.json();
                        return data.length == 0 || "Email already exists";
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
                {...register("social.twitter", {
                  disabled:watch("channel") === "",
                  required:'Enter your Twitter account'
                })}  
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

                <div className="form-control">
                  <label htmlFor="Age">Age</label>
                  <input 
                    type='number'
                    id='Age' 
                    {...register("Age", {
                      valueAsNumber:true,
                      required:{
                        value:true,
                        message:'Age is required'
                      }
                    })}  
                  />
                  <p className='error'>{errors.age?.message}</p>
                </div>
                <button type='button' onClick={() => append({ number: ""})}>Add phone phone</button>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="Date">Date of birth:</label>
              <input 
                type='date'
                id='Date' 
                {...register("Date", {
                  valueAsDate:true,
                  required:{
                    value:true,
                    message:'Date is required'
                  }
                })}  
              />
              <p className='error'>{errors.Date?.message}</p>
            </div>

            <button >Submit</button>
            {/* <button type='button' onClick={handlerGetValues()}>Get Values</button> */}
            <button type='button' onClick={handlerSetValues}>Set Values</button>
            <button type='button' onClick={() => reset()}>RESET VALUES</button>
        </form>
        <DevTool control={control} />
    </div>
  )
}

export default YoutubeForm;