import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, Label, Textarea } from 'flowbite-react'
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCloudUpload } from "react-icons/io";
import { toast } from 'react-toastify';
import AppButton from '../appButton/AppButton';

export default function Add() {

  const fileInputRef = useRef()
  const queryClient = useQueryClient()

  const {mutate , isPending} = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      reset()
      toast.success("Post created successfully")
      queryClient.invalidateQueries(["profile-posts"])
      queryClient.invalidateQueries(["all-posts"])
    } ,
    onError: () => {
      toast.error("Post creation failed")
    }
  })

  const {register , handleSubmit , reset , formState: {isValid}} = useForm()

  async function addPost (data) {
     const formData = new FormData ()

     formData.append("body" , data.body)

     if (fileInputRef.current.files[0]) {
        formData.append("image" , fileInputRef.current.files[0]) }

     
         return await axios.post(`${import.meta.env.VITE_BASE_URL}/posts` , formData , {
            headers: {
                token: localStorage.getItem("token")
            }
        })
      
  }

  return (
    <>
  <section className='py-6'>
        <div className='max-w-3xl mx-auto'>
    <Card className='bg-primary-200'>
      <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="comment">post something</Label>
          </div>
          <div className='flex items-center gap-6'>
          <Textarea id="comment" placeholder="What's on your mind?..." rows={3} {...register("body")}/>
          <input {...register("image")} className='hidden' ref={fileInputRef} type='file'/>
          <IoMdCloudUpload onClick={() => fileInputRef.current.click()} className='text-4xl cursor-pointer'/>
          </div>
        </div>
        
        <AppButton isLoading={isPending} disabled={!isValid || isPending} type="submit">Create post</AppButton>
      </form>
    </Card>
  </div>
 </section>
    </>
  )
}
