import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Label, TextInput } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { lazy, Suspense, useContext, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { authContext } from "../../context/AuthContext";
import * as z from "zod";
import { Helmet } from 'react-helmet';

const ValidationError = lazy(() => import("../../components/validationError/ValidationError"))
const AppButton = lazy(() => import("../../components/appButton/AppButton"))

const defaultValues = {
    email:"",
    password:""
    
  }

  const schema = z.object ({
      
      email: z.email({mesage: "Invalid email address"}),
  
      password: z.string().min(8, {message: "Password must be at least 8 characters"})
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , {message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"}),
  
    })

export default function Login() {
  const [apiError , setApiError] = useState (null)

  const {register , handleSubmit , formState: {errors , isSubmitting , isValid}} = useForm ({ defaultValues , resolver:zodResolver(schema)})

  const navigate = useNavigate()

  const { setToken } = useContext(authContext)

  async function onSubmit (data) {
    console.log(data) 

    try{
      const { data:response} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin` , data)

      if (response.message === 'success') {
          setApiError(null)
          localStorage.setItem("token" , response.token)
          setToken(response.token)
          navigate('/')
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

    <Helmet><title>Kudo | Login</title></Helmet>

    <section className='py-12'>
      <div className='container'>
        <div className='max-w-lg mx-auto p-8 shadow-lg bg-primary-200 rounded'>
          <h1 className='text-center text-xl font-bold'>Login</h1>

          {apiError && <Alert className='my-4' color="failure" icon={HiInformationCircle}>{apiError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email">Your email</Label>
        </div>
        <TextInput id="email" type="email" placeholder="example@gmail.com" {...register('email')} />
        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.email?.message}/></Suspense>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your password</Label>
        </div>
        <TextInput id="password" type="password" placeholder="*********" {...register('password')} />
        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.password?.message}/></Suspense>
      </div>

      <Suspense fallback={<div className="text-primary-200">Loading...</div>}><AppButton type="submit" disabled={!isValid} isLoading={isSubmitting}>login</AppButton></Suspense>
      </form>
        </div>

      </div>
    </section>

    </>
  )
   
}
