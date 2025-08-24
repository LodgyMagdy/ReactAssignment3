import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import {  Alert, Datepicker, Label, Radio, TextInput } from 'flowbite-react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from "zod";
import { lazy, Suspense, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { Helmet } from 'react-helmet';

const ValidationError = lazy(() => import("../../components/validationError/ValidationError"))
const AppButton = lazy(() => import("../../components/appButton/AppButton"))

const defaultValues = {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:""
  }

  const schema = z.object ({
    name: z.string({ message: "Name is required"}).min(3, {message: "Name must be at least 3 characters"}),

    email: z.email({mesage: "Invalid email address"}),

    password: z.string().min(8, {message: "Password must be at least 8 characters"})
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , {message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"}),

    rePassword: z.string().min(8, {message: "Password must be at least 8 characters"})
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , {message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"}),

    dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/),

    gender: z.literal(["male" , "female"] , {message: "Please select a gender"})
  }).refine((data) => data.password === data.rePassword , {
    message: "Passwords do not match" ,
    path: ["rePassword"]
  })

export default function Register() {
  const [apiError , setApiError] = useState (null)

  const {register , handleSubmit , formState: {errors , isSubmitting , isValid} , control } = useForm ({ defaultValues , resolver: zodResolver(schema) })

  const navigate = useNavigate()

  async function onSubmit (data) {
    console.log(data) 

    try{
      const { data:response} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup` , data)

      if (response.message === 'success') {
          setApiError(null)
          navigate('/login')
      }

      else if (response.error) {
        throw new Error (response.error)
      }
    }

    catch (error) {
       console.log(error)
       setApiError(error.response.data.error)
    }
  }

  return (
    <>

    <Helmet><title>Kudo | Register</title></Helmet>

    <section className='py-12'>
      <div className='container'>
        <div className='max-w-lg mx-auto p-8 shadow-lg bg-primary-200 rounded'>
          <h1 className='text-center text-xl font-bold'>Register</h1>

         {apiError && <Alert className='my-4' color="failure" icon={HiInformationCircle}>{apiError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email">Your email</Label>
        </div>
        <TextInput id="email" type="text" placeholder="example@gmail.com" {...register('email')} />
        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.email?.message}/></Suspense>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Your name</Label>
        </div>
        <TextInput id="name" type="text" placeholder="Ex: lodgymagdy" {...register('name')} />
        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.name?.message}/></Suspense>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your password</Label>
        </div>
        <TextInput id="password" type="password" placeholder="*********" {...register('password')} />
        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.password?.message}/></Suspense>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword">Confirm password</Label>
        </div>
        <TextInput id="rePassword" type="password" placeholder="*********" {...register('rePassword')} />
        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.rePassword?.message}/></Suspense>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
        </div>
        
        <Controller render={({field}) => (<Datepicker 
        {...field} value={field.value ? new Date(field.value) : new Date()}
        onChange={(date) => {
          if (date) {
            const formattedDate = new Date(date).toLocaleDateString("en-US" , {
              day: "2-digit" ,
              month: "2-digit" ,
              year: "numeric"
            }).replaceAll("/" , "-")
            return field.onChange(formattedDate)
          }
        }}/>)} name="dateOfBirth" control={control}/>

        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.dateOfBirth?.message}/></Suspense>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="gender">Gender</Label>
        </div>
        <div className="flex max-w-md flex-col gap-4">
          <div className="flex items-center gap-2">
             <Radio id="female" value="female" {...register('gender')}/>
             <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center gap-2">
             <Radio id="male" value="male" {...register('gender')}/>
             <Label htmlFor="male">Male</Label>
          </div>
        </div>
        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.gender?.message}/></Suspense>
      </div>

      <Suspense fallback={<div className="text-primary-200">Loading...</div>}><AppButton type="submit" disabled={!isValid} isLoading={isSubmitting}>register</AppButton></Suspense>
      </form>
        </div>

      </div>
    </section>

    </>
  )
}
