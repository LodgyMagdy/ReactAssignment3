import { Card, Textarea } from 'flowbite-react'
import CardHeader from '../cardHeader/CardHeader'
import { useState } from 'react'
import AppButton from '../appButton/AppButton'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function CommentItem({comment}) {

  const [isEditing ,setIsEditing] = useState(false)

  const {register , handleSubmit} = useForm()

  const queryClient = useQueryClient()

  const {mutate: handleUpdateComment} = useMutation({mutationFn:updateComment , 
    onSuccess: () => {
                  toast.success("Comment updated successfully")
                  queryClient.invalidateQueries(["profile-posts"])
                  queryClient.invalidateQueries(["all-posts"])
                  setIsEditing(false)
                  
                } ,
            onError: () => {
                  toast.error("Comment updating failed")
                }

  })

  async function updateComment (data) {
      return await axios.put(`${import.meta.env.VITE_BASE_URL}/comments/${comment._id}` , data , {
      headers: {
        token: localStorage.getItem("token")
      }
     })
  }

  return (
    <>
    <Card className='bg-primary-100 shadow-2xl'>
        <CardHeader user={{...comment.commentCreator , createdAt: comment.createdAt}} mediaId={comment._id} isComment={true} setIsEditing={setIsEditing} setIsEditingP={false}/>
        { isEditing ? (<form onSubmit={handleSubmit(handleUpdateComment)}>
            <Textarea className='mb-4' defaultValue={comment.content} {...register("content")}/>
            <div className='flex gap-2'>
                <AppButton type="submit">Update</AppButton>
                <AppButton type="reset" className="bg-gray-500 hover:bg-gray-600" onClick={() => setIsEditing(false)}>Cancel</AppButton>
            </div>
        </form>) : <h3 className='text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
            {comment.content}
        </h3>}
    </Card>
    </>
  )
}
