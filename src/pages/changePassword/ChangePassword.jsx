import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Card, Label, TextInput } from "flowbite-react";
import { lazy, Suspense, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from "react-helmet";

const ValidationError = lazy(() => import("../../components/validationError/ValidationError"))
const AppButton = lazy(() => import("../../components/appButton/AppButton"))

export default function ChangePassword() {

  const schema = z.object ({
    
      password: z.string().min(8, {message: "Current password is wrong"}),
  
      newPassword: z.string().min(8, {message: "Password must be at least 8 characters"})
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , {message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"})
  
    }).refine((data) => data.password !== data.newPassword , {
      message: "New password must be different from current password" ,
      path: ["newPassword"]
    })

  const {register , handleSubmit , formState:{isSubmitting , errors}} = useForm({ resolver: zodResolver(schema) })

  const navigate = useNavigate()
  const {setToken} = useContext(authContext)
  

  const {mutate: handleChangePassword} = useMutation({mutationFn: changePassword ,
    onSuccess: () => {
    const toastId = toast.success("Password changed successfully. Please login with the new password", {
      autoClose: 4000, 
    })

    
    toast.onChange((payload) => {
      if (payload.id === toastId && payload.status === "removed") {
        localStorage.removeItem("token")
        setToken(null)
        navigate("/login")
      }
    })
  } ,
          onError: () => {
            toast.error("Password changing failed")
          } 
  })

  async function changePassword (data) {
    console.log(data)
    return await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/change-password` , data , {
        headers: {
            token: localStorage.getItem("token")
        }
    } )
  }


  return (
    <>

    <Helmet><title>Kudo | ChangePassword</title></Helmet>

      <Card className="max-w-3xl mx-auto bg-primary-200 my-10">
      <form onSubmit={handleSubmit(handleChangePassword)} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Current password</Label>
          </div>
          <TextInput id="password1" type="password" placeholder="**********" { ...register("password") } />
          <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.password?.message}/></Suspense>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2">New password</Label>
          </div>
          <TextInput id="password2" type="password" placeholder="**********" { ...register("newPassword") }/>
          <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ValidationError error={errors.newPassword?.message}/></Suspense>
        </div>
        
        <Suspense fallback={<div className="text-primary-200">Loading...</div>}><AppButton type="submit" isLoading={isSubmitting}>Change password</AppButton></Suspense>
      </form>
    </Card>
    </>
  )
}
