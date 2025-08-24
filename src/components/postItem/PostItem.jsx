import { Card, Textarea } from 'flowbite-react'
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AddComment from '../addComment/AddComment';
import CardHeader from '../cardHeader/CardHeader';
import CommentItem from '../commentItem/CommentItem';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import AppButton from '../appButton/AppButton';
import axios from 'axios';

export default function PostItem({post , showAllComments = false}) {

  const {body , image , createdAt , _id , user , comments} = post

  const [isEditingP ,setIsEditingP] = useState(false)
  
  const {register , handleSubmit} = useForm()
  
  const queryClient = useQueryClient()
  
    const {mutate: handleUpdatePost} = useMutation({mutationFn:updatePost , 
      onSuccess: () => {
                    toast.success("Post updated successfully")
                    queryClient.invalidateQueries(["profile-posts"])
                    queryClient.invalidateQueries(["all-posts"])
                    setIsEditingP(false)
                    
                  } ,
              onError: () => {
                    toast.error("Post updating failed")
                  }
  
    })

    async function urlToFile(url) {
      const response = await fetch(url)
      const data = await response.blob()
      const ext = data.type.split("/")[1] || "png"
      const filename = `post-image.${ext}`
    return new File([data], filename, { type: data.type })
  }

  
    async function updatePost (data) {

        const formData = new FormData ()
        formData.append("body" , data.body)

        if (image) {
      
        const file = await urlToFile(image)
        formData.append("image", file) }


        return await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${_id}` , formData , {
        headers: {
          token: localStorage.getItem("token")
        }
       })
    }
  

  return (
    <>
    <Card className='bg-primary-200'>
      <CardHeader user={{...user , createdAt}} mediaId={_id} isComment={false} setIsEditing={false} setIsEditingP={setIsEditingP}/>
      { isEditingP ? (<form onSubmit={handleSubmit(handleUpdatePost)}>
                  <Textarea className='mb-4' defaultValue={body} {...register("body")}/>
                  <div className='flex gap-2'>
                      <AppButton type="submit">Update</AppButton>
                      <AppButton type="reset" className="bg-gray-500 hover:bg-gray-600" onClick={() => setIsEditingP(false)}>Cancel</AppButton>
                  </div>
              </form>) : <h3 className='text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
            {body}
      </h3>} 
      
      {image && <img className='h-96 object-contain' src={image} alt="post image" />}
      <footer className='flex justify-between items-center'>
        <AiFillLike />
      <div className='flex items-center gap-4'>
        <FaComment />
        {comments && comments.length}
       </div>

       <Link to={`/posts/${_id}`}>
        <FaShare />
       </Link>
      </footer>

      {comments && comments.length > 0 && (showAllComments ? (comments.map((comment) => 
       <CommentItem key={comment._id} comment={comment}/>) ) : <CommentItem comment={ comments[ comments.length - 1]}/>) } 
      
      <AddComment post={_id}/>
    </Card>
    </>
  )
}


