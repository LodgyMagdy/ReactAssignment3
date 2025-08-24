import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Textarea } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AppButton from './../appButton/AppButton';



export default function AddComment({post}) {
  
  const {register , handleSubmit , reset , formState: {isValid}} = useForm()
  const queryClient = useQueryClient()

  const {mutate , isPending} = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
          reset()
          toast.success("Comment created successfully")
          queryClient.invalidateQueries(["details-posts" , post])
          queryClient.invalidateQueries(["profile-posts"])
          queryClient.invalidateQueries(["all-posts"])
        } ,
    onError: () => {
          toast.error("Comment creation failed")
        }
  })

  async function addComment (data) {
     const commentData = {...data , post}
     return axios.post(`${import.meta.env.VITE_BASE_URL}/comments` , commentData , {
        headers: {

            token: localStorage.getItem("token")
        }
     })
  }

  return (
    <>
    <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4"> 
        <Textarea id="comment" placeholder="Leave a comment..." rows={2} {...register("content" , {required : true})}/>
              
        <AppButton isLoading={isPending} disabled={!isValid || isPending} type="submit">Create comment</AppButton>
        
    </form>
    </>
  )
}
